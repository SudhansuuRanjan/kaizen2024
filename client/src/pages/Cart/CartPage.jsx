import './CartPage.scss'
import CartItem from './CartItems'
import useAuth from '../../hooks/useAuth'
import { useQuery } from '@tanstack/react-query'
import { getUserEventCart, deleteCartItem } from '../../services/doc.service'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'


const CartPage = () => {
    document.title = 'Cart | KAIZEN 2023';
    const { session } = useAuth();
    const user_id = session.user.id;

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



    return (
        <main className='bg-black min-h-screen'>
            <div className='cart-banner'>
                <h1 className='cart-head'>Your Event<br />Cart</h1>
            </div>
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
                    )}

                {/* {
                    cartItems.length !== 0 && <div className='flex flex-col items-center justify-between w-[100%] mt-24 mb-16'>
                        <div className='flex items-center justify-between lg:w-[80%] md:w-[85%] w-[90%] '>
                            {discount === 0 ?
                                <span className='text-xl md:text-2xl lg:text-2xl text-yellow-600'>
                                    Total <span className='font-bold'>
                                        ₹  {cartItems.reduce((acc, item) => acc + Number(item.price), 0)}
                                    </span>
                                </span> :
                                <span className='text-xl md:text-2xl lg:text-2xl text-yellow-600 flex items-center gap-1'>
                                    Total <span className='text-red-500 text-base line-through'> ₹ {cartItems.reduce((acc, item) => acc + Number(item.price), 0)}</span>
                                    <span className='font-bold '>
                                        ₹  {discount}
                                    </span>

                                </span>
                            }


                            <Link to="/checkout">
                                <button disabled={disabled} className='bg-black shadow-xl py-2 lg:px-5  md:px-5 px-3 rounded-xl border  border-[#ebe6d0] font-semibold text-lg font-mono text-[#ebe6d0] hover:bg-[#ebe6d0] hover:text-black transition-all delay-75 ease-out'>
                                    Proceed to Pay
                                </button>
                            </Link>
                        </div>
                    </div>
                } */}
            </div>
        </main >
    )
}

export default CartPage