import React from 'react'
import { Link } from 'react-router-dom'

const ArtistLineup = () => {
    return (
        <div className="bg-[url('https://firebasestorage.googleapis.com/v0/b/kaisen2023.appspot.com/o/static-images%2FA%20warehouse%20in%20a%20jungle%20with%20a%20sunset.jpg?alt=media&token=f0dd85d2-2746-4069-a0a2-ff677dc6331d')] after:bg-gradient-to-b after:absolute after:from-white after:to-black bg-repeat-y  min-h-fit bg-center bg-cover after:z-50 ">
            <h3 className='text-center font-bold text-4xl pt-16'>PRONITES</h3>
            <div className="flex relative justify-center items-center py-20 flex-wrap lg:gap-8 md:gap-8 gap-16">

                <div className="card lg:scale-100 md:scale-100 scale-105">
                    <div className="wrapper">
                        <img src="images/edm-p.png" className="cover-image" />
                    </div>
                    <img src="images/reveal.svg" className="title" />
                    <img src="images/unknown.png" className="character" />
                </div>

                <div className="card lg:scale-100 md:scale-100 scale-105">
                    <div className="wrapper">
                        <img src="standup.jpg" className="cover-image" />
                    </div>
                    <img src="images/reveal.svg" className="title" />
                    <img src="images/unknown.png" className="character" />
                </div>

                <div className="card lg:scale-100 md:scale-100 scale-105">
                    <div className="wrapper">
                        <img src="images/starnight.jpg" className="cover-image" />
                    </div>
                    <img src="images/reveal.svg" className="title" />
                    <img src="images/unknown.png" className="character" />
                </div>

                <div className="card lg:scale-100 md:scale-100 scale-105">
                    <div className="wrapper">
                        <img src="https://firebasestorage.googleapis.com/v0/b/kaisen2023.appspot.com/o/static-images%2F0_band%20night%20(1).webp?alt=media&token=a320853c-cd8d-43e8-b285-7ede754df6ab" className="cover-image" />
                    </div>
                    <img src="images/reveal.svg" className="title" />
                    <img src="images/unknown.png" className="character" />
                </div>
            </div>

            <div className='flex items-center justify-center pb-20'>
                <Link to="/pronite">
                    <button className='m-auto animate-bounce transition-all delay-75 ease-in-out transform hover:bg-red-500 bg-red-600 hover:shadow-2xl hover:scale-105 shadow-lg text-white py-3.5 px-16 rounded-2xl'>
                        Explore
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default ArtistLineup