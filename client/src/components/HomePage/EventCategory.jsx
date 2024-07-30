import React, { useState, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useSwiper } from 'swiper/react';
import { BsArrowUpRight } from 'react-icons/bs'
import { Link } from 'react-router-dom'

const EventCategory = () => {
    const [active, setActive] = useState(null)
    const swiperRef = useRef();

    const categories = [
        {
            name: 'Cultural',
            image: "/images/Cultural.webp",
        },
        {
            name: 'Sports',
            image: "/images/sports.webp",
        },
        {
            name: 'Art',
            image: "/images/arts.webp",
        },
        {
            name: 'Literary',
            image: "/images/Literary.webp",
        },
        {
            name: 'Fashion',
            image: "/images/fashion.webp",
        },
        {
            name: 'Workshop',
            image: "/images/workshops.webp",
        },
        {
            name: 'Academics',
            image: "/images/academics.webp",
        },
    ]

    return (
        <div className="bg-[url('https://firebasestorage.googleapis.com/v0/b/kaisen2023.appspot.com/o/static-images%2Fgirl-dancing.webp?alt=media&token=d2851fda-6cdd-4dbc-a339-2c9dca90850b')] bg-no-repeat min-h-fit bg-center bg-cover flex flex-col relative justify-center items-center">
            <h3 className='text-center font-bold text-4xl py-20'>MAJOR EVENTS</h3>
            <div className='flex overflow-hidden justify-center items-center mb-52'>
                <div className="flex max-w-6xl items-center justify-center m-auto">
                    <Swiper
                        onBeforeInit={(swiper) => {
                            swiperRef.current = swiper;
                        }}
                        spaceBetween={50}
                        slidesPerView={3}
                        onSlideChange={(cur) => setActive(cur.realIndex)}
                        loop={true}
                        centeredSlides={true}
                        speed={800}
                        autoplay={{
                            delay: 2000,
                        }}
                        className="py-10"
                    >

                        {
                            categories.map((cat, index) => (
                                <SwiperSlide key={index}>
                                    <Link to={`/events?category=${cat.name}`}>
                                        <div className={`lg:h-[27rem] md:h-[27rem] h-[25rem] flex ${active === index ? 'scale-[100%]' : 'scale-[80%]'} transform relative delay-75 ease-in ${active === index ? 'hover:scale-[102%]' : "hover:scale-[85%]"} delay-100 transition-all  ease-in-out cursor-grab`}>
                                            <img src={cat.image} alt={cat.name} className={
                                                active === index ? "rounded-2xl brightness-100  hover:brightness-110" : "brightness-50 rounded-2xl"
                                            } />
                                            <div className='absolute w-[100%] flex flex-col justify-between items h-[100%]'>
                                                <div className='flex justify-between'>
                                                    <h3 className='p-3 ml-2 text-3xl font-semibold'>0{index + 1}</h3>
                                                    <BsArrowUpRight size={30} className="m-2" />
                                                </div>
                                                <h3 className='text-4xl m-3'>
                                                    {cat.name}
                                                </h3>
                                            </div>
                                        </div>
                                    </Link>
                                </SwiperSlide>
                            ))
                        }

                    </Swiper>
                </div>
            </div>

            <div className='flex justify-between items-center  absolute top-50 w-[100%] lg:px-16
            px-6 md:px-10 z-[2]'>
                <button onClick={() => swiperRef.current?.slidePrev()} className='text-3xl text-white bg-gray-800 bg-opacity-50 items-center justify-center flex rounded-full p-4 shadow shadow-gray-800'>
                    <ion-icon name="chevron-back-outline"></ion-icon>
                </button>
                <button onClick={() => swiperRef.current?.slideNext()} className='text-3xl text-white bg-gray-800 bg-opacity-50 items-center justify-center flex rounded-full p-4 shadow shadow-gray-800'>
                    <ion-icon name="chevron-forward-outline"></ion-icon>
                </button>
            </div>
        </div>
    )
}

export default EventCategory