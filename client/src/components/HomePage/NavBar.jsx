import React, { useState } from 'react'
import './NavBar.scss'
import { Link } from 'react-router-dom';

const NavBar = () => {

    const [active, setActive] = useState(false);
    const [colorChange, setColorchange] = useState(false);

    const handleClick = () => {
        // set overflow to hidden when the nav is open
        if (document.getElementById('main-navigation-toggle').checked) {
            document.body.style.overflow = 'hidden'
            setActive(true);
        } else {
            document.body.style.overflow = 'unset'
            setActive(false);
        }
    }

    const changeNavbarColor = () => {
        if (window.scrollY >= 400) {
            setColorchange(true);
        } else {
            setColorchange(false);
        }
    };
    window.addEventListener("scroll", changeNavbarColor);

    return (
        <>
            <div className={`fixed z-10 w-[100%] ${colorChange && "border-b bg-gray-700 transition-all delay-100 ease-in-out bg-opacity-20 backdrop-blur-md border-gray-800 shadow-md"}`}>
                <div className='p-4'>
                    <Link to="/">
                        <img src="/images/kaizen.png" alt="logo" className="h-12" />
                    </Link>
                </div>
            </div>

            <div className='z-[25] fixed'>
                <input type="checkbox" id="main-navigation-toggle" className="btn btn--close" onClick={handleClick} title="Toggle main navigation" />
                <label htmlFor="main-navigation-toggle">
                    <span></span>
                </label>
            </div>

            <nav id="main-navigation" className={`nav-main bg-gray-900 transform transition-all h-[100%] w-[100%] delay-100 ease-in-out fixed top-0 z-10 flex justify-center items-center ${!active && "translate-x-[-100%]"}`}>
                <ul className="menu">
                    <li className="menu__item">
                        <Link onClick={() => document.body.style.overflow = 'unset'} className="menu__link" to="/">Home</Link>
                    </li>
                    <li className="menu__item">
                        <Link onClick={() => document.body.style.overflow = 'unset'} className="menu__link" to="/events">Events</Link>
                        <ul className="submenu">
                            <li className="menu__item">
                                <Link className="menu__link" to="/schedule">Event Schedule</Link>
                            </li>
                            <li className="menu__item">
                                <Link className="menu__link" to="/cart">My Cart</Link>
                            </li>
                        </ul>
                    </li>
                    <li className="menu__item">
                        <Link onClick={() => document.body.style.overflow = 'unset'} className="menu__link" to="/cart">Cart</Link>
                    </li>
                    <li className="menu__item">
                        <Link onClick={() => document.body.style.overflow = 'unset'} className="menu__link" to="/profile">Profile</Link>
                    </li>
                    <li className="menu__item">
                        <Link onClick={() => document.body.style.overflow = 'unset'} className="menu__link" to="/basicregistration">Basic Reg.</Link>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default NavBar