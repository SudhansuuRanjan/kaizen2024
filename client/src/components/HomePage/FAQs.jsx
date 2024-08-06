import React from 'react'
import FAQItems from './FAQItems'

const FAQs = () => {

    const faqs = [
        {
            question: 'How can I reach AIIMS Patna?',
            answer: "You can reach AIIMS Patna by:\n - Train: Arrive at Patna Junction, Rajendranagar Junction, or Danapur station and hire a taxi or cab to reach AIIMS Patna.\n - Flight: Land at Jay Prakash Narayan International Airport and take a taxi or cab to reach AIIMS Patna.",
            color: "yellow",
        },
        {
            question: 'Will transportation facilities be available?',
            answer: "Bus services will be provided against designated routes in Patna. These services are included in the Basic Registration. ",
            color: "red",
        },
        {
            question: 'Will accommodation facility be provided?',
            answer: "Accommodation in the institute's campus will be provided on a first come first serve basis. Details of nearby hotels, oyos and air bnbs will be shared.",
            color: "blue",
        },
        {
            question: "Who all can attend the fest? ",
            answer: "The registration for the fest is open to all above 16 years of age.",
            color: "yellow"
        },
        {
            question: 'Is Basic Registration necessary for participating in events?',
            answer: "BR does not include entry to various literary, cultural, art, sports and informal events. It is necessary for one to get their basic registration  and individual event registration done.",
            color: "red",
        },
    ]

    return (
        <div className="relative bg-no-repeat min-h-fit bg-center bg-cover w-[100%] bg-[url('https://firebasestorage.googleapis.com/v0/b/kaisen2023.appspot.com/o/images%2Ffaq-wall.jpg?alt=media&token=498b8d16-4b22-4077-889b-27772bd768e9')]">
            <div className='h-full w-full bg-black bg-opacity-60'>
                <div className='flex lg:flex-row md:flex-row flex-col justify-between lg:items-start md:items-start items-center absolute w-[100%] lg:top-[20%] md:top-[20%] top-[10%] z-0 h-[32rem]'>
                    {/* <img src="coin.png" alt="wheel" data-aos="fade-up-right" className='lg:h-[17rem] md:h-[15rem] h-[15rem] brightness-75' />
                    <img src="hat.png" alt="hat" data-aos="zoom-in-up" className='lg:h-[22rem] md:h-[20rem] h-[15rem] self-end brightness-75' />
                    <img src="map.png" alt="cpmpass" data-aos="fade-up-left" className='lg:h-[17rem] md:h-[15rem] h-[15rem] brightness-75' /> */}
                </div>

                <div className='flex flex-col bg-opacity-20 backdrop-blur-0 rounded-[2rem] lg:w-[70%] w-[90%] m-auto z-[1999999]'>
                    <h3 data-aos="fade-up" className='text-center font-bold text-4xl pt-20 text-yellow-500 decoration-red-500 underline underline-offset[1px]'>FAQs</h3>
                    <div className='flex flex-col items-center justify-center py-24'>
                        {
                            faqs.map((faq, index) => (
                                <FAQItems key={index} faq={faq} />
                            ))
                        }
                    </div>
                </div>
            </div>

        </div>
    )
}

export default FAQs