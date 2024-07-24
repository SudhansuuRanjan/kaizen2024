import React, { useState } from 'react'
import useAuth from '../../hooks/useAuth'
import ConfettiExplosion from 'react-confetti-explosion';
import { getCurrentUserProfile, getPurchasedEvents, getPurchasedSharedEvents } from '../../services/doc.service';
import { useQuery } from '@tanstack/react-query';
import EventItem from './EventItem';
import { Link } from 'react-router-dom';

const largeProps = {
    force: 0.8,
    duration: 6000,
    particleCount: 300,
    width: 1600,
    colors: ['#041E43', '#1471BF', '#5BB4DC', '#FC027B', '#66D805'],
};

const Profile = () => {
    const { session, signOut, user: curruser } = useAuth();
    const user_id = session.user.id;
    const [isLargeExploding, setIsLargeExploding] = useState(false);

    const { data: user } = useQuery({
        queryKey: ['user', user_id],
        queryFn: () => getCurrentUserProfile(user_id)
    })

    // const { data: purchasedEvents, isLoading: loadingEvents } = useQuery({
    //     queryKey: ['purchasedEvents', user_id],
    //     queryFn: () => getPurchasedEvents('purchased_events', user_id)
    // })

    const { data: sharedEvents, isLoading: loadingSharedEvents } = useQuery({
        queryKey: ['sharedEvents', user_id],
        queryFn: () => getPurchasedSharedEvents('purchased_events_members', curruser.id)
    })

    return (
        <div className="bg-black bg-repeat-y  min-h-screen bg-center bg-cover pt-10 md:pt-12 lg:pt-16 pb-20 relative flex flex-col justify-center items-center">
            <div className="bg-[#000000] bg-opacity-10 backdrop-blur-sm rounded-xl lg:w-[80%] md:w-[95%] w-[95%] bg-center m-auto mt-5 h-fit ">
                {isLargeExploding && <div className='m-auto z-[32136526571] fixed top-0 w-full h-full flex items-center justify-center'>
                    <ConfettiExplosion className='z-100' {...largeProps} />
                </div>}
                {
                    user ? <div className="flex flex-col items-center justify-center m-[auto] w-[90%] h-fit py-16">
                        <div className='flex flex-col md:flex-row lg:flex-row justify-between  items-start md:items-center lg:items-center gap-5 w-[100%]'>

                            <div className='flex gap-5'>
                                <div className='flex flex-col items-center justify-center'>
                                    <div className='overflow-hidden rounded-full h-[5rem] w-[5rem] flex items-center justify-between'>
                                        <img src="pirate.webp" alt="profile" className='w-[5rem] h-auto' />
                                    </div>
                                </div>
                                <div className='flex flex-col items-start'>
                                    <p className='text-xl font-semibold text-center mt-4'>{user.name}</p>
                                    <p className='text-sm text-center text-gray-400'>KAIZEN ID : {user.kaizenid}</p>
                                </div>
                            </div>


                            <div className='flex items-center justify-center gap-2'>
                                <Link to="/edit-profile">
                                    <button className='text-green-500 font-medium py-1 px-5 rounded-full border border-green-500 hover:text-black hover:bg-green-500 hover:border-black'>
                                        Edit Profile
                                    </button>
                                </Link>
                                <button className='hover:bg-red-500 hover:text-black font-medium py-1 px-5 rounded-full border-red-500 border text-red-500' onClick={signOut}>
                                    Logout
                                </button>
                            </div>

                        </div>
                        <div className='flex flex-col items-center justify-center w-[100%] mt-5 h-[1px] bg-yellow-600 bg-opacity-25'>
                        </div>

                        <div className='flex flex-col md:flex-row lg:flex-row w-[100%] justify-between mt-10 gap-8'>
                            <div className='flex flex-col gap-2 lg:w-[50%] md:w-[50%]'>
                                <p className='text-xl font-semibold text-yellow-400'>Personal Details</p>
                                <p className='text-yellow-500 mt-4'>Gender: <span className='text-white'>{user.gender}</span></p>
                                <p className='text-yellow-500'>Contact No.: <span className='text-white'>{user.mobile}</span></p>
                                <p className='text-yellow-500'>Email: <span className='text-white'>{user.email}</span></p>
                                <p className='text-yellow-500'>City: <span className='text-white'>{user.address}</span></p>
                            </div>

                            <div className='flex flex-col gap-2 lg:w-[50%] md:w-[50%]'>
                                <p className='text-xl font-semibold text-yellow-400'>College Details</p>
                                <p className='text-yellow-500 mt-4'>College: <span className='text-white'>{user.college}</span></p>
                                <p className='text-yellow-500'>Year of Study: <span className='text-white'>{user.year}</span></p>
                                <p className='text-yellow-500'>Course: <span className='text-white'>{user.course}</span></p>
                            </div>
                        </div>

                        <div className='flex flex-col items-center justify-center w-[100%] mt-10 h-[1px] bg-yellow-600 bg-opacity-25'>
                        </div>

                        {/* <div className='w-[100%] mt-10'>
                            <p className='text-xl font-semibold text-yellow-400'>Your Registered Events</p>

                            <div className='flex flex-col gap-4 w-[100%] mt-5'>
                                {
                                    loadingEvents ? <div> Loading...</div> : (purchasedEvents.length === 0 ?
                                        <div className='empty-cart flex text-center flex-col justify-center gap-10'>
                                            <p>Your don't have any registered events.</p>
                                            <p className='text-lg'>Go to <Link className='text-yellow-500' to='/events'>Events</Link> page to register.</p>
                                        </div> :
                                        <div className='cart-items'>
                                            {
                                                purchasedEvents.map((item) => (
                                                    <EventItem key={item.id} data={item} />
                                                ))
                                            }
                                        </div>
                                    )
                                }
                            </div>
                        </div> */}

                        <div className='w-[100%] mt-10'>
                            <p className='text-xl font-semibold text-yellow-400'>Your Registered Shared Events</p>

                            <div className='flex flex-col gap-4 w-[100%] mt-5'>
                                {
                                    loadingSharedEvents ? <div> Loading...</div> : (sharedEvents.length === 0 ?
                                        <div className='empty-cart flex text-center flex-col justify-center gap-10'>
                                            <p>Your don't have any registered events.</p>
                                            <p className='text-lg'>Go to <Link className='text-yellow-500' to='/events'>Events</Link> page to register.</p>
                                        </div> :
                                        <div className='cart-items'>
                                            {
                                                sharedEvents.map((item) => (
                                                    <EventItem key={item.id} data={item.cart} />
                                                ))
                                            }
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div> :
                        <div className='flex items-center justify-center w-[100%] h-[50vh]'>
                            <p className='text-2xl font-semibold text-yellow-400'>Loading...</p>
                        </div>
                }

                <div className='flex items-center justify-center gap-3 pb-16'>
                    <div className='h-3 w-3 bg-yellow-200 rotate-45' />
                    <div className='h-3 w-3 bg-yellow-200 rotate-45' />
                    <div className='h-3 w-3 bg-yellow-200 rotate-45' />
                </div>
            </div>
        </div>
    )
}

export default Profile