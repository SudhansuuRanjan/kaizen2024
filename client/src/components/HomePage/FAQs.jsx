import React from 'react'
import FAQItems from './FAQItems'

const FAQs = () => {

    const faqs = [
        {
            question: 'What is the theme of Kaizen 2024?',
            answer: "Close your eyes and imagine, the sound of waves hitting your ears as you look out to the vast blue sea. The sun in the sky shimmering like a Golden coin you'll find glittering in treasures. \nThe music of Sea chanties and shooting cannons filling the air with fun and frolic. So our theme for Kaizen this year is: ASTER: a sail through errantry! Let this wave immerse you and all of your fellow mateys into the waters of adventure and performance. Just like the mighty pirates, let us rob you off all the boredom, and slice your blues with our glistening swords. So, put on the eyepatch, sail through the ocean of creativity and step off on to the island of Kaizen!",
            color: "yellow",
        },
        {
            question: 'How do I register?',
            answer: "You can register by going to the events page from menu. Go through all the events or select the category you're interested in. Finally, select an event matching your interests and talent and click on the register button within that event's page.Add team members in events of team participation.The event is now moved to your event cart. Go to event cart and pay the registration amount.The event will be added to (your events) section of your profile page.",
            color: "red",
        },
        {
            question: 'Will accommodation facility be provided?',
            answer: "Yes! Keep a look out on our Instragram, Facebook pages and website for the link for accommodation registration. Once out, be sure to fill it as fast as possible because we'll be having limited accommodation.",
            color: "blue",
        },
        {
            question: "What are the prizes for various competitions?",
            answer: "We have a very exciting prize pool this year with cash prizes and various gift hampers. Get sailing with us to know more.",
            color: "yellow"
        }
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