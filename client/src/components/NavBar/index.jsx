import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { FiX } from "react-icons/fi";
// import CartIcon from "./CartIcon";


const NavBar = () => {
    const [menu, setMenu] = useState(false);
    const [focus, setFocus] = useState(-1);
    // const [user, setUser] = useState(null);
    // const auth = getAuth();

    // // get user cart length from firebase
    // const getUser = async () => {
    //     if (auth.currentUser === null) return;
    //     try {
    //         const userRef = doc(db, 'users', auth.currentUser.uid);
    //         const docSnap = await getDoc(userRef);
    //         const user = docSnap.data();
    //         // console.log(user.cart);
    //         setUser(user);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // useEffect(() => {
    //     getUser();
    // }, [])

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
                            <Link to="/profile">Profile</Link>
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
                            <Link to="/alumni-connect">Alumni Connect</Link>
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
                        {/* <li
                            className={
                                focus === 1
                                    ? "hover:underline mx-3 border-yellow-300  border-[3px]  bg-yellow-50 dark:bg-[#7b2c5d] px-2 py-1"
                                    : "hover:underline px-2 py-1 mx-3 border-[3px] border-none dark:border-gray-800"
                            }

                        >
                            <Link to="/">Get pass</Link>
                        </li> */}
                        {/* <li
                            className={
                                focus === 2
                                    ? "hover:underline mx-3 border-yellow-300  border-[3px]  bg-yellow-50 dark:bg-[#7b2c5d] px-2 py-1"
                                    : "hover:underline px-2 py-1 mx-3 border-[3px] border-none dark:border-gray-800"
                            }

                        >
                            <Link to="/cart">
                                <CartIcon cartLength={0} />
                            </Link>
                        </li> */}


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
                        className="animate-pulse md:hidden text-gray-900 bg-yellow-50 hover:bg-yellow-50 border border-gray-200 focus:ring-[2.5px] focus:outline-none focus:ring-yellow-200 font-medium rounded-lg text-lg px-2.5 py-2.5 text-center items-center dark:focus:ring-gray-400 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 mr-2"
                    >
                        {!menu ? <HiMenuAlt3 /> : <FiX />}
                    </button>
                </div>
            </div>
            {menu && (
                <div className="md:hidden fixed top-[4rem] right-0 bg-white rounded-md w-[12rem] py-2 mr-5 shadow-md text-gray-800 dark:text-white dark:bg-gray-700 border-gray-200 dark:border-gray-500 border">
                    <ul>
                        <li>
                            <Link to="/">
                                <button
                                    onClick={() => {
                                        setMenu(false);
                                        // setFocus(0);
                                    }}
                                    className="hover:underline hover:border-yellow-300 dark:hover:border-yellow-300  border-4 border-white dark:border-gray-700 py-1.5 w-[100%] pl-4 cursor-pointer hover:bg-yellow-50 dark:hover:bg-gray-400 text-left"
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
                                    className="hover:underline hover:border-yellow-300 dark:hover:border-yellow-300  border-4 border-white dark:border-gray-700 py-1.5 w-[100%] pl-4 cursor-pointer hover:bg-yellow-50 dark:hover:bg-gray-400 text-left"
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
                                    className="hover:underline hover:border-yellow-300 dark:hover:border-yellow-300  border-4 border-white dark:border-gray-700 py-1.5 w-[100%] pl-4 cursor-pointer hover:bg-yellow-50 dark:hover:bg-gray-400 text-left"
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
                                    className="hover:underline hover:border-yellow-300 dark:hover:border-yellow-300  border-4 border-white dark:border-gray-700 py-1.5 w-[100%] pl-4 cursor-pointer hover:bg-yellow-50 dark:hover:bg-gray-400 text-left"
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
                                    className="hover:underline hover:border-yellow-300 dark:hover:border-yellow-300  border-4 border-white dark:border-gray-700 py-1.5 w-[100%] pl-4 cursor-pointer hover:bg-yellow-50 dark:hover:bg-gray-400 text-left"
                                >
                                    Pronite
                                </button>
                            </Link>
                        </li>
                        <li>
                            <Link to="/alumni-connect">
                                <button
                                    onClick={() => {
                                        setMenu(false);

                                    }}
                                    className="hover:underline hover:border-yellow-300 dark:hover:border-yellow-300  border-4 border-white dark:border-gray-700 py-1.5 w-[100%] pl-4 cursor-pointer hover:bg-yellow-50 dark:hover:bg-gray-400 text-left"
                                >
                                    Alumni Connect
                                </button>
                            </Link>
                        </li>
                        <li>
                            <Link to="/schedule">
                                <button
                                    onClick={() => {
                                        setMenu(false);

                                    }}
                                    className="hover:underline hover:border-yellow-300 dark:hover:border-yellow-300  border-4 border-white dark:border-gray-700 py-1.5 w-[100%] pl-4 cursor-pointer hover:bg-yellow-50 dark:hover:bg-gray-400 text-left"
                                >
                                    Schedule
                                </button>
                            </Link>
                        </li>
                        {/* <li>
                            <Link to="/">
                                <button
                                    onClick={() => {
                                        setMenu(false);

                                    }}
                                    className="hover:underline hover:border-yellow-300 dark:hover:border-yellow-300  border-4 border-white dark:border-gray-700 py-1.5 w-[100%] pl-4 cursor-pointer hover:bg-yellow-50 dark:hover:bg-gray-400 text-left"
                                >
                                    Get Pass
                                </button>
                            </Link>
                        </li> */}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default NavBar;