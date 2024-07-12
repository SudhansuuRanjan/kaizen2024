import React from 'react'

const ChiefPatron = () => {
    return (
        <div className='relative bg-no-repeat min-h-fit bg-center bg-cover py-32 bg-[url("https://firebasestorage.googleapis.com/v0/b/kaisen2023.appspot.com/o/static-images%2Fpheonix%20warship%20docked%20at%20port%20at%20sea.jpg?alt=media&token=a437cf0e-61ee-433f-8d23-db3a8caff6b1")]'>
            <div className='flex lg:flex-row md:flex-row flex-col justify-between items-center pt-20 absolute w-[100%] top-0 z-0 md:gap-0 lg:gap-0 gap-20'>
                <img src="wheel.png" alt="wheel" className='lg:h-[17rem] md:h-[17rem] h-[16rem] brightness-75 animate-spin' />
                <img src="compass.png" alt="cpmpass" data-aos="fade-left" className='lg:h-[17rem] md:h-[17rem] h-[16rem] brightness-75' />
            </div>
            <div data-aos="fade-up" className='bg-black bg-opacity-70 backdrop-blur-sm rounded-[2.5rem] lg:w-[78%] md:w-[90%] w-[90%] m-auto z-[1999999] lg:p-16 md:p-10 p-8 lg:py-20 md:py-20 py-10 border border-gray-500 flex lg:flex-row md:flex-row flex-col items-center gap-10'>
                <div className='flex items-center flex-col justify-center min-w-[11rem] w-[15rem] gap-4 text-center'>
                    <h3 className='font-semibold text-2xl text-red-500'>CHIEF PATRON</h3>
                    <div className='h-42 w-42 rounded-full overflow-hidden flex items-center justify-center'>
                        <img src="director-gk-pal.jpg" alt="director" className='h-42 w-42 hover:scale-105 transition-all delay-100 ease-out' />
                    </div>
                    <div className='text-lg'>
                        <p className='font-medium text-sm'>Prof (Dr) Gopal Krushna Pal</p>
                        <p className='text-blue-300'>Executive Director</p>
                    </div>
                </div>
                <p className='text-lg leading-7  lg:leading-8 text-justify text-gray-300' >
                    I firmly believe that learning cannot be limited to the confines of a classroom. AIIMS Patna is reviving its annual fest Kaizen 24, which provides students with the opportunity to showcase their talents and promote trust, teamwork, and sportsmanship.
                    <br />

                    Kaizen 24 is the biggest event of its kind and provides students with the opportunity to showcase their talents and promote trust, teamwork, and sportsmanship.
                    <br />

                    I congratulate and wish all the students the very best for Kaizen 2024. Let the various events and activities bring glory to us and enrich our lives with value that can sustain over a long period of time.
                    <br />

                    <span className='text-gray-100 font-medium text-base leading-5  lg:leading-6'>
                        Best wishes,<br />
                        Prof (Dr) Gopal Krushna Pal
                    </span>
                </p>
            </div>
        </div>
    )
}

export default ChiefPatron