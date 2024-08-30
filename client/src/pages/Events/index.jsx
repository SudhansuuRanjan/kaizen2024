import React, { useEffect } from 'react';
import './Event.css';
import { Link, useSearchParams } from 'react-router-dom';
import { BsArrowUpRight } from 'react-icons/bs';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getPaginatedEvents } from '../../services/doc.service';
import { useInView } from 'react-intersection-observer';

const EventPage = () => {
    document.title = 'Events | KAIZEN 2023';
    const [searchParam, setSearchParams] = useSearchParams({
        category: "All"
    });

    const selectedEventCat = searchParam.get('category') || 'All';

    const { ref, inView } = useInView();

    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        status
    } = useInfiniteQuery({
        queryKey: ['events', selectedEventCat],
        queryFn: ({ pageParam = 0 }) => getPaginatedEvents("events", 21, pageParam, selectedEventCat),
        getNextPageParam: (lastPage) => lastPage.nextCursor,
        staleTime: Infinity,
        refetchOnWindowFocus: false,
    });

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [inView, fetchNextPage, hasNextPage]);

    return (
        <main className='bg-black'>
            <div className='event-banner'>
                <h1 className='event-head'>Events<br />2024</h1>
            </div>

            <div className='event-category-container'>
                {
                    ["All", "Literary", "Cultural", "Arts", "Informals", "Sports", "Academics", "Workshops"].map((category) => (
                        <button
                            onClick={() => setSearchParams(prev => {
                                prev.set('category', category);
                                return prev;
                            }, { replace: true })}
                            className={`category-btn ${selectedEventCat === category && "category-btn-active"}`}
                            key={category}
                        >
                            {category}
                        </button>
                    ))
                }
            </div>

            <div className='event-card-container'>
                {status === 'pending' ? <div>Loading...</div> :
                    status === 'error' ? <div>Error loading events: {error.message}</div> :
                        data.pages.flatMap(page => page.documents).map((event) => (
                            <Link to={event.id} key={event.id}>
                                <div className='event-card'>
                                    <div className='event-detail'>
                                        <div className='flex justify-between items-center w-[100%]'>
                                            <h3>{event.name}</h3>
                                            <BsArrowUpRight size={32} className="font-bold" />
                                        </div>
                                        <div className='flex justify-between items-center w-[100%]'>
                                            <h4>{event.category}</h4>
                                            <h4 className='text-green-500'>{event.status}</h4>
                                        </div>
                                        <div className='flex justify-end text-base items-center w-[100%] mt-1'>
                                            <h2 className='text-right'>Reg. Fee : {event.price ? <span className="text-pink-500">₹{event.price}</span> : <span className='text-green-500'>Free</span>}</h2>
                                        </div>
                                    </div>
                                    <img src={event.image} alt={event.name} loading='lazy' />
                                </div>
                            </Link>
                        ))
                }
            </div>

            <div className='m-auto text-center text-rose-500 font-medium mt-[-5rem] pb-[5rem]'>
                <div ref={ref}></div>
                {isFetchingNextPage && <div>Loading more...</div>}
                {!hasNextPage && !isFetchingNextPage && data && <div className='font-bold text-2xl'>. . .</div>}
            </div>
        </main >
    );
};

export default EventPage;
