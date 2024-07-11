import React from 'react'
import { FaBuilding } from 'react-icons/fa'
import { AiFillEye } from 'react-icons/ai'
import { MdOutlineEvent } from 'react-icons/md'
import { RiFootprintFill } from 'react-icons/ri'
import CountUp from 'react-countup';

const Highlights = () => {
    return (
        <div className='bg-[url("https://firebasestorage.googleapis.com/v0/b/kaisen2023.appspot.com/o/static-images%2F007d2522-8220-4d3d-b506-8fef870eb1df.jpg?alt=media&token=46a7d8e5-aa90-4461-bd2e-15df0204e7d5")] bg-no-repeat bg-cover flex items-center justify-center flex-col py-10'>
            <div data-aos="fade-up" className='text-center pt-10 pb-10'>
                <h3 className='text-red-600 text-4xl font-bold'>KAIZEN</h3>
                <p className='text-4xl font-bold'>Highlights</p>
            </div>
            <div data-aos="fade-up" className='grid lg:grid-cols-4 md:grid-cols-4 grid-cols-2 gap-5 items-center justify-between lg:h-[20rem] md:h-[20rem] h-fit m-auto lg:w-[55rem] md:w-[90%] w-[80%]'>
                <div className='text-center py-5 flex flex-col items-center justify-center gap-3 bg-black w-[100%] border-b-4 border-b-red-600 hover:border-b-red-700 rounded-xl  bg-opacity-30 hover:bg-opacity-50 backdrop-blur-sm transition-all delay-100 ease-in-out hover:mb-1 z-0 hover:z-10'>
                    <FaBuilding size={42} className="text-red-500 text-3xl my-2 transition-all ease-in delay-100 hover:rotate-360" />
                    <h3 className='text-4xl font-bold'><CountUp end={250} enableScrollSpy={true} />+</h3>
                    <p className='text-xl'>Colleges</p>
                </div>
                <div data-aos="fade-up" className='text-center py-5 flex flex-col items-center justify-center gap-3 bg-black w-[100%] border-b-4 border-b-red-600 hover:border-b-red-700 rounded-xl  bg-opacity-30 hover:bg-opacity-50 backdrop-blur-sm transition-all delay-100 ease-in-out hover:mb-1 z-0 hover:z-10'>
                    <AiFillEye size={42} className="text-red-500 text-3xl my-2 transition-all ease-in delay-100 hover:rotate-180" />
                    <h3 className='text-4xl font-bold'><CountUp end={200} enableScrollSpy={true} />K+</h3>
                    <p className='text-xl'>Eyeballs</p>
                </div>
                <div data-aos="fade-up" className='text-center py-5 flex flex-col items-center justify-center gap-3 bg-black w-[100%] border-b-4 border-b-red-600 hover:border-b-red-700 rounded-xl  bg-opacity-30 hover:bg-opacity-50 backdrop-blur-sm transition-all delay-100 ease-in-out hover:mb-1 z-0 hover:z-10'>
                    <RiFootprintFill size={42} className="text-red-500 text-3xl my-2 transition-all ease-in delay-100 hover:rotate-180" />
                    <h3 className='text-4xl font-bold'><CountUp end={50} enableScrollSpy={true} />K+</h3>
                    <p className='text-xl'>Footfall</p>
                </div>
                <div data-aos="fade-up" className='text-center py-5 flex flex-col items-center justify-center gap-3 bg-black w-[100%] border-b-4 border-b-red-600 hover:border-b-red-700 rounded-xl  bg-opacity-30 hover:bg-opacity-50 backdrop-blur-sm transition-all delay-100 ease-in-out hover:mb-1 z-0 hover:z-10'>
                    <MdOutlineEvent size={42} className="text-red-500 text-3xl my-2 transition-all ease-in delay-100 hover:rotate-360" />
                    <h3 className='text-4xl font-bold'><CountUp end={75} enableScrollSpy={true} />+</h3>
                    <p className='text-xl'>Events</p>
                </div>
            </div>
        </div>
    )
}

export default Highlights