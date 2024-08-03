import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useAuth from "../../hooks/useAuth";
import { addEventToCart, searchUserProfiles, checkEventAlreadyPurchased } from '../../services/doc.service';
import { handleFreeEvent } from '../../services/payment.service';
import { useState, useEffect, useCallback } from 'react';
import { FiPlusCircle } from "react-icons/fi";
import { FaTrash } from "react-icons/fa";
import { Loading } from '../../components/Loader/Loader';
import debounce from "../../utils/debounce";


const RegisterPopup = ({ event, setPopup }) => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [query, setQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState("");
    const [team, setTeam] = useState([user]);
    const [data, setData] = useState([]);
    const [isPending, setIsPending] = useState(false);
    const [isError, setIsError] = useState(false);
    const [loading, setLoading] = useState(false);

    const deleteMember = (id) => {
        if (id === user.id) {
            toast.error('You cannot remove yourself from the team.');
            return;
        }
        setTeam(team.filter(member => member.id !== id));
    };

    const handleAddEventToCart = async () => {
        setLoading(true);
        if (event.minMembers > team.length) {
            toast.error('Please add more team members to proceed.');
            setLoading(false);
            return;
        }

        try {
            const data = {
                event_id: event.id,
                user_id: user.user_id,
                user_email: user.email,
            };

            const members = team.map(member => {
                return {
                    user_id: member.id,
                    event_id: event.id,
                    cart_id: null,
                };
            });

            if (event.price == 0) {
                data.price = event.price;
                const eventAlreadyExist = await checkEventAlreadyPurchased(user.id, event.id);
                if (eventAlreadyExist) {
                    toast.warn('You have already registered for this event.');
                    setPopup(false);
                    return navigate('/profile');
                }
                await handleFreeEvent(user, data, members);
                toast.success('This event is free, you have been registered successfully');
                setPopup(false);
                return navigate('/profile');
            }

            await addEventToCart(user, data, members);
            toast.success('Event added to cart successfully');
            setPopup(false);
            navigate('/cart');
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchUsers = async (query) => {
        setIsPending(true);
        setIsError(false);
        try {
            const data = await searchUserProfiles(query);
            setData(data);
        } catch (error) {
            console.log(error);
            setIsError(true);
        } finally {
            setIsPending(false);
        }
    };

    const debouncedSetQuery = useCallback(debounce(setDebouncedQuery, 400), []);

    useEffect(() => {
        if (debouncedQuery.length > 0) {
            fetchUsers(debouncedQuery);
        }

        if (debouncedQuery.length === 0) {
            setData([]);
        }
    }, [debouncedQuery]);

    useEffect(() => {
        debouncedSetQuery(query);
    }, [query, debouncedSetQuery]);

    const addMember = (user) => {
        if (team.length >= event.maxMembers) {
            return toast.error('Maximum team members reached. You cannot add more members.');
        }
        if (!team.find(member => member.id === user.id)) {
            setTeam([...team, user]);
        } else {
            toast.error('Member already added.');
        }
    };

    return (
        <div className='fixed bg-black bg-opacity-80 backdrop-blur-lg h-[100%] w-[100%] z-[999] flex top-0 overflow-y-scroll'>
            <div className='bg-gray-800 bg-opacity-30 backdrop-blur-lg rounded-2xl p-4 lg:p-8 md:p-6 pt-3 w-[90%] md:w-[35rem] lg:w-[48rem] border border-zinc-700 my-20 h-fit m-auto'>
                {loading && <Loading message={"Adding event to cart."} />}
                <h1 className='text-3xl font-bold text-center mt-5 lg:mt-0 md:mt-0'>Register for {event.name}</h1>
                <div className='flex flex-col gap-2 mt-6'>
                    <div className='text-sm text-red-500 mb-2'>
                        {event.minMembers > 1 && (
                            <li>
                                This is a team event, <span className='text-base font-semibold text-yellow-500'>add {event.minMembers - 1} team members other than you</span> and then proceed to register, you can update your team list in Event Cart.
                            </li>
                        )}
                        <li>
                            On registration the events are added to your cart, then you need to go to cart and pay for the events you want to register.
                        </li>
                    </div>

                    <h3 className='text-lg font-semibold'>Team Members</h3>
                    {team.map((member, id) => (
                        <div key={id} className='flex w-full gap-2 items-center text-sm bg-black p-1 rounded-lg flex-wrap bg-opacity-20'>
                            <p className='font-medium'>{id + 1}.</p>
                            <input
                                required
                                value={member.name}
                                type="text"
                                name="name"
                                id="name"
                                className='border-2 border-gray-600 bg-gray-900 font-medium rounded-md px-2 py-0.5'
                                placeholder='Name'
                                disabled
                            />
                            <input
                                required
                                value={member.kaizenid}
                                type="email"
                                name="email"
                                id="email"
                                className='border-2 border-gray-600 bg-gray-900 text-white rounded-md px-2 py-0.5'
                                placeholder='Email'
                                disabled
                            />
                            <input
                                required
                                value={member.email}
                                type="email"
                                name="email"
                                id="email"
                                className='border-2 flex-1 border-gray-600 bg-gray-900 text-white rounded-md px-2 py-0.5'
                                placeholder='Email'
                                disabled
                            />
                            <button
                                className='text-rose-500 text-2xl'
                                onClick={() => deleteMember(member.id)}
                            >
                                <FaTrash />
                            </button>
                        </div>
                    ))}



                    {event.maxMembers > 1 && event.maxMembers >= team.length && (
                        <div className='w-[100%] mb-3'>
                            <h3 className='text-lg font-semibold'>Add Team Members</h3>
                            <form className='flex gap-2 items-center w-[100%] flex-wrap' onSubmit={(e) => e.preventDefault()}>
                                <input
                                    value={query}
                                    type="search"
                                    name="query"
                                    id="query"
                                    className='border-2 border-gray-800 rounded-md px-2 py-1 flex-1 text-gray-100 font-medium bg-gray-900'
                                    placeholder='Search by name, email or kaizenid'
                                    onChange={(e) => setQuery(e.target.value)}
                                />
                            </form>

                            <div className='rounded-md mt-2 flex flex-col gap-1'>
                                {isPending ? (
                                    <div>Loading...</div>
                                ) : isError ? (
                                    <div>Error loading users.</div>
                                ) : (
                                    data.map((user, id) => (
                                        <div key={id} className='flex border gap-1 border-green-500  text-sm items-center p-1 rounded-lg flex-wrap'>
                                            <input
                                                required
                                                value={user.name}
                                                type="text"
                                                name="name"
                                                id="name"
                                                className='border border-gray-600 bg-gray-900 font-medium rounded-md px-2 py-0.5'
                                                placeholder='Name'
                                                disabled
                                            />
                                            <input
                                                required
                                                value={user.kaizenid}
                                                type="email"
                                                name="email"
                                                id="email"
                                                className='border border-gray-600 bg-gray-900 text-white rounded-md px-2 py-0.5'
                                                placeholder='Email'
                                                disabled
                                            />
                                            <input
                                                required
                                                value={user.email}
                                                type="email"
                                                name="email"
                                                id="email"
                                                className='border border-gray-600 bg-gray-900 text-white rounded-md px-2 py-0.5 flex-1'
                                                placeholder='Email'
                                                disabled
                                            />
                                            <button
                                                className=' text-green-500 text-2xl'
                                                onClick={() => addMember(user)}
                                            >
                                                <FiPlusCircle />
                                            </button>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    )}

                    <div className='flex relative mt-2 items-center justify-center gap-10'>
                        <button onClick={handleAddEventToCart} className='relative flex items-center justify-center'>
                            <p className='text-green-500 border-green-500 hover:border-zinc-800 hover:text-zinc-800 hover:bg-green-500 border px-6 py-1.5 rounded-xl font-semibold text-xl font-mono'>Register</p>
                        </button>

                        <button onClick={() => setPopup(false)} className='relative flex items-center justify-center'>
                            <p className='text-blue-500 border-blue-500 hover:border-zinc-800 hover:text-zinc-800 hover:bg-blue-500 border px-6 py-1.5 rounded-xl font-semibold text-xl font-mono'>Cancel</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPopup;
