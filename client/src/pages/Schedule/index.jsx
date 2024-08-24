import React, { useState, useEffect } from 'react'
import { day1, day2, day3, day4, day5, day6 } from '../../utils/Schedule'
import { MdLocationPin, MdAccessTimeFilled } from 'react-icons/md'
import "./Schedule.scss"


const Schedule = () => {
    const [day, setDay] = useState(day1);

    useEffect(() => {
        document.title = 'Schedule | Kaizen 2024';
    }, [])

    return (
        <div className='pb-24 min-h-screen bg-black'>
            <div className='cart-banner'>
                <h1 className='cart-head lg:mx-0 md:mx-0 mx-5'>Schedule</h1>
            </div>
            <div>
                <div className='flex lg:w-[40rem] md:w-[35rem] w-[87%] justify-center items-center m-auto flex-wrap lg:gap-10 md:gap-4 gap-3 text-[#ebe6d0]'>
                    <button onClick={() => setDay(day1)} className={`transition-all delay-[20ms] ease-in border border-[#ebe6d0] lg:rounded-2xl md:rounded-2xl rounded-xl flex flex-col justify-center items-center w-fit lg:px-4 md:px-4 px-4 lg:py-3 md:py-3 py-2.5 ${day === day1 && 'bg-[#ebe6d0] border-black text-gray-900'}`}>
                        <h1 className='font-semibold lg:text-2xl md:text-2xl text-xl'>Sept.</h1>
                        <p className='font-medium lg:text-xl md:text-xl text-lg'>3<sup>rd</sup></p>
                    </button>

                    <button onClick={() => setDay(day2)} className={`transition-all delay-[20ms] ease-in border border-[#ebe6d0] lg:rounded-2xl md:rounded-2xl rounded-xl flex flex-col justify-center items-center w-fit lg:px-4 md:px-4 px-4 lg:py-3 md:py-3 py-2.5 ${day === day2 && 'bg-[#ebe6d0] border-black text-gray-900'}`}>
                        <h1 className='font-semibold lg:text-2xl md:text-2xl text-xl'>Sept.</h1>
                        <p className='font-medium lg:text-xl md:text-xl text-lg'>4<sup>th</sup></p>
                    </button>

                    <button onClick={() => setDay(day3)} className={`transition-all delay-[20ms] ease-in border border-[#ebe6d0] lg:rounded-2xl md:rounded-2xl rounded-xl flex flex-col justify-center items-center w-fit lg:px-4 md:px-4 px-4 lg:py-3 md:py-3 py-2.5 ${day === day3 && 'bg-[#ebe6d0] border-black text-gray-900'}`}>
                        <h1 className='font-semibold lg:text-2xl md:text-2xl text-xl'>Sept.</h1>
                        <p className='font-medium lg:text-xl md:text-xl text-lg'>5<sup>th</sup></p>
                    </button>

                    <button onClick={() => setDay(day4)} className={`transition-all delay-[20ms] ease-in border border-[#ebe6d0] lg:rounded-2xl md:rounded-2xl rounded-xl flex flex-col justify-center items-center w-fit lg:px-4 md:px-4 px-4 lg:py-3 md:py-3 py-2.5 ${day === day4 && 'bg-[#ebe6d0] border-black text-gray-900'}`}>
                        <h1 className='font-semibold lg:text-2xl md:text-2xl text-xl'>Sept.</h1>
                        <p className='font-medium lg:text-xl md:text-xl text-lg'>6<sup>th</sup></p>
                    </button>

                    <button onClick={() => setDay(day5)} className={`transition-all delay-[20ms] ease-in border border-[#ebe6d0] lg:rounded-2xl md:rounded-2xl rounded-xl flex flex-col justify-center items-center w-fit lg:px-4 md:px-4 px-4 lg:py-3 md:py-3 py-2.5 ${day === day5 && 'bg-[#ebe6d0] border-black text-gray-900'}`}>
                        <h1 className='font-semibold lg:text-2xl md:text-2xl text-xl'>Sept.</h1>
                        <p className='font-medium lg:text-xl md:text-xl text-lg'>7<sup>th</sup></p>
                    </button>

                    <button onClick={() => setDay(day6)} className={`transition-all delay-[20ms] ease-in border border-[#ebe6d0] lg:rounded-2xl md:rounded-2xl rounded-xl flex flex-col justify-center items-center w-fit lg:px-4 md:px-4 px-4 lg:py-3 md:py-3 py-2.5 ${day === day6 && 'bg-[#ebe6d0] border-black text-gray-900'}`}>
                        <h1 className='font-semibold lg:text-2xl md:text-2xl text-xl'>Sept.</h1>
                        <p className='font-medium lg:text-xl md:text-xl text-lg'>8<sup>th</sup></p>
                    </button>
                </div>


                <div className='mt-16 mb-24 m-auto'>
                    <h1 className='text-center mb-10 text-3xl font-semibold text-yellow-500'>
                        {
                            day === day1 && 'September 3' || day === day2 && 'September 4' || day === day3 && 'September 5' || day === day4 && 'September 6'
                            || day === day5 && 'September 7' || day === day6 && 'September 8'
                        }
                        {/* <sup>th</sup> */}
                    </h1>
                    {
                        day.regular.map((item, idx) => (
                            <div key={idx} className='flex flex-col lg:w-[40rem] md:w-[35rem] w-[95%] m-auto my-5'>
                                <div>
                                    <div className='flex flex-col'>
                                        <h1 className='font-semibold lg:text-2xl md:text-2xl text-xl'>{item.time}</h1>
                                    </div>
                                    <div className='flex items-start flex-col border-l-2 border-dashed border-yellow-500 mt-5 gap-3 ml-3'>
                                        {
                                            item.events.map((event) => (
                                                <div data-aos="fade-up" key={event.id} className='flex flex-col justify-center items-start bg-gray-900 rounded-xl p-5 ml-5 gap-2 w-[90%]'>
                                                    <h1 className='font-semibold lg:text-2xl md:text-2xl text-xl'>{event.name}</h1>
                                                    <div className='flex items-center gap-2'>
                                                        <MdLocationPin className='inline-block text-yellow-500 -ml-1' size={27} />
                                                        <p className='inline-block font-medium lg:text-lg md:text-lg text-base text-gray-400'>{event.venue}</p>
                                                    </div>
                                                    <div className='flex items-center gap-2'>
                                                        <MdAccessTimeFilled className='inline-block text-red-500' size={22} />
                                                        <p className='inline-block font-medium lg:text-lg md:text-lg text-base text-gray-400 ml-1.5'>{item.time}</p>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>

                        ))
                    }

                    {day.special && <div className='flex flex-col lg:w-[40rem] md:w-[35rem] w-[95%] m-auto mt-2'>
                        <div className='font-semibold lg:text-2xl md:text-2xl text-xl'>
                            SPECIAL EVENTS
                        </div>
                        <div className='flex flex-col gap-6 my-5'>
                            {
                                day.special.map((item, idx) => (
                                    <div data-aos="fade-up" key={idx} className='bg-zinc-900 rounded-xl py-5 px-5  border-yellow-500 border-2 lg:mr-10 md:mr-10 mr-5  font-bold text-2xl text-yellow-500 shadow-lg flex flex-col gap-2'>
                                        <h1 className='font-semibold lg:text-2xl md:text-2xl text-xl'>{item.name}</h1>
                                        <div className='flex items-center gap-2'>
                                            <MdLocationPin className='inline-block text-yellow-500 -ml-1' size={27} />
                                            <p className='inline-block font-medium lg:text-lg md:text-lg text-base text-gray-400'>{item.venue}</p>
                                        </div>
                                        <div className='flex items-center gap-2'>
                                            <MdAccessTimeFilled className='inline-block text-yellow-500' size={22} />
                                            <p className='inline-block font-medium lg:text-lg md:text-lg text-base text-gray-400 ml-1.5'>{item.time}</p>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>}

                    <div className='flex items-center justify-center gap-3 mt-24'>
                        <div className='h-3 w-3 bg-yellow-500 rotate-45' />
                        <div className='h-3 w-3 bg-yellow-500 rotate-45' />
                        <div className='h-3 w-3 bg-yellow-500 rotate-45' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Schedule