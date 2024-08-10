import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'

const Collab = () => {
    return (
        <div className='flex flex-col gap-8 items-center justify-center pt-10 pb-5'>
            <img style={{
                userSelect:"none",
                pointerEvents:"none"
            }} className='transition-all shadow-md lg:w-[70%] md:w-[80%] w-[90%]' src="kaizen-partner.jpg" alt="Kaizen 2024 Partner" />

            <Link to={"https://medcollegedarshan.com/"} target='_blank'>
                <button className='text-white shadow flex transition-all items-center gap-2 bg-green-700 hover:bg-green-800 py-2 px-6 rounded-lg'>
                    <span>Explore Med College Darshan</span>  <FaArrowRight />
                </button>
            </Link>
        </div>
    )
}

export default Collab