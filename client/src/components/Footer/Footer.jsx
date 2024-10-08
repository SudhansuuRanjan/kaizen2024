import { Link } from 'react-router-dom'
import { FaFacebook, FaYoutube, FaInstagram } from 'react-icons/fa'
import { IoLogoWhatsapp } from 'react-icons/io'
const Footer = () => {
    const date = new Date;
    const year = date.getFullYear();
    return (
        <div className="bg-[#000000] text-sm pt-10">

            <div className="mb-10 w-[90%] grid gap-2 md:gap-4 lg:gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 m-[auto] items-start justify-items-center">

                <div data-aos="fade-up" className='mt-10 w-[100%] md:w-[100%] lg:w-[100%] order-1 md:order-1 lg:order-1'>

                    <Link href="/">
                        <img src="kaizen-logo.webp" alt="logo" className='h-20' />
                    </Link>

                    <p className='max-w-[17rem] py-3 text-base'>Kaizen, is AIIMS Patna's annual socio-cultural fest. </p>
                    <div className='flex gap-3 py-2 '>
                        <a target='_blank' href="https://www.facebook.com/aiimspatnafest?mibextid=ZbWKwL" className='transition ease-in delay-50 text-blue-500 hover:text-blue-600 hover:scale-[110%]'>
                            <FaFacebook size={30} />
                        </a>
                        <a target='_blank' href="https://wa.me/919903878567" className='transition ease-in delay-50 text-green-400 hover:text-green-500 hover:scale-[110%]'>
                            <IoLogoWhatsapp size={30} />
                        </a>
                        <a target='_blank' href="https://www.youtube.com/@kaizen.aiimspatna" className='transition ease-in delay-50 text-rose-500 hover:text-rose-600 hover:scale-[110%]'>
                            <FaYoutube size={30} />
                        </a>
                        <a target='_blank' href="http://www.instagram.com/kaizen.aiimspatna" className='transition ease-in delay-50 text-pink-500 hover:text-pink-600 hover:scale-[110%]'>
                            <FaInstagram size={30} />
                        </a>
                    </div>
                </div>

                <div data-aos="fade-up" className='mt-10 w-[100%] md:w-[100%] lg:w-[100%] order-2 md:order-2 lg:order-2'>
                    <div className='flex items-center justify-start'><h1 className='font-extrabold text-2xl text-rose-700 mr-3'>|</h1><h1 className='text-lg font-bold'>Useful Links</h1></div>
                    <ul className='mt-4 flex flex-col gap-3 text-base'>
                        <li className='hover:text-rose-600 text-gray-500'><Link to="/events">Events</Link></li>
                        <li className='hover:text-rose-600 text-gray-500'><Link to="/basicregistration">Basic Registration</Link></li>
                        <li className=' hover:text-rose-600 text-gray-500'><Link to="/schedule">Event Schedule</Link></li>
                        <li className=' hover:text-rose-600 text-gray-500'><Link to="/pronite">Pronites</Link></li>
                    </ul>
                </div>

                <div data-aos="fade-up" className='mt-10 w-[100%] md:w-[100%] lg:w-[100%] order-2 md:order-2 lg:order-2'>
                    <div className='flex items-center justify-start'><h1 className='font-extrabold text-2xl text-rose-700 mr-3'>|</h1><h1 className='text-lg font-bold'>Legals</h1></div>
                    <ul className='mt-4 flex flex-col gap-3 text-base'>
                        <li className='hover:text-rose-600 text-gray-500'><Link to="/legals/privacy-policy">Privacy   Policy</Link></li>
                        <li className='hover:text-rose-600 text-gray-500'><Link to="/legals/terms-of-service">Terms & Cond.</Link></li>
                        <li className=' hover:text-rose-600 text-gray-500'><Link to="/legals/code-of-conduct">Code of Conduct</Link></li>
                        <li className=' hover:text-rose-600 text-gray-500'><Link to="/legals/refund-policy">Refund Policy</Link></li>
                    </ul>
                </div>

                <div data-aos="fade-up" className='mt-10 w-[100%] md:w-[100%] lg:w-[100%] order-3 md:order-3 lg:order-3 text-base'>
                    <div className='flex items-center justify-start'><h1 className='font-extrabold text-2xl text-rose-700 mr-3'>|</h1><h1 className='text-lg font-bold'>Contact Us</h1></div>
                    <p className='max-w-[16rem] pt-4 text'>AIIMS Patna, Phulwarisharif, Patna, Bihar-801507, India</p>
                    <p className='pt-2'>Contact : <a href="tel:+919903878567" className='text-rose-700 ml-2 font-semibold'>+91 9903878567</a></p>
                    <p className='pt-2'><a href="tel:+917970987442" className='text-rose-700 ml-20 font-semibold'>+91 7970987442</a></p>
                    <p className='pt-2'>Mail : <a href="mailto:kaizen2024.help@gmail.com" className='text-rose-700 ml-2 font-semibold'>kaizen2024.help@gmail.com</a></p>
                </div>

            </div>

            <div className="w-[90%] m-[auto] bg-gray-900 h-[1px]"></div>
            <div className="m-[auto] py-7 text-gray-400 flex flex-col md:flex-row lg:flex-row justify-between items-center lg:w-[90%] md:w-[90%] w-[95%] text-base gap-2">
                <p className='lg:text-base text-sm'>
                    © {year} Kaizen. All Rights Reserved.
                </p>
                <div className='flex gap-1.5 text-center lg:gap-1 md:gap-1 lg:text-base text-sm'>
                    <p>Designed & Developed by</p> <a target='_blank' className="lg:text-base text-sm font-semibold text-rose-500" href="https://sudhanshur.vercel.app/"> Sudhanshu Ranjan</a>
                </div>
            </div>
        </div>
    )
}

export default Footer