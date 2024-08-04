import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth';
import { useEffect } from 'react';
import { toast } from 'react-toastify';


const GetPass = () => {
    document.title = "Kaizen | Basic Registration"

    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            if (user.mobile && user.college) {
                return navigate('/basic-registration');
            }
            toast.error('Please complete your profile first');
            navigate('edit-profile');
        }
    }, [user])

    return (
        <div className='bg-black pb-24'>
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
                <img src="pass-banner.webp" alt="event" className='-mt-4' />
                {/* <div className='z-0'>
                    <img className='w-full h-fit mt-[-1rem]' src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/199011/concert.png" alt="event" />
                </div> */}
                <div className='p-6'>
                    <div className='h-full w-full p-5'>
                        <p className='pb-2 text-rose-400 text-lg font-semibold'>This Basic Registration includes:</p>
                        <ul className='list-inside font-medium'>
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

                    <p className='font-medium text-red-500 text-center'>*Confirmation mail will be sent to each email separately.</p>

                    <div className='mt-5'>
                        <Link to="/basic-registration">
                            <button className='text-white bg-rose-500 w-full py-2.5 rounded-lg font-medium hover:bg-rose-600'>
                                Proceed for Basic Registration
                            </button>
                        </Link>
                    </div>
                </div>

                <div className='py-10 pt-5 flex justify-between items-center'>
                    <div className='bg-black h-8 w-8 rounded-full ml-[-1rem]'>
                    </div>
                    <hr className='border-t-2 border-dotted border-gray-400  bg-[#fff] h-[2px] w-[90%]' />
                    <div className='bg-black h-8 w-8 rounded-full mr-[-1rem]'>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GetPass;