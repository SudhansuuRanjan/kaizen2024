import React,{useState} from 'react'
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa'
import { IoLogoWhatsapp } from 'react-icons/io'
import { Link } from 'react-router-dom'

const Footer = () => {

    const [year, setYear] = useState(getCurrentYear())

    return (
        <div className='bg-black'>
            <div className='grid lg:grid-cols-[30%_25%_45%]
            md:grid-col-2 md:grid-rows-2 border-t-[3.5px] border-gray-800'>
                <div className='flex relative w-[100%]'>
                    <div className='footer-social overflow-hidden flex justify-center items-center relative py-20 w-[100%]'>
                        <div className='trans-slate absolute h-[200%] w-[100%] transition-transform delay-300 bottom-0 hover:translate-y-[50%] ease-in-out'>
                            <div className='h-[50%] w-[100%] bg-gray-700 bg-opacity-60'></div>
                            <div className='h-[50%] w-[100%] '></div>
                        </div>
                        <div className='z-[1232]'>
                            <p>
                                Get in touch
                            </p>
                            <a href="mailto:ragam@nitc.ac.in">
                                ragam@nitc.ac.in
                            </a>
                        </div>
                    </div>
                </div>
                <div className='flex bg-black relative lg:border-none md:border-y-[3px] border-gray-800 border-y-[3.5px]'>
                    <a href="https://facebook.com" className='footer-social w-1/3 overflow-hidden flex justify-center items-center relative py-20'>
                        <div className='trans-slate absolute h-[200%] w-[100%] transition-transform delay-300 bottom-0 hover:translate-y-[50%] ease-in-out'>
                            <div className='h-[50%] w-[100%] bg-white'></div>
                            <div className='h-[50%] w-[100%] '></div>
                        </div>
                        <FaFacebook size={40} className="trans-icon z-[9999]" />
                    </a>
                    <a href="https://facebook.com" className='footer-social w-1/3 overflow-hidden flex justify-center items-center relative py-20'>
                        <div className='trans-slate absolute h-[200%] w-[100%] transition-transform delay-300 bottom-0 hover:translate-y-[50%] ease-in-out'>
                            <div className='h-[50%] w-[100%] bg-white'></div>
                            <div className='h-[50%] w-[100%] '></div>
                        </div>
                        <IoLogoWhatsapp size={40} className="trans-icon z-[9999]" />
                    </a>
                    <a href="https://facebook.com" className='footer-social w-1/3 overflow-hidden flex justify-center items-center relative py-20'>
                        <div className='trans-slate absolute h-[200%] w-[100%] transition-transform delay-300 bottom-0 hover:translate-y-[50%] ease-in-out'>
                            <div className='h-[50%] w-[100%] bg-white'></div>
                            <div className='h-[50%] w-[100%] '></div>
                        </div>
                        <FaInstagram size={40} className="trans-icon z-[9999]" />
                    </a>
                </div>
                <div className='flex text-sm text-gray-500 justify-between font-semibold'>
                    <div className='border-l-[3.5px] border-gray-800 p-5 py-12 w-1/3'>
                        <ul className='flex flex-col gap-5'>
                            <li className='hover:text-red-600'><Link to="/legals/privacy-policy">Privacy Policy</Link></li>
                            <li className='hover:text-red-600'><Link to="/legals/terms-of-service">Terms & Conditions</Link></li>
                            <li className=' hover:text-red-600'><Link to="/legals/code-of-conduct">Code of Conduct</Link></li>
                            <li className=' hover:text-red-600'><Link to="/legals/refund-policy">Refund Policy</Link></li>
                        </ul>
                    </div>
                    <div className='border-l-[3.5px] border-gray-800 p-5 py-12 w-1/3'>
                        <ul className='flex flex-col gap-5'>
                            <li className='hover:text-red-600'><Link to="/legals/privacy-policy">Privacy   Policy</Link></li>
                            <li className='hover:text-red-600'><Link to="/legals/terms-of-service">Terms</Link></li>
                            <li className=' hover:text-red-600'><Link to="/legals/code-of-conduct">Code of Conduct</Link></li>
                            <li className=' hover:text-red-600'><Link to="/legals/refund-policy">Refund Policy</Link></li>
                        </ul>
                    </div>
                    <div className='border-l-[3.5px] border-gray-800 p-5 py-12 w-1/3'>
                        <ul className='flex flex-col gap-5'>
                            <li className='hover:text-red-600'><Link to="/legals/privacy-policy">Privacy   Policy</Link></li>
                            <li className='hover:text-red-600'><Link to="/legals/terms-of-service">Terms</Link></li>
                            <li className=' hover:text-red-600'><Link to="/legals/code-of-conduct">Code of Conduct</Link></li>
                            <li className=' hover:text-red-600'><Link to="/legals/refund-policy">Refund Policy</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className='flex justify-between items-center bg-black py-5 px-8 text-gray-500 text-sm border-t-[3px] border-gray-800'>
                <div>
                    <p>©{year} - KAIZEN AIIMSP</p>
                </div>
                <div>
                    <p>Terms & Conditions, Privacy</p>
                </div>
            </div>
        </div>
    )
}

export default Footer