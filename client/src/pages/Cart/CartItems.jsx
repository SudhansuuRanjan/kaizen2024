import React, { useState, useCallback, useEffect } from 'react'
import { FaEdit } from 'react-icons/fa'
import { AiFillDelete } from 'react-icons/ai'
import { FaSave } from 'react-icons/fa'
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import debounce from '../../utils/debounce';
import { searchUserProfiles, addMembersToCartItem, deleteMembersFromCartItem } from '../../services/doc.service';
import { FiPlusCircle } from "react-icons/fi";
import { FaTrash } from "react-icons/fa";


const CartItem = ({ data, handleDelete, refetch }) => {
    const { user: current_user } = useAuth();
    const [edit, setEdit] = useState(false);
    const [team, setTeam] = useState(data.members);
    const [query, setQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState("");
    const [isPending, setIsPending] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [isError, setIsError] = useState(false);

    const handleEdit = () => {
        setEdit((e) => !e);
    }

    const fetchUsers = async (query) => {
        setIsPending(true);
        setIsError(false);
        try {
            const data = await searchUserProfiles(query);
            setSearchResults(data);
        } catch (error) {
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
            setSearchResults([]);
        }
    }, [debouncedQuery]);

    useEffect(() => {
        debouncedSetQuery(query);
    }, [query, debouncedSetQuery]);

    const addMember = async (user) => {
        if (team.length >= data.events.maxMembers) {
            return toast.error('Maximum team members reached. You cannot add more members.');
        }
        if (!team.find(member => member.user_id === user.id)) {
            let newMember = {
                cart_id: data.id,
                user_id: user.id,
                uid: current_user.user_id,
                event_id: data.event_id,
            }
            let res = await addMembersToCartItem('members', newMember);
            setTeam([...team, res[0]]);
            refetch();
            setEdit(false);
            toast.success('Member added successfully.');
        } else {
            toast.error('Member already added.');
        }
    };

    const deleteMember = async (id) => {
        if (team.length === data.minMembers) {
            return toast.error('Minimum team members reached. You cannot delete more members.');
        }

        try {
            await deleteMembersFromCartItem('members', id);
            setTeam((team) => team.filter((member) => member.id !== id));
            refetch();
            setEdit(false);
            toast.success('Member deleted successfully.');
        } catch (error) {
            toast.error('Failed to delete member');
        }
    }



    return (
        <div className='cart-item-container shadow-xl'>
            <div className="card-up">
                <div className='flex items-center'>
                    <Link to={`/events/${data.events.id}`} className='event-icon-container'>
                        <img src={data.events.image} alt="event" />
                    </Link>
                    <div className='event-cart-event-name-cont'>
                        <Link to={`/events/${data.events.id}`} className='event-name'>{data.events.name}</Link>
                    </div>
                </div>
                <div className='flex flex-wrap items-center justify-between w-[100%] lg:w-[auto] md:w-[auto]'>
                    <div className='flex lg:gap-10 gap-4'>
                        <h3 className='event-members'><span className='font-semibold text-green-500'>Team Size:</span> {data.events.maxMembers == data.events.minMembers ? data.events.minMembers : data.events.minMembers+  " - " + data.events.maxMembers}</h3>
                        <h1 className='event-price text-yellow-400 font-medium text-lg'>₹ {data.events.price}</h1>
                    </div>
                    <div className='pl-5'>

                        {edit ? <button onClick={handleEdit} className='edit-btn text-green-500 p-3 transition-transform delay-75 ease-out hover:scale-105'><FaSave size={25} /></button> : <button onClick={() => setEdit((e) => !e)} className='edit-btn text-blue-500 p-3 transition-transform delay-75 ease-out hover:scale-105'><FaEdit size={25} /></button>
                        }

                        <button onClick={handleDelete} className='delete-btn text-red-500 p-3 transition-transform delay-75 ease-out hover:scale-105'><AiFillDelete size={25} /></button>
                    </div>
                </div>
            </div>
            <div className="card-down w-[100%]">
                <div className='add-members-form w-full'>
                    <div className='flex flex-col gap-2 w-full'>
                        <h1 className='font-medium text-gray-500'>Participants</h1>

                        {
                            data.minMembers > 1 && members.length === 0 && <div className='text-red-500 font-light text-sm'> You haven't added any members yet.</div>
                        }

                        {team && team.length === 0 ? <div className='text-red-500 text-sm'> You haven't added any members yet.</div> :
                            <div className="overflow-x-auto border border-gray-600 rounded-lg">
                                <table className="min-w-full divide-y divide-gray-600">
                                    <thead className="bg-gray-900">
                                        <tr>
                                            <th className="text-white p-3 border-r border-gray-600">Name</th>
                                            <th className="text-white p-3 border-r border-gray-600">Kaizen ID</th>
                                            <th className="text-white p-3 border-r border-gray-600">Email</th>
                                            {edit && <th className="text-white p-3">Action</th>}
                                        </tr>
                                    </thead>
                                    <tbody className="bg-gray-950 text-sm">
                                        {team.slice(0).reverse().map((member, id) => (
                                            <tr key={id} className="bg-gray-950">
                                                <td className="p-3 border-r border-gray-600">
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        id="name"
                                                        placeholder="Name"
                                                        className="bg-transparent text-center text-white w-full"
                                                        value={member.profiles.name}
                                                        disabled
                                                    />
                                                </td>
                                                <td className="p-3 border-r border-gray-600">
                                                    <input
                                                        type="text"
                                                        name="kaizenid"
                                                        id="kaizenid"
                                                        placeholder="Kaizen ID"
                                                        className="bg-transparent text-center text-white w-full"
                                                        value={member.profiles.kaizenid}
                                                        disabled
                                                    />
                                                </td>
                                                <td className="p-3 border-r border-gray-600">
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        id="email"
                                                        placeholder="Email"
                                                        className="bg-transparent text-center text-white w-full"
                                                        value={member.profiles.email}
                                                        disabled
                                                    />
                                                </td>
                                                {edit && current_user.id !== member.profiles.id && (
                                                    <td className="p-3">
                                                        <button
                                                            onClick={() => deleteMember(member.id)}
                                                            className="p-1 text-xl text-rose-500 text-center"
                                                        >
                                                            <FaTrash />
                                                        </button>
                                                    </td>
                                                )}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>}


                    </div>
                </div>


                {/* Add Members Form */}
                {
                    edit &&
                    <div className='add-members-form w-[100%]'>
                        <div className='flex flex-col gap-2 w-[100%]'>
                            <h1 className='font-medium text-gray-500'>Add Members</h1>
                            <div className='w-full'>
                                <form className='text-sm flex items-center w-full flex-wrap justify-start gap-2 py-2' onSubmit={() => { }}>
                                    <input type="text" required name="query" id="query" placeholder='Enter name, email or kaizenid' className='bg-gray-800 w-full text-white p-2 rounded-md flex-1' value={query} onChange={(e) => {
                                        setQuery(e.target.value)
                                    }} />
                                    <button type="submit" className='w-[11rem] md:flex-0 lg:flex-0 py-2 border font-medium border-green-500 text-green-500 rounded-lg px-5 hover:bg-green-500 hover:text-black hover:border-[#111317]'>Search</button>
                                </form>

                                <div className='bg-slate-800 rounded-md mt-2'>
                                    {isPending ? (
                                        <div>Loading...</div>
                                    ) : isError ? (
                                        <div>Error loading users.</div>
                                    ) : (
                                        searchResults.map((user, id) => (
                                            <div key={id} className='flex gap-2 text-sm items-center p-1 rounded-lg flex-wrap bg-opacity-20'>
                                                <input
                                                    required
                                                    value={user.name}
                                                    type="text"
                                                    name="name"
                                                    id="name"
                                                    className='border-2 border-gray-600 bg-gray-900 font-medium rounded-md px-2 py-0.5 flex-1'
                                                    placeholder='Name'
                                                    disabled
                                                />
                                                <input
                                                    required
                                                    value={user.kaizenid}
                                                    type="email"
                                                    name="email"
                                                    id="email"
                                                    className='border-2 border-gray-600 bg-gray-900 text-white rounded-md px-2 py-0.5'
                                                    placeholder='Email'
                                                    disabled
                                                />
                                                <input
                                                    required
                                                    value={user.email}
                                                    type="email"
                                                    name="email"
                                                    id="email"
                                                    className='border-2 border-gray-600 bg-gray-900 text-white rounded-md px-2 py-0.5 flex-1'
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
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default CartItem