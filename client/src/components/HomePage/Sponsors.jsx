import React from 'react'

const Sponsors = () => {
    const associateSponsors = [
        {
            name: "State health Society, Bihar",
            logo: "https://firebasestorage.googleapis.com/v0/b/kaisen2023.appspot.com/o/sponsors%2Fstate_health_society_bihar.webp?alt=media&token=74496371-423b-4e7a-bfa8-a3539d733038",
            link: "http://shs.bihar.gov.in/"
        },
        {
            name: "Bihar, Art, Culture & Youth Department",
            logo: "https://firebasestorage.googleapis.com/v0/b/kaisen2023.appspot.com/o/sponsors%2FBihar%2BArt%2C%2BCulture%2B%26%2BYouth%2BDept.webp?alt=media&token=217ceaaa-e397-46d6-a144-a8a09ca903bd",
            link: "https://state.bihar.gov.in/yac/CitizenHome.html"
        },
        {
            name: "Bihar Tourism",
            logo: "https://firebasestorage.googleapis.com/v0/b/kaisen2023.appspot.com/o/sponsors%2FBihar%2BTourism.webp?alt=media&token=a2033e05-d4f7-45b5-beaf-d4f704310d81",
            link: "https://tourism.bihar.gov.in/"
        },
        {
            name: "Aadvik Trauma Hospital",
            logo: "https://firebasestorage.googleapis.com/v0/b/kaisen2023.appspot.com/o/sponsors%2FAadvik%2Btrauma%2BHospital.webp?alt=media&token=4b0b1bef-a070-42bb-83b0-f005421ef004",
            link: "https://aadviktraumahospital.com/"
        },
        {
            name: "Bihar Neurodiagnostic Centre",
            logo: "https://firebasestorage.googleapis.com/v0/b/kaisen2023.appspot.com/o/sponsors%2FBihar%2BNeurodiagnostic%2Bcentre.webp?alt=media&token=990d4ddf-3696-4f1d-878a-00b0c7840121",
            link: "http://www.draksingh.com/"
        },
        {
            name: "Dhamma Superspeciality Hospital",
            logo: "https://firebasestorage.googleapis.com/v0/b/kaisen2023.appspot.com/o/sponsors%2FDhamma%2Bsuperspeciality%2Bhospital.webp?alt=media&token=78f38f57-142d-4c82-b698-401eae48683f",
            link: "https://www.dhammahospital.com/"
        }
    ];

    const healthPartners = [
        {
            name: "Abhi Medicos Pvt. Ltd.",
            logo: "https://firebasestorage.googleapis.com/v0/b/kaisen2023.appspot.com/o/sponsors%2FAbhi%2BMedico%2BPvt.%2BLtd..webp?alt=media&token=fbb2276a-094e-4049-bfef-086eb3cdaf4a",
            link: "https://www.abhimedicare.com/"
        },
        {
            name: "Amrit Pharmacy",
            logo: "https://firebasestorage.googleapis.com/v0/b/kaisen2023.appspot.com/o/sponsors%2FAmrit%2BPharmacy.webp?alt=media&token=b5b998ac-caf7-4250-afda-1504663c7031",
            link: "https://www.amritpharmacy.com/"
        },
        {
            name: "Vedanta Eye Care",
            logo: "https://firebasestorage.googleapis.com/v0/b/kaisen2023.appspot.com/o/sponsors%2FVedanta%2BEyeCare.webp?alt=media&token=d4f7d7d3-745c-4d10-ba16-33d510b37af4",
            link: "https://www.vedantaeyecare.in/"
        },
        {
            name: "Ruban Hospital",
            logo: "https://rubanpatliputrahospital.com/wp-content/uploads/elementor/thumbs/Ruban@logo-with-NABH-2-ovg23ovg0xx8ocfhzbaqtv86rfyyms5d4as9irornm.png",
            link: "https://rubanpatliputrahospital.com/"
        }
    ]

    const educationPartner = [
        {
            name: "DocTutorials",
            logo: "https://firebasestorage.googleapis.com/v0/b/kaisen2023.appspot.com/o/sponsors%2FDocTutorials.webp?alt=media&token=e06468e6-4499-4060-b719-c1bd7dcd891a",
            link: "https://www.doctutorials.com/"
        },
        {
            name: "Marrow",
            logo: "https://firebasestorage.googleapis.com/v0/b/kaisen2023.appspot.com/o/sponsors%2FMarrow.webp?alt=media&token=3d058b64-5d9e-4ccd-a0e9-414690f1bb4e",
            link: "https://www.marrow.com/"
        },
        {
            name: "eGurukul",
            logo: "https://firebasestorage.googleapis.com/v0/b/kaisen2023.appspot.com/o/sponsors%2FeGurukul.webp?alt=media&token=d9101d5a-a585-4c2d-b9af-f626ce591603",
            link: "https://www.egurukulapp.com/"
        }
    ]

    const otherPartners = [
        {
            category: "Chess Partner",
            name: "Chess.com",
            logo: "https://firebasestorage.googleapis.com/v0/b/kaisen2023.appspot.com/o/sponsors%2Fchess.com.webp?alt=media&token=bd0a934f-2716-4e2f-872f-02a2ff7b51ae",
            link: "https://www.chess.com/"
        },
        {
            name: "Radio Mirchi",
            category: "Radio Partner",
            logo: "https://firebasestorage.googleapis.com/v0/b/kaisen2023.appspot.com/o/sponsors%2FMIRCHI%2BLOGO.webp?alt=media&token=8c5749de-b99e-4c10-93f7-ad66ff04fcc6",
            link: "https://mirchi.in/"
        },
        {
            name: "Littmann",
            category: "Clinical Partner",
            logo: "https://firebasestorage.googleapis.com/v0/b/kaisen2023.appspot.com/o/sponsors%2FLittmann.webp?alt=media&token=ba2ea0ff-0378-4da4-9982-bb1940fb1524",
            link: "https://www.littmann.in/"
        },
        {
            name: "Instax",
            category: "Photography Partner",
            logo: "https://firebasestorage.googleapis.com/v0/b/kaisen2023.appspot.com/o/sponsors%2Finstax.webp?alt=media&token=cb56fb36-cb6a-4e80-bca6-b8e55d8c50f6",
            link: "https://www.instax.in/"
        },
        {
            name: "Garda Patna",
            category: "Social Media Partner",
            logo: "https://firebasestorage.googleapis.com/v0/b/kaisen2023.appspot.com/o/sponsors%2FGardaPatna.webp?alt=media&token=f8e3c44c-fe40-4be2-b82e-0dcf3aa760e4",
            link: "https://www.instagram.com/gardapatna/"
        },
        {
            name: "Alna Biotech Pvt. Ltd.",
            category: "Drug Partner",
            logo: "https://firebasestorage.googleapis.com/v0/b/kaisen2023.appspot.com/o/sponsors%2Falna%20biotech.webp?alt=media&token=21e915c2-8fea-48e1-9fa5-61e8adf16d0a",
            link: "https://www.alnagroup.co.in/alna-biotech/"
        },
    ]

    return (
        <div className="relative bg-no-repeat min-h-fit bg-center bg-cover w-[100%] py-10">
            <h3 className='text-center font-bold lg:text-5xl md:text-4xl text-4xl py-10' data-aos="fade-up">Previous Sponsors</h3>

            {/* Title Sponsor */}

            <div data-aos="fade-up">
                <h5 className='text-center font-bold lg:text-4xl md:text-3xl text-3xl text-yellow-500 pt-5'>Title Sponsor</h5>
                <div className='flex flex-wrap items-center justify-center gap-8 w-[80%] m-auto py-[3rem]'>
                    <a href="https://bankofindia.co.in/" target="_blank" rel="noopener noreferrer"><img loading='lazy' data-aos="fade-up" className='h-24' src="https://firebasestorage.googleapis.com/v0/b/kaisen2023.appspot.com/o/sponsors%2FBank%2Bof%2Bindia.webp?alt=media&token=59c844f0-4049-4f4b-aa5a-0b476efa9075" alt="Bank of India" /></a>
                </div>
            </div>

            {/* Power Sponsors */}

            <div >
                <h5 className='text-center font-bold text-3xl text-lime-500 pt-5' data-aos="fade-up">Power Sponsors</h5>
                <div className='flex flex-wrap items-center justify-center lg:gap-12 md:gap-8 gap-6 lg:w-[80%] w-[100%] m-auto py-[3rem]'>
                    <a href="https://www.coca-cola.com/in/en" target="_blank" rel="noopener noreferrer"><img loading='lazy' data-aos="fade-up" className='h-12' src="https://firebasestorage.googleapis.com/v0/b/kaisen2023.appspot.com/o/sponsors%2FCoca%2BCola.webp?alt=media&token=85dd1c66-03ee-4f66-be44-10f613cbc4c0" alt="Coca Cola" /></a>
                    <a href="https://olaelectric.com/" target="_blank" rel="noopener noreferrer"><img loading='lazy' data-aos="fade-up" className='h-12' src="https://firebasestorage.googleapis.com/v0/b/kaisen2023.appspot.com/o/sponsors%2Fola%2Belectric.webp?alt=media&token=1fae6e4d-7b87-40c1-b8dd-6c3a4e2584d4" alt="Ola Electric" /></a>
                </div>
            </div>

            {/* Associate Sponsors */}

            <div >
                <h5 className='text-center font-bold text-3xl text-pink-500 pt-5' data-aos="fade-up">Associate Sponsors</h5>
                <div className='flex flex-wrap items-center justify-center lg:gap-10 md:gap-5 gap-5 lg:w-[80%] w-[100%] m-auto py-[3rem] px-10'>
                    {
                        associateSponsors.map((sponsor, index) => (
                            <a key={index} href={sponsor.link} target="_blank" rel="noopener noreferrer"><img loading='lazy' data-aos="fade-up" className='lg:h-16 md:h-16 h-12' src={sponsor.logo} alt={sponsor.name} /></a>
                        ))
                    }
                </div>
            </div>

            <div className='flex flex-wrap items-center justify-center lg:gap-10 md:gap-5 gap-5 lg:w-[80%] w-[100%] m-auto py-[2rem] px-10'>
                <div className='flex flex-col items-center justify-center'>
                    <h5 className='text-center font-bold text-xl text-yellow-500 py-5' data-aos="fade-up">Pronite Partner</h5>
                    <a href="https://www.realme.com/in/" target="_blank" rel="noopener noreferrer"><img loading='lazy' data-aos="fade-up" className='lg:h-16 md:h-16 h-12' src="https://firebasestorage.googleapis.com/v0/b/kaisen2023.appspot.com/o/sponsors%2Frealme.webp?alt=media&token=cd26cb82-c3c0-4464-a16e-3844eedab94a" alt='Realme' /></a>
                </div>

                <div className='flex flex-col items-center justify-center'>
                    <h5 className='text-center font-bold text-xl text-sky-500 py-5' data-aos="fade-up">Food Partner</h5>
                    <a href="https://www.angeethirestaturant.com/" target="_blank" rel="noopener noreferrer"><img loading='lazy' data-aos="fade-up" className='lg:h-16 md:h-16 h-12' src="https://firebasestorage.googleapis.com/v0/b/kaisen2023.appspot.com/o/sponsors%2FAngeethi%2Brestautrant.webp?alt=media&token=4dd16686-c9eb-422f-9a60-d798e766c36a" alt='Angeethi Restaurant' /></a>
                </div>

                <div className='flex flex-col items-center justify-center'>
                    <h5 className='text-center font-bold text-xl text-red-500 py-5' data-aos="fade-up">Hospitality Partner</h5>
                    <a href="https://www.amalfigrand.com/" target="_blank" rel="noopener noreferrer"><img loading='lazy' data-aos="fade-up" className='lg:h-16 md:h-16 h-12' src="https://firebasestorage.googleapis.com/v0/b/kaisen2023.appspot.com/o/sponsors%2FHotel%20Amalfi%20grand.webp?alt=media&token=a97ee636-8536-4508-9168-7d778d1a04b1" alt='Hotel Amalfi Grand' /></a>
                </div>
            </div>

            {/* Health Partner */}

            <div >
                <h5 className='text-center font-bold text-3xl text-sky-500 pt-5' data-aos="fade-up">Health Partners</h5>
                <div className='flex flex-wrap items-center justify-center lg:gap-10 md:gap-5 gap-5 lg:w-[80%] w-[100%] m-auto py-[3rem] px-10'>
                    {
                        healthPartners.map((sponsor, index) => (
                            <a key={index} href={sponsor.link} target="_blank" rel="noopener noreferrer"><img loading='lazy' data-aos="fade-up" className='lg:h-14 md:h-14 h-10' src={sponsor.logo} alt={sponsor.name} /></a>
                        ))
                    }
                </div>
            </div>

            {/* Education Partner */}

            <div >
                <h5 className='text-center font-bold text-3xl text-rose-500 pt-5' data-aos="fade-up">Education Partners</h5>
                <div className='flex flex-wrap items-center justify-center lg:gap-10 md:gap-5 gap-5 lg:w-[80%] w-[100%] m-auto py-[3rem] px-10'>
                    {
                        educationPartner.map((sponsor, index) => (
                            <a key={index} href={sponsor.link} target="_blank" rel="noopener noreferrer"><img loading='lazy' data-aos="fade-up" className='lg:h-14 md:h-14 h-10' src={sponsor.logo} alt={sponsor.name} /></a>
                        ))
                    }
                </div>
            </div>

            {/*  Other Partners  */}

            <div className='flex flex-wrap items-center justify-center lg:gap-16 md:gap-5 gap-5 lg:w-[80%] w-[100%] m-auto py-[3rem] lg:px-32 md:px-16 px-5'>
                {
                    otherPartners.map((sponsor, index) => (
                        <div key={index} className='flex flex-col items-center justify-center'>
                            <h5 className={`text-center font-bold lg:text-xl md:text-xl text-lg ${index%2 === 0 ? "text-blue-600":"text-red-600"} py-5`} data-aos="fade-up">{sponsor.category}</h5>
                            <a href={sponsor.link} target="_blank" rel="noopener noreferrer"><img loading='lazy' data-aos="fade-up" className='lg:h-16 md:h-16 h-12' src={sponsor.logo} alt={sponsor.name} /></a>
                        </div>
                    ))
                }
            </div>

        </div>
    )
}

export default Sponsors