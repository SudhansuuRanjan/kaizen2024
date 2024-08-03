import CartItem from './CartItems'
import useAuth from '../../hooks/useAuth'
import { useQuery } from '@tanstack/react-query'
import { getUserEventCart, deleteCartItem } from '../../services/doc.service'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { generateTxnId } from '../../utils/generateRandomID'
import { PaymentInitModal } from 'pg-test-project';
import { useNavigate } from 'react-router-dom'
import { createCartPaymentTransaction } from '../../services/payment.service'
import { updateCartPaymentTransaction } from '../../services/payment.service'

const getJsonFromUrl = () => {
    const queryParams = new URLSearchParams(window.location.search);
    const paramsObject = {};
    for (const [key, value] of queryParams.entries()) {
        paramsObject[key] = value;
    }
    return paramsObject;
};

const CartPage = () => {
    document.title = 'Cart | KAIZEN 2024';
    const { session, user } = useAuth();
    const navigate = useNavigate();
    const user_id = session.user.id;
    const email = session.user.email;
    const [discount, setDiscount] = useState(1);
    const [verifyingPayment, setVerifyingPayment] = useState(false);
    const [loading, setLoading] = useState(false);
    const [paymentCredentials, setPaymentCredentials] = useState({
        isOpen: false,
        clientCode: import.meta.env.VITE_PAYMENT_CLIENT_CODE,
        transUserName: import.meta.env.VITE_PAYMENT_USERNAME,
        txtnId: '',
        transUserPassword: import.meta.env.VITE_PAYMENT_PASSWORD,
        authkey: import.meta.env.VITE_PAYMENT_AUTH_KEY,
        authiv: import.meta.env.VITE_PAYMENT_AUTH_IV,
        callbackUrl: `${import.meta.env.VITE_APP_SUPABASE_REDIRECT_URI}/cart`,
        name: "",
        email: "",
        phone: "",
        address: "",
        amount: 0,
        udf1: "events", udf2: "", udf3: "", udf4: "", udf5: "", udf6: "", udf7: "", udf8: "", udf9: "", udf10: "", udf11: "", udf12: "", udf13: "", udf14: "", udf15: "", udf16: "", udf17: "", udf18: "", udf19: "", udf20: "", channelId: "", programId: "", mcc: "",
        env: 'prod'
    });

    const { data: cartItems, isLoading, refetch } = useQuery({
        queryKey: ['cart'],
        queryFn: () => getUserEventCart('cart', user_id),
    })

    const handleDelete = async (id) => {
        try {
            await deleteCartItem('cart', id);
            refetch();
            toast.success('Event removed from cart successfully');
        } catch (error) {
            console.log(error);
            toast.error('Failed to remove event from cart');
        }
    }

    const checkEmail = () => {
        if (email.endsWith('aiimspatna.org')) {
            setDiscount(0.2);
        }
    }

    // check if cart has members equal to minMembers and less than maxMembers
    const cartItemsMembers = () => {
        let flag = false;
        cartItems.forEach(item => {
            if (item.events.minMembers > item.members.length || item.events.maxMembers < item.members.length) {
                flag = true;
            }
        });
        return flag;
    }

    const handlePayment = async () => {
        if (!user.address || !user.mobile) {
            toast.error('Please update your profile with address and mobile number to proceed with payment');
            return navigate('/edit-profile');
        }

        if (cartItems && cartItems.length === 0) {
            toast.error('Cart is empty. Please add events to cart to proceed with payment');
            return navigate('/events');
        }

        if (cartItemsMembers()) {
            return toast.error('One or more events in cart have less than minimum members required. Please add more members to proceed with payment');
        }

        setLoading(true);

        try {
            const txnId = generateTxnId();

            const data = {
                user_id: user.id,
                clientTxnId: txnId,
                user_email: email,
                amount: (cartItems.reduce((acc, item) => acc + Number(item.events.price), 0) * discount).toFixed(0),
                cart_data: cartItems
            }

            await createCartPaymentTransaction(data);

            setLoading(false);

            setPaymentCredentials({
                ...paymentCredentials,
                isOpen: true,
                txtnId: txnId,
                amount: data.amount,
                name: user.name,
                email: user.email,
                phone: user.mobile,
                address: user.address,
            });

        } catch (error) {
            console.log(error);
            toast.error('Failed to initiate payment. Please try again later');
        } finally {
            setLoading(false);
        }
    }


    const getQueryParams = async () => {
        const params = getJsonFromUrl();
        if (!params.status) return;

        if (params.status) {
            setVerifyingPayment(true);
            try {
                const respone = await updateCartPaymentTransaction({ clientTxnId: params.clientTxnId });

                if (respone.status === 'SUCCESS') {
                    toast.success('Payment Successful! Thank you for your contribution!');
                } else if (respone.status === 'FAILED') {
                    toast.error('Payment Failed! Please try again later!');
                    toast.error('If the amount has been deducted from your account, please wait for 24 hours for payment verification.');
                } else {
                    toast.error('Some error occurred! Please try again later!');
                    toast.error('If the amount has been deducted from your account, please wait for 24 hours for payment verification.');
                }

            } catch (error) {
                console.log(error);
                toast.error('Some error occurred! Please try again later!');
            } finally {
                setVerifyingPayment(false);
                navigate('/profile');
            }
        }
    };

    useEffect(() => {
        getQueryParams();
        checkEmail();
    }, []);

    return (
        <main className='bg-black min-h-screen'>
            <div className='cart-banner'>
                <h1 className='cart-head'>Your Event<br />Cart</h1>
            </div>

            {loading && (
                <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center flex-col gap-3'>
                    <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-yellow-500'></div>
                    <p>Proceeding to Payment...</p>
                    <p>Please do not close this window or press back button.</p>
                </div>
            )}

            {verifyingPayment && (
                <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center flex-col gap-3'>
                    <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-yellow-500'></div>
                    <p>Verifying Payment...</p>
                    <p>Please do not close this window or press back button.</p>
                </div>
            )}

            <div className='cart-container'>
                {
                    isLoading ? <div> Loading...</div> : (cartItems.length === 0 ?
                        <div className='empty-cart flex text-center flex-col justify-center gap-10'>
                            <p>Your Cart is Empty.</p>
                            <p className='text-lg'>Go to <Link className='text-yellow-500' to='/events'>Events</Link> page to add events to cart.</p>
                        </div> :
                        <div className='cart-items'>
                            {
                                cartItems.map((item) => (
                                    <CartItem refetch={refetch} key={item.id} data={item} handleDelete={() => handleDelete(item.id)} />
                                ))
                            }
                        </div>
                    )
                }

                {
                    cartItems && cartItems.length !== 0 && <div className='flex flex-col items-center justify-between w-[100%] mt-24 mb-16'>
                        <div className='flex items-center justify-between lg:w-[80%] md:w-[85%] w-[90%] '>
                            {discount === 1 ?
                                <span className='text-xl md:text-2xl lg:text-2xl text-yellow-600'>
                                    Total <span className='font-bold'>
                                        ₹  {cartItems.reduce((acc, item) => acc + Number(item.events.price), 0)}
                                    </span>
                                </span> :
                                <div className='flex flex-col'>
                                    <span className='text-xl md:text-2xl lg:text-2xl text-yellow-600 flex items-center gap-1'>
                                        Total
                                        <span className='text-red-500 text-base' style={{
                                            textDecoration: 'line-through',
                                        }}>
                                            ₹ {cartItems.reduce((acc, item) => acc + Number(item.events.price), 0).toFixed(0)}
                                        </span>
                                        <span className='font-bold'>
                                            ₹  {(cartItems.reduce((acc, item) => acc + Number(item.events.price), 0) * discount).toFixed(0)}
                                        </span>
                                    </span>
                                    <p className='text-green-500'>
                                        AIIMS Patna exclusive 80% discount applied!
                                    </p>
                                </div>
                            }



                            <button onClick={handlePayment} className='bg-black shadow-xl py-2 lg:px-5  md:px-5 px-3 rounded-xl border  border-[#ebe6d0] font-semibold text-lg font-mono text-[#ebe6d0] hover:bg-[#ebe6d0] hover:text-black transition-all delay-75 ease-out'>
                                Proceed to Pay
                            </button>
                        </div>
                    </div>
                }
            </div>

            <PaymentInitModal
                amount={String(paymentCredentials.amount)}
                payerMobile={paymentCredentials.phone}
                payerName={paymentCredentials.name}
                payerEmail={paymentCredentials.email}
                payerAddress={paymentCredentials.address}
                clientCode={paymentCredentials.clientCode}
                transUserPassword={paymentCredentials.transUserPassword}
                transUserName={paymentCredentials.transUserName}
                callbackUrl={paymentCredentials.callbackUrl}
                isOpen={paymentCredentials.isOpen}
                authkey={paymentCredentials.authkey}
                authiv={paymentCredentials.authiv}
                env={paymentCredentials.env}
                clientTxnId={paymentCredentials.txtnId}
                amountType={'INR'}
                label={'prod'}
            />
        </main >
    )
}

export default CartPage