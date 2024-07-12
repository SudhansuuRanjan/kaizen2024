import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import TnC from './TnC'
import './Legals.scss'
import PrivacyPolicy from './PrivacyPolicy'
import CnC from './CnC'
import RefundPolicy from './RefundPolicy'

const Legals = () => {
    const { pageName } = useParams("");
    const [page, setPage] = useState(0);
    document.title = "Legals | KAIZEN 2023"

    useEffect(() => {
        if (pageName === "privacy-policy") setPage(1);
        if (pageName === "terms-of-service") setPage(0);
        if (pageName === "refund-policy") setPage(3);
        if (pageName === "code-of-conduct") setPage(2);
    }, [pageName]);



    const data = [
        {
            title: "Terms of Service",
            id: 0
        },
        {
            title: "Privacy Policy",
            id: 1
        },
        {
            title: "Code of Conduct",
            id: 2
        },
        {
            title: "Refund Policy",
            id: 3
        },
    ]

    return (
        <>
            <div className='legal-banner'>
                <h1 className='legal-head'>{data[page].title}</h1>
            </div>

            <div className="bg-black bg-repeat-y  min-h-screen bg-center bg-cover pb-20 flex relative">

                <div className="bg-[]  bg-opacity-10 backdrop-blur-sm rounded-xl lg:w-[80%] md:w-[95%] w-[95%] bg-center m-auto h-fit ">


                    <div className="flex justify-center items-center gap-3 flex-wrap px-2">
                        <button onClick={() => setPage(0)} className={
                            page === 0 ? "bg-[#ebe6d0] bg-opacity-70 backdrop-blur-sm text-black px-4 py-1.5 rounded-lg font-bold text-sm border-black" : "bg-black bg-opacity-70 backdrop-blur-sm text-[#ebe6d0] px-4 py-1.5 rounded-lg font-bold text-sm border border-[#ebe6d0]"
                        }>Terms & Conditions</button>
                        <button onClick={() => setPage(3)} className={
                            page === 3 ? "bg-[#ebe6d0] bg-opacity-70 backdrop-blur-sm text-black px-4 py-1.5 rounded-lg font-bold text-sm border-black" : "bg-black bg-opacity-70 backdrop-blur-sm text-[#ebe6d0] px-4 py-1.5 rounded-lg font-bold text-sm border border-[#ebe6d0]"
                        }>Refund Policy</button>
                        <button onClick={() => setPage(2)} className={
                            page === 2 ? "bg-[#ebe6d0] bg-opacity-70 backdrop-blur-sm text-black px-4 py-1.5 rounded-lg font-bold text-sm border-black" : "bg-black bg-opacity-70 backdrop-blur-sm text-[#ebe6d0] px-4 py-1.5 rounded-lg font-bold text-sm border border-[#ebe6d0]"
                        }>Code of Conduct</button>
                        <button onClick={() => setPage(1)} className={
                            page === 1 ? "bg-[#ebe6d0] bg-opacity-70 backdrop-blur-sm text-black px-4 py-1.5 rounded-lg font-bold text-sm border-black" : "bg-black bg-opacity-70 backdrop-blur-sm text-[#ebe6d0] px-4 py-1.5 rounded-lg font-bold text-sm border border-[#ebe6d0]"
                        }>Privacy Policy</button>
                    </div>

                    <div className='px-4 md:px-10 text-lg font-extralight lg:px-10 text-justify pt-20 pb-10'>
                        {
                            page === 0 ? <TnC /> : null
                        }
                        {
                            page === 1 ? <PrivacyPolicy /> : null
                        }
                        {
                            page === 2 ? <CnC /> : null
                        }
                        {
                            page === 3 ? <RefundPolicy /> : null
                        }
                    </div>

                    <div className='flex items-center justify-center gap-3 pb-16'>
                        <div className='h-3 w-3 bg-[#ebe6d0] rotate-45' />
                        <div className='h-3 w-3 bg-[#ebe6d0] rotate-45' />
                        <div className='h-3 w-3 bg-[#ebe6d0] rotate-45' />
                    </div>

                </div>
            </div>
        </>
    )
}

export default Legals