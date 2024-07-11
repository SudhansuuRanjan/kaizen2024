import React from 'react'
import { Link } from 'react-router-dom'

const EventSchedule = () => {
    return (
        <div className='flex flex-col items-center justify-center gap-20 bg-opacity-20 backdrop-blur-0 rounded-[2rem] lg:w-[70%] w-[90%] m-auto mb-24 z-[1999999]'>
            <h3 data-aos="fade-up" className='text-center font-bold text-4xl pt-20 text-yellow-500'>Event Schedule</h3>
            <p className='text-lg font-medium text-center'>
                KAIZEN 2024 Events are live.<br/> Check out the detailed event schedule.
            </p>
            <div>
                <Link to="/schedule"><button className='px-5 py-2.5 animate-bounce bg-red-500 text-white text-lg font-medium hover:scale-105 transition-all delay-75 rounded-xl ease-in hover:bg-red-600'>
                    KAIZEN Schedule
                </button></Link>
            </div>
        </div>
    )
}

export default EventSchedule