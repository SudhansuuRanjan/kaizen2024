import { Link } from "react-router-dom";
import React, { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { FiX } from "react-icons/fi";
import CartIcon from "./CartIcon";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { getUserEventCart } from "../../services/doc.service";


const NavBar = () => {
    const [menu, setMenu] = useState(false);
    const [focus, setFocus] = useState(-1);
    const { session } = useAuth();

    const { data: cartItems } = useQuery({
        queryKey: ['cart'],
        queryFn: () => {
            if (session) {
                return getUserEventCart('cart', session.user.id)
            } else {
                return []
            }
        },
    })

    return (
        <div className="backdrop-blur-md drop-shadow-md z-50 flex flex-row fixed  bg-gray-800 bg-opacity-40 dark:backdrop-blur-md dark:drop-shadow-md  w-[100vw] items-center justify-center text-white border-b-[1px] border-[#242424]">
            <div className="flex items-center justify-between w-[100%] md:w-[70rem] px-4 md:px-3 py-4">
                <div className="flex items-center">
                    <Link to="/">
                        <img src="/images/kaizen.png" alt="logo" className="h-10" />
                    </Link>
                </div>
                <div className="flex items-center">
                    <ul className="md:flex hidden items-center">
                        <li
                            className={
                                focus === 0
                                    ? "hover:underline mx-3 border-yellow-300  border-[3px]  bg-yellow-50 dark:bg-[#7b2c5d] px-2 py-1"
                                    : "hover:underline px-2 py-1 mx-3 border-[3px] border-none dark:border-gray-800"
                            }

                        >
                            <Link to="/events">Events</Link>
                        </li>
                        <li
                            className={
                                focus === 1
                                    ? "hover:underline mx-3 border-yellow-300  border-[3px]  bg-yellow-50 dark:bg-[#7b2c5d] px-2 py-1"
                                    : "hover:underline px-2 py-1 mx-3 border-[3px] border-none dark:border-gray-800"
                            }

                        >
                            <Link to="/pronite">Pronite</Link>
                        </li>
                        <li
                            className={
                                focus === 1
                                    ? "hover:underline mx-3 border-yellow-300  border-[3px]  bg-yellow-50 dark:bg-[#7b2c5d] px-2 py-1"
                                    : "hover:underline px-2 py-1 mx-3 border-[3px] border-none dark:border-gray-800"
                            }

                        >
                            <Link to="/internal-collection">Internal Collection</Link>
                        </li>
                        <li
                            className={
                                focus === 1
                                    ? "hover:underline mx-3 border-yellow-300  border-[3px]  bg-yellow-50 dark:bg-[#7b2c5d] px-2 py-1"
                                    : "hover:underline px-2 py-1 mx-3 border-[3px] border-none dark:border-gray-800"
                            }

                        >
                            <Link to="/schedule">Schedule</Link>
                        </li>
                        <li
                            className={
                                focus === 1
                                    ? "hover:underline mx-3 border-yellow-300  border-[3px]  bg-yellow-50 dark:bg-[#7b2c5d] px-2 py-1"
                                    : "hover:underline px-2 py-1 mx-3 border-[3px] border-none dark:border-gray-800"
                            }

                        >
                            <Link to="/profile">Profile</Link>
                        </li>
                        {/* {session && <li
                            className={
                                focus === 1
                                    ? "hover:underline mx-3 border-yellow-300  border-[3px]  bg-yellow-50 dark:bg-[#7b2c5d] px-2 py-1"
                                    : "hover:underline px-2 py-1 mx-3 border-[3px] border-none dark:border-gray-800"
                            }

                        >
                            <button onClick={signOut}>Sign Out</button>
                        </li>} */}
                        <li
                            className={
                                focus === 2
                                    ? "hover:underline mx-3 border-yellow-300  border-[3px]  bg-yellow-50 dark:bg-[#7b2c5d] px-2 py-1"
                                    : "hover:underline px-2 py-1 mx-3 border-[3px] border-none dark:border-gray-800"
                            }

                        >
                            <Link to="/cart">
                                <CartIcon cartLength={
                                    cartItems ? cartItems.length : 0
                                } />
                            </Link>
                        </li>


                    </ul>

                    <button
                        type="button"
                        onClick={() => {
                            if (menu == false) {
                                setMenu(true);
                            } else {
                                setMenu(false);
                            }
                        }}
                        className="animate-pulse md:hidden border focus:ring-[2.5px] focus:outline-none font-medium rounded-lg text-lg px-2.5 py-2.5 text-center items-center focus:ring-gray-400 bg-gray-800 border-gray-700 text-white hover:bg-gray-700 mr-2"
                    >
                        {!menu ? <HiMenuAlt3 /> : <FiX />}
                    </button>
                </div>
            </div>
            {menu && (
                <div className="md:hidden fixed top-[4rem] right-0  rounded-lg w-[12rem] py-2 mr-5 shadow-md text-white bg-gray-900  border-gray-500 border">
                    <ul>
                        <li>
                            <Link to="/">
                                <button
                                    onClick={() => {
                                        setMenu(false);
                                        // setFocus(0);
                                    }}
                                    className="hover:underline hover:border-yellow-300  border-4 border-gray-900 py-1.5 w-[100%] pl-4 cursor-pointer hover:bg-gray-700 text-left"
                                >
                                    Home
                                </button>
                            </Link>
                        </li>
                        <li>
                            <Link to="/events">
                                <button
                                    onClick={() => {
                                        setMenu(false);
                                        // setFocus(0);
                                    }}
                                    className="hover:underline hover:border-yellow-300  border-4 border-gray-900 py-1.5 w-[100%] pl-4 cursor-pointer hover:bg-gray-700 text-left"
                                >
                                    Events
                                </button>
                            </Link>
                        </li>
                        <li>
                            <Link to="/profile">
                                <button
                                    onClick={() => {
                                        setMenu(false);

                                    }}
                                    className="hover:underline hover:border-yellow-300  border-4 border-gray-900 py-1.5 w-[100%] pl-4 cursor-pointer hover:bg-gray-700 text-left"
                                >
                                    Profile
                                </button>
                            </Link>
                        </li>
                        <li>
                            <Link to="/cart">
                                <button
                                    onClick={() => {
                                        setMenu(false);

                                    }}
                                    className="hover:underline hover:border-yellow-300  border-4 border-gray-900 py-1.5 w-[100%] pl-4 cursor-pointer hover:bg-gray-700 text-left"
                                >
                                    Cart
                                </button>
                            </Link>
                        </li>
                        <li>
                            <Link to="/pronite">
                                <button
                                    onClick={() => {
                                        setMenu(false);

                                    }}
                                    className="hover:underline hover:border-yellow-300  border-4 border-gray-900 py-1.5 w-[100%] pl-4 cursor-pointer hover:bg-gray-700 text-left"
                                >
                                    Pronite
                                </button>
                            </Link>
                        </li>
                        {/* <li>
                            <Link to="/alumni-connect">
                                <button
                                    onClick={() => {
                                        setMenu(false);

                                    }}
                                    className="hover:underline hover:border-yellow-300  border-4 border-gray-900 py-1.5 w-[100%] pl-4 cursor-pointer hover:bg-gray-700 text-left"
                                >
                                    Alumni Connect
                                </button>
                            </Link>
                        </li> */}
                        <li>
                            <Link to="/schedule">
                                <button
                                    onClick={() => {
                                        setMenu(false);

                                    }}
                                    className="hover:underline hover:border-yellow-300  border-4 border-gray-900 py-1.5 w-[100%] pl-4 cursor-pointer hover:bg-gray-700 text-left"
                                >
                                    Schedule
                                </button>
                            </Link>
                        </li>
                        <li>
                            <Link to="/basicregistration">
                                <button
                                    onClick={() => {
                                        setMenu(false);

                                    }}
                                    className="hover:underline hover:border-yellow-300  border-4 border-gray-900 py-1.5 w-[100%] pl-4 cursor-pointer hover:bg-gray-700 text-left"
                                >
                                    Get Pass
                                </button>
                            </Link>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default NavBar;