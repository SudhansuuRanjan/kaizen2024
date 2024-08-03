import React, { useState, useEffect } from 'react'
import { AiFillDelete } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { PaymentInitModal } from 'pg-test-project';
import { generateTxnId } from '../../utils/generateRandomID';
import { Input } from '../../components/Form';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import { applyPromoCode, createPassTransaction } from '../../services/br.service';
import { updatePassPaymentTransaction } from '../../services/payment.service';
const currentPrice = 5;

const GetPass = () => {
    document.title = "Kaizen | Basic Registration";

    const { user } = useAuth();
    const { register, reset, handleSubmit, formState: { errors }, setValue } = useForm({ trim: true });

    const navigate = useNavigate();
    const [peoples, setPeoples] = useState([]);
    const [hasPromoCode, setHasPromoCode] = useState(false);
    const [promoCode, setPromoCode] = useState('');
    const [isPromoCodeApplied, setIsPromoCodeApplied] = useState(false);
    const [discountedPrice, setDiscountedPrice] = useState({
        total_amount: 0,
        grp_discount: 0,
        promo_discount: 0,
        final_amount: 0
    });
    const [tnc, setTnc] = useState(false);
    const [loading, setLoading] = useState(false);
    const [gt10, setGt10] = useState(false);
    const [paymentCredentials, setPaymentCredentials] = useState({
        isOpen: false,
        clientCode: import.meta.env.VITE_PAYMENT_CLIENT_CODE,
        transUserName: import.meta.env.VITE_PAYMENT_USERNAME,
        txtnId: '',
        transUserPassword: import.meta.env.VITE_PAYMENT_PASSWORD,
        authkey: import.meta.env.VITE_PAYMENT_AUTH_KEY,
        authiv: import.meta.env.VITE_PAYMENT_AUTH_IV,
        callbackUrl: `${import.meta.env.VITE_APP_SUPABASE_REDIRECT_URI}/basic-registration`,
        name: "",
        email: "",
        phone: "",
        address: "",
        amount: 0,
        udf1: "pass", udf2: "", udf3: "", udf4: "", udf5: "", udf6: "", udf7: "", udf8: "", udf9: "", udf10: "", udf11: "", udf12: "", udf13: "", udf14: "", udf15: "", udf16: "", udf17: "", udf18: "", udf19: "", udf20: "", channelId: "", programId: "", mcc: "",
        env: 'prod'
    });
    const [self, setSelf] = useState(false);
    const [verifyingPayment, setVerifyingPayment] = useState(false);

    const getQueryParams = async () => {
        let params = getJsonFromUrl();
        if (!params.status) return;

        if (params.status) {
            setVerifyingPayment(true);
            try {
                const response = await updatePassPaymentTransaction({ clientTxnId: params.clientTxnId });

                if (response.status === 'SUCCESS') {
                    toast.success('Payment Successful! Your basic registration pass will be sent to your email shortly.');
                } else if (response.status === 'FAILED') {
                    toast.error('Payment Failed! Please try again.');
                    toast.error('If the amount has been deducted from your account, please wait for 24 hours for payment verification.');
                } else {
                    toast.error('Some error occurred! Please try again later!');
                    toast.error('If the amount has been deducted from your account, please wait for 24 hours for payment verification.');
                }
            } catch (error) {
                toast.error('Some error occurred! Please try again later!');
            } finally {
                setVerifyingPayment(false);
                navigate('/basicregistration');
            }
        }
    }

    const getPeoples = async () => {
        if (localStorage.getItem('peoples') === null) return setPeoples([]);
        localStorage.getItem('peoples') && setPeoples(JSON.parse(localStorage.getItem('peoples')));
    }

    function getJsonFromUrl() {
        const queryParams = new URLSearchParams(window.location.search);
        const paramsObject = {};
        for (const [key, value] of queryParams.entries()) {
            paramsObject[key] = value;
        }
        return paramsObject;
    }

    const onSubmit = (data) => {
        setSelf(false);
        data.id = generateTxnId();
        const newData = [...peoples, data];
        setPeoples(newData);
        localStorage.setItem('peoples', JSON.stringify(newData));
        reset();
        if (newData.length >= 10) {
            setGt10(true);
            toast.success('Group Discount Applied!');
        } else {
            setGt10(false);
        }
        setIsPromoCodeApplied(false);
        setDiscountedPrice({
            ...discountedPrice,
            total_amount: newData.length * currentPrice,
            grp_discount: newData.length >= 10 ? newData.length * currentPrice * 0.1 : 0,
            promo_discount: 0,
            final_amount: newData.length * currentPrice - discountedPrice.grp_discount
        });
    }

    const handleDelete = (id) => {
        const newPeoples = peoples.filter((people) => people.id !== id);
        localStorage.setItem('peoples', JSON.stringify(newPeoples));
        setPeoples(newPeoples);
        setIsPromoCodeApplied(false);
        setPromoCode('');

        setDiscountedPrice({
            ...discountedPrice,
            total_amount: newPeoples.length * currentPrice,
            grp_discount: newPeoples.length >= 10 ? newPeoples.length * currentPrice * 0.1 : 0,
            promo_discount: 0,
            final_amount: newPeoples.length * currentPrice - discountedPrice.grp_discount
        });

        if (newPeoples.length < 10) {
            setGt10(false);
        }
    }



    const handlePromoCode = async (e) => {
        e.preventDefault();
        if (promoCode === "") return;
        if (peoples.length === 0) {
            toast.warn('Please add atleast one person to apply promo code!');
            setIsPromoCodeApplied(false);
            return;
        }
        try {
            const res = await applyPromoCode(promoCode, peoples);
            if (res.status === 'success') {
                toast.success(res.message);
                setDiscountedPrice(res.amounts);
                setIsPromoCodeApplied(true);
            }
        } catch (error) {
            toast.error(error.response.data.message);
            setIsPromoCodeApplied(false);
        }
    }

    const handlePaymentInit = async () => {
        if (peoples.length < 1) {
            toast.warn('Please add atleast one person to purchase!');
            return;
        }
        if (!tnc) {
            toast.warn('Please accept terms and conditions to purchase!');
            return;
        }
        setLoading(true);

        const txnId = generateTxnId();

        try {
            const data = await createPassTransaction(txnId, peoples, promoCode, user);
            if (data.status === 'success') {
                setPaymentCredentials({
                    ...paymentCredentials,
                    isOpen: true,
                    amount: Math.round(data.amounts.final_amount),
                    txtnId: txnId,
                    name: user.name,
                    email: user.email,
                    phone: user.mobile,
                })
            } else {
                setLoading(false);
                toast.error('Payment init failed! Please try again');
            }
        } catch (error) {
            setLoading(false);
            toast.error(error.response.data.message);
        }
    }

    useEffect(() => {
        getPeoples();
        getQueryParams();
    }, []);

    useEffect(() => {
        if (user) {
            if (!user.mobile && !user.college && !user.address) {
                toast.error('Please complete your profile first');
                return navigate('/edit-profile');
            }
        }
    }, [user])

    useEffect(() => {
        if (user) {
            setDiscountedPrice({
                total_amount: peoples.length * currentPrice,
                grp_discount: peoples.length >= 10 ? peoples.length * currentPrice * 0.1 : 0,
                promo_discount: 0,
                final_amount: peoples.length * currentPrice - (peoples.length >= 10 ? peoples.length * currentPrice * 0.1 : 0)
            })
        }
    }, [user, peoples])


    return (
        <div className='bg-black pb-24'>
            {
                loading && <div className='fixed top-0 left-0 w-full h-full text-center px-3 bg-black bg-opacity-50 z-50 flex justify-center items-center flex-col gap-3'>
                    <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-yellow-500'>
                    </div>
                    <p>
                        Proceeding to Payment...
                    </p>
                    <p>
                        Please do not close this window or press back button.
                    </p>
                </div>
            }

            {verifyingPayment && (
                <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center flex-col gap-3'>
                    <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-yellow-500'></div>
                    <p>Verifying Payment...</p>
                    <p>Please do not close this window or press back button.</p>
                </div>
            )}

            <div className='cart-banner'>
                <h1 className='cart-head lg:mx-0 md:mx-0 mx-5'>Basic Registration</h1>
            </div>
            <p className='text-center text-yellow-500 text-lg mb-[7rem] lg:max-w-[55rem] md:max-w-[40rem] w-full px-6 m-auto'>
                Your basic registration <span className='text-red-500 font-medium'>DOES NOT</span> include participation in cultural, literary, arts, informals and sports competitions. To participate in them, register seperately <Link to="/events" className='text-blue-400 font-medium'>here</Link>.
            </p>
            <div className='lg:w-[37rem] md:w-[32rem] w-[90%] bg-white rounded-2xl text-gray-700 m-auto mt-5'>
                <div className='px-5 py-5'>
                    <h1 className='text-xl font-semibold'>KAIZEN AIIMS, Patna</h1>
                    <h2 className='text-base font-medium'>Get your basic registration done!</h2>
                </div>
                <div className='flex justify-between items-center'>
                    <div className='bg-black h-8 w-8 rounded-full ml-[-1rem] z-30'>
                    </div>

                    <hr className='border-t-2 border-dotted border-gray-400  bg-[#fff] h-[2px] w-[90%]' />

                    <div className='bg-black h-8 w-8 rounded-full mr-[-1rem] z-30'>
                    </div>
                </div>
                <div className='bg-[url("https://firebasestorage.googleapis.com/v0/b/kaisen2023.appspot.com/o/images%2Fbsic-reg.jpg?alt=media&token=d796d016-e48e-419c-9ca7-f3422ad0e28e")] mt-[-1rem] bg-cover bg-center w-full h-fit text-sm text-white font-normal'>
                    <div className='h-full w-full bg-black bg-opacity-80 p-5'>
                        <p className='pb-2 text-yellow-400 text-base'>This Basic Registration includes:</p>
                        <ul className='list-inside'>
                            {/* <li>✅Lunch on all 5 days</li> */}
                            {/* <li>✅ Kaizen Merchandise & Goodies</li> */}
                            <li>✅ Access to all the events</li>
                            <li>✅ A seat in Medical Workshops lead under eminent faculty of AIIMS Patna:</li>
                            <ul className='list-inside ml-4'>
                                <li>👉 Basic Life Support (BLS)  Workshop</li>
                                <li>👉 Workshop on Laporoscopic Surgery</li>
                                <li>👉 Suturing Workshop</li>
                                <li>👉 Hand Hygiene Skill Station</li>
                            </ul>
                            <li>✅ Participation in Gully Cricket, Darts, Arm Wrestling and Push-up Challenge</li>
                            <li>✅ Access to our 360° Selfie Booth</li>
                            <li>✅ Bus transportation facility against designated routes in Patna</li>
                            <li>✅ Audience viewership across all events held under Kaizen, AIIMS Patna</li>
                        </ul>
                    </div>
                </div>
                {/* <div className='z-0'>
                    <img className='w-full h-fit mt-[-1rem]' src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/199011/concert.png" alt="event" />
                </div> */}
                <div className='flex p-6'>
                    <p className='font-medium text-red-500 text-center'>*Confirmation mail will be sent to each email separately.</p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className='flex gap-2 flex-col w-full p-6 pt-0'>
                    <Input
                        label='Name'
                        type='text'
                        placeholder='Your Name'
                        title='name'
                        require={true}
                        reactHookForm={register('name', {
                            required: 'Name is required',
                            minLength: {
                                value: 2,
                                message: 'Name must be at least 2 characters',
                            },
                            maxLength: {
                                value: 256,
                                message: 'Name must not exceed 256 characters',
                            },
                        })}
                        labelStyles='text-gray-800 font-medium'
                        className='rounded-lg px-3 py-2 mt-1 w-full border-2 border-gray-200'
                        errors={errors.name}
                    />

                    <Input
                        label="Email"
                        type="email"
                        placeholder="Email ID"
                        title="email"
                        reactHookForm={register('email', {
                            required: 'Email ID is required for sending confirmation email.',
                            pattern: {
                                value: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+\.[^@\s]+$/i,
                                message: 'Email must be a valid email address',
                            },
                            maxLength: {
                                value: 256,
                                message: 'Email must not exceed 256 characters',
                            },
                        })}
                        labelStyles='text-gray-800 font-medium'
                        className='rounded-lg px-3 py-2 mt-1 w-full border-2 border-gray-200'
                        errors={errors.email}
                    />
                    <Input
                        label='College / Institute'
                        type='text'
                        placeholder='AIIMS, Patna'
                        title='college'
                        require={true}
                        reactHookForm={register('college', {
                            required: 'College name is required',
                            minLength: {
                                value: 3,
                                message: 'College name must be at least 3 characters',
                            },
                            maxLength: {
                                value: 256,
                                message: 'College name must not exceed 256 characters',
                            },
                        })}
                        labelStyles='text-gray-800 font-medium'
                        className='rounded-lg px-3 py-2 mt-1 w-full border-2 border-gray-200'
                        errors={errors.college}
                    />
                    <Input
                        label='Mobile No.'
                        type='text'
                        require={true}
                        placeholder='Phone'
                        title='phone'
                        reactHookForm={register('phone', {
                            required: 'Mobile no. is required for sending updates.',
                            minLength: {
                                value: 10,
                                message: 'Mobile no. must be 10 characters or more'
                            },
                            maxLength: {
                                value: 16,
                                message: 'Mobile no. must not exceed 14 characters'
                            },
                        })}
                        labelStyles='text-gray-800 font-medium'
                        className='rounded-lg px-3 py-2 mt-1 w-full border-2 border-gray-200'
                        errors={errors.phone}
                    />

                    <data className='flex items-center gap-2'>
                        <input
                            checked={self}
                            type="checkbox"
                            name="self"
                            onChange={(e) => {
                                setSelf(e.target.checked);
                                if (e.target.checked) {
                                    setValue('name', user.name);
                                    setValue('college', user.college);
                                    setValue('email', user.email);
                                    setValue('phone', user.mobile);
                                } else {
                                    reset();
                                    setSelf(false);
                                }
                            }}
                        />

                        <p>
                            Add self
                        </p>
                    </data>

                    <div className='flex flex-col w-full'>
                        <button className='bg-yellow-500 text-gray-900 py-2 my-3 rounded-lg font-semibold' type="submit">Add</button>
                    </div>
                </form>

                <div>
                    <h1 className='text-xl font-semibold text-center'>Attendees</h1>
                    <div className='flex flex-col gap-2 p-6'>
                        {peoples.length === 0 ? <div className='text-center'>No attendees added.</div> : peoples.map((people, idx) => (
                            <div key={people.id} className='flex justify-between border-gray-200 border p-3 rounded-xl'>
                                <div className='flex flex-col gap-2'>
                                    <h1 className='text-base font-semibold'>Name : {people.name}</h1>
                                    <h2 className='text-sm font-medium'>Email: {people.email}</h2>
                                    <h2 className='text-sm font-medium'>College : {people.college}</h2>
                                    <h2 className='text-sm font-medium'>Mobile No. : {people.phone}</h2>
                                </div>
                                <div className='flex flex-col items-end justify-between'>
                                    <button onClick={() => handleDelete(people.id)} className='text-red-500 cursor-pointer' type="submit"><AiFillDelete size={25} /></button>
                                    <h6 className='text-blue-500 font-semibold'>₹{currentPrice}</h6>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className='py-10 flex justify-between items-center'>
                    <div className='bg-black h-8 w-8 rounded-full ml-[-1rem]'>
                    </div>

                    <hr className='border-t-2 border-dotted border-gray-400  bg-[#fff] h-[2px] w-[90%]' />

                    <div className='bg-black h-8 w-8 rounded-full mr-[-1rem]'>

                    </div>
                </div>
                <div>
                    <h1 className='text-2xl font-semibold text-center'>Total</h1>
                    <div className='flex justify-between px-6 py-1'>
                        <h1 className='text-base font-semibold'>Total Persons</h1>
                        <h1 className='text-base font-semibold'>{peoples.length}</h1>
                    </div>
                    <div className='flex justify-between px-6 py-1'>
                        <h1 className='text-base font-semibold text'>Total Amount</h1>
                        <h1 className='font-semibold'>
                            <span className=' text-gray-900'>
                                {`₹${discountedPrice.total_amount}`}
                            </span>
                        </h1>
                    </div>
                    {peoples.length >= 10 && <div className='flex justify-between px-6 py-1'>
                        <h1 className='text-base font-semibold text'>Group Discount</h1>
                        <h1 className='font-semibold'>
                            <span className=' text-gray-900'>
                                {`- ₹${discountedPrice.grp_discount}`}
                            </span>
                        </h1>
                    </div>}

                    {isPromoCodeApplied && <div className='flex justify-between px-6 py-1'>
                        <h1 className='text-base font-semibold text'>Coupon Discount</h1>
                        <h1 className='text-2xl font-semibold text-rose-500'>
                            <span className='text-lg text-gray-900'>
                                {`- ₹${discountedPrice.promo_discount}`}
                            </span>
                        </h1>
                    </div>}

                    <div className='flex justify-between px-6'>
                        <h1 className='text-base font-semibold text'>Final Amount</h1>
                        <h1 className='text-2xl font-semibold text-green-500'>
                            <span>
                                {
                                    `₹${discountedPrice.final_amount}`
                                }
                            </span>
                        </h1>
                    </div>



                    <div className='pb-5'>
                        {
                            peoples.length >= 10 && <p className='text-sm text-center font-medium text-green-500'>Group Discount Applied!</p>
                        }

                        {
                            promoCode && isPromoCodeApplied && <p className='text-sm text-center font-medium text-green-500'>Promo Code {promoCode} Applied!</p>
                        }
                    </div>
                </div>

                <div className='px-6'>

                    <div className='flex gap-3 items-center pb-2'>
                        <input checked={tnc} type='checkbox' onChange={() => setTnc(!tnc)} />
                        <label className='text-sm font-medium'>I agree to the <Link to="/legals/terms-of-service" className='text-blue-500'>Terms and Conditions</Link>.</label>
                    </div>
                    <div className='flex gap-3 items-center pb-2'>
                        <input checked={hasPromoCode} onChange={
                            () => {
                                if (hasPromoCode) {
                                    setPromoCode('')
                                    setIsPromoCodeApplied(false);
                                    setDiscountedPrice({
                                        ...discountedPrice,
                                        promo_discount: 0,
                                        final_amount: discountedPrice.total_amount - discountedPrice.grp_discount
                                    });
                                }
                                setHasPromoCode(!hasPromoCode);
                            }
                        } type='checkbox' />
                        <label className='text-sm font-medium'>Have a Promo Code ?</label>
                    </div>
                    {hasPromoCode && <div className='flex gap-3 items-center'>
                        <input value={promoCode} onChange={(e) => setPromoCode((e.target.value).trim(""))} className='text-gray-700 px-2 py-1.5 border rounded-lg font-medium w-[12rem]' type="text" id="promo" placeholder="Enter Promo Code" />
                        <button onClick={handlePromoCode} className='font-medium text-gray-900  bg-yellow-500 rounded-full px-5 py-1.5'>Apply</button>
                    </div>}
                </div>

                <div className='flex flex-col w-full px-6 py-8'>
                    <button onClick={handlePaymentInit} className={`bg-yellow-500 text-gray-900 disabled:bg-yellow-600 py-2.5 my-3 rounded-lg font-semibold`}>Proceed to Pay</button>
                </div>
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
        </div>
    )
}

export default GetPass;