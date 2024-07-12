import React, { useState } from 'react'

const FAQIems = ({ faq }) => {

    // state to store the active faq item
    const [active, setActive] = useState(false)

    return (
        <div data-aos="fade-up" className='lg:w-[45rem] md:w-[80%] w-[92%] text-lg overflow-hidden h-fit my-5'>
            <div className='flex gap-4 items-center cursor-pointer' onClick={() => setActive((e) => !e)}>
                <img src={`https://archive.hackmit.org/2020/assets/img/${faq.color}_arrow.svg`} alt="ssd" className={`h-5 mt-1 transition-all ease-in-out delay-75 ${active && 'rotate-90'}`} />
                <h3 className={`text-left font-bold lg:text-2xl md:text-2xl text-xl pt-2 ${faq.color === 'red' ? 'text-red-400' : (faq.color === 'blue' ? 'text-blue-400' : 'text-yellow-400')} hover:text-sky-400`}>{faq.question}</h3>
            </div>
            <div className={`transition-all ease-in overflow-hidden delay-500 ml-8 mt-4 h-0 ${active && 'h-fit'}`}>
                <p className={`text-white transition delay-300 lg:text-lg m:text-lg text-base ease-in-out`}>{faq.answer}</p>
            </div>
        </div>
    )
}

export default FAQIems;