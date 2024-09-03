import { useQuery } from "@tanstack/react-query"
import { getBrPasses } from "../../services/br.service"
import QRCode from "react-qr-code";
import { FaLocationDot } from "react-icons/fa6";
import { MdDateRange } from "react-icons/md";
import {Link} from "react-router-dom"

const UserPasses = ({ uid }) => {
    const { data: passes, isLoading: loadingPasses, isError } = useQuery({
        queryKey: ['passes', uid],
        queryFn: () => getBrPasses(uid),
        staleTime: Infinity,
        refetchOnWindowFocus: false
    })

    if (loadingPasses) {
        return <div>Loading...</div>
    }

    if (isError) {
        return <div>Error fetching passes</div>
    }

    return (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-7 py-10 w-full">
            {
                passes.length === 0 ? <div className='text-center flex flex-col items-center justify-center gap-16 text-gray-500 text-lg font-semibold w-full'>
                    <p>You have not done basic registration yet.</p>
                    <Link className="my-0 mx-0" to="/basic-registration"><button className="py-2 px-6 text-black text-base bg-yellow-500 rounded-lg hover:bg-yellow-600">Complete Basic Registration</button></Link>
                </div>
                    : passes.map((pass, index) => (
                        <div key={index} className='rounded-lg overflow-hidden lg:mx-0 md:mx-0 mx-5  bg-white '>
                            <img src="pass-banner.webp" alt="pass banner" className="w-full" />
                            <div className='p-4'>
                                <h4 className="text-rose-500 text-lg font-semibold">
                                    KAIZEN 2024
                                </h4>
                                <p className='text-gray-800 text-lg font-bold'>
                                    Basic Registration Pass
                                </p>

                                <div className="flex flex-col w-full items-center justify-center py-5">
                                    <div className="w-32">
                                        <QRCode size={256}
                                            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                            viewBox={`0 0 256 256`} value={pass.brid} />
                                    </div>

                                    <p className='text-gray-500 py-3'><span className='text-gray-800 font-semibold'>{pass.brid}</span></p>
                                </div>

                                <div className='flex flex-col gap-2'>
                                    <div className='flex gap-2 items-center'>
                                        <MdDateRange className='text-rose-500' />
                                        <p className='text-gray-500 text-sm font-semibold'>Date: <span className='text-gray-800 font-semibold'>5th - 8th Sept. 2024</span></p>
                                    </div>
                                    <div className='flex gap-2 items-center'>
                                        <FaLocationDot className='text-rose-500' />
                                        <p className='text-gray-500 text-sm font-semibold'>Venue: <span className='text-gray-800 font-semibold'>AIIMS Patna Campus</span></p>
                                    </div>
                                </div>

                                <div className='pt-5 flex justify-between items-center'>
                                    <div className='bg-black h-8 w-8 rounded-full ml-[-2rem]'>
                                    </div>
                                    <hr className='border-t-2 border-dotted border-gray-400  bg-[#fff] h-[2px] w-[90%]' />
                                    <div className='bg-black h-8 w-8 rounded-full mr-[-2rem]'>
                                    </div>
                                </div>

                                <div className="text-black flex justify-between py-2">
                                    <p className="font-semibold">
                                        {pass.name}
                                    </p>

                                    <p className="text-sm font-medium text-gray-500">
                                        {index + 1 + ' of ' + passes.length}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
            }
        </div>
    )
}

export default UserPasses
