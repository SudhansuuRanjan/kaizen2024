import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { getDocumentById } from '../../services/doc.service';
import { useQuery } from '@tanstack/react-query';
import RegisterPopup from './RegisterPopup';
import useAuth from '../../hooks/useAuth';
import { useState } from 'react';
import './Event.css';

const EventDetails = () => {
    const [popup, setPopup] = useState(false);
    const navigate = useNavigate();
    const { eventId } = useParams()
    const { user } = useAuth();

    const { data, isPending, isError } = useQuery({
        queryKey: ["event", eventId],
        queryFn: () => getDocumentById('events', eventId),
        staleTime: Infinity,
        refetchOnWindowFocus: false
    })

    // handle register button
    const checkAuthNActive = (status) => {
        if (user === null) {
            toast.error("Please login to continue!");
            navigate('/signin');
        } else {
            if (status !== 'Active') return;
            setPopup(true);
        }
    }

    return (
        <div className='bg-black pb-[5rem] min-h-screen relative'>
            {
                popup && <RegisterPopup event={data} setPopup={setPopup} />
            }

            {
                isPending ? <div className='flex pt-[10rem] w-[100%] items-center justify-center'> <p>Loading...</p></div> :
                    isError ? <div className='flex pt-[10rem] w-[100%] items-center justify-center'> <p>Something went wrong...</p></div> :
                        (
                            <>
                                <div className='event-page-head'>
                                    <h1>{data.name}</h1>
                                    <p className='lg:text-4xl text-3xl font-medium py-2'>{data.tagline}</p>
                                    {
                                        data.sponsorLogo && <div className='py-6 flex flex-col items-center justify-center'><i>Sponsored by <a href={data.sponsorName} className='text-yellow-500 text-lg font-medium'>
                                            <img className='h-10 m-auto mt-3' src={data.sponsorLogo} alt="sponsor" />
                                        </a></i>
                                        </div>
                                    }
                                </div>

                                <div className='event-page-event-container'>
                                    <div className='event-img-container'>
                                        <img src={data.image} alt="envent" loading='lazy' />
                                    </div>
                                    <div className='event-details-container'>
                                        <div>
                                            <div className='flex gap-5 items-center'>
                                                <img src="circle-selected.svg" alt="wsw" />
                                                <h3 className='font-bold lg:text-2xl text-xl'>About the event</h3>
                                            </div>
                                            <p className='details-text'>
                                                {data.description}
                                            </p>
                                            <div className='flex pt-2 flex-col justify-between items-start gap-4 text-xl w-[100%] font-medium'>
                                                <div className='flex flex-col items-start gap-2 justify-center mb-4'>
                                                    <h3 className='details-text m-0 p-0'>For any query contact:</h3>
                                                    {
                                                        data.eventContacts && data.eventContacts.map((item, index) => {
                                                            return (
                                                                <div key={index} className='flex items-center justify-center gap-1 lg:text-base text-sm'>
                                                                    <span className='m-0 p-0 font-bold'>{item.name} - </span>
                                                                    <a className='m-0 p-0 text-blue-500'>{item.phone}</a>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                                <div className='flex items-center gap-2 justify-center lg:text-2xl md:text-xl text-base'>
                                                    <h3>Team Size:</h3>
                                                    <span className='text-yellow-500'>{data.minMembers == '1' && data.maxMembers == '1' ? 'Solo' : data.minMembers} </span>
                                                    {data.maxMembers != data.minMembers && <><span className='text-yellow-500'>to</span>
                                                        <span className='text-yellow-500'> {data.maxMembers}</span></>}
                                                    <span className='text-yellow-500'>members </span>
                                                </div>
                                            </div>
                                            <div className='flex py-10 pt-6 lg:flex-row md:flex-row flex-col justify-between items-start gap-4 text-xl w-[100%] font-medium border-bottom'>
                                                <div className='flex items-center gap-2 justify-center lg:text-2xl md:text-xl text-base'>
                                                    <h3>Prize Pool:</h3>
                                                    <span className='text-yellow-500 font-bold'> {data.prizes}</span>
                                                </div>
                                                <div className='flex items-center gap-2 justify-center lg:text-2xl md:text-xl text-base'>
                                                    <h3>Registration Fee:</h3>
                                                    <span className='text-yellow-500'> ₹{data.price}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='w-[100%]'>
                                            <a href={data.rulebook} target="_blank" className='w-[100%]'><button className='rulebook-btn'>Rulebook</button></a>
                                            {!data.google_form ? <button onClick={() => checkAuthNActive(data.status)} disabled={data.status !== 'Active'} className='register-btn w-[100%]'>{data.status === 'Active' ? 'Register Now' : data.status}</button>
                                                : <a href={data.google_form} target="_blank"><button className='register-btn w-[100%]'>Register Now</button></a>}
                                        </div>
                                    </div>
                                </div>

                                <div className='flex items-center justify-center gap-3 pt-[10rem]'>
                                    <div className='h-3 w-3 bg-[#ebe6d0] rotate-45' />
                                    <div className='h-3 w-3 bg-[#ebe6d0] rotate-45' />
                                    <div className='h-3 w-3 bg-[#ebe6d0] rotate-45' />
                                </div>
                            </>
                        )
            }
        </div>
    )
}

export default EventDetails