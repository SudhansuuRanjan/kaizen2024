import React from 'react'
import { Link } from 'react-router-dom'

const Error = () => {
    document.title = "Error 404 - KAIZEN 2024"
    return (
        <div className='h-screen flex flex-col justify-center items-center'>
            <img src="https://nasgofficialweb.vercel.app/_next/image?url=%2Fimages%2F404.png&w=640&q=75" alt="404" className='lg:h-[17rem]md:h-[17rem] h-[15rem]' />
            <div className='flex items-center justify-center flex-col'>
                <p>There is nothing there!</p>
                <Link to='/' className='mt-5'>
                    <button className='py-2 px-6 rounded-full border-black border hover:border-green-500 bg-green-500 text-black hover:bg-black hover:text-green-500'>Return to Home</button>
                </Link>
            </div>
        </div>
    )
}

export default Error