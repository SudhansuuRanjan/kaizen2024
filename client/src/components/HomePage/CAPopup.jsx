import React from 'react'
import { Link } from 'react-router-dom'

const CAPopup = () => {
    return (
        <div className='flex py-32'>
            <div data-aos="fade-up" className='text-center m-auto lg:w-[48rem] md:w-[38rem] w-[90%] p-10 flex flex-col items-center justify-center gap-3 bg-[#344]  border-b-4 border-b-yellow-500 hover:border-b-yellow-600 rounded-2xl  bg-opacity-30 hover:bg-opacity-50 backdrop-blur-sm transition-all delay-100 ease-in-out z-0'>
                <h3 className='lg:text-4xl md:text-4xl text-3xl font-bold my-5 mb-7'>Be the emissary of KAIZEN 2024.</h3>
                <p className='text-xl'>Be a part of the KAIZEN 2024 family and help us spread the word about KAIZEN 2024.</p>
                <p className='text-xl'>Register as a Campus Ambassador and get a chance to win exciting prizes.</p>
                <Link to="/campus-ambassdor">
                    <button className='bg-red-600 hover:bg-red-700 hover:scale-105 transition-all delay-75 ease-in text-white px-7 py-2.5 rounded-xl mt-5'>Register Now</button>
                </Link>
            </div>
        </div>
    )
}

export default CAPopup