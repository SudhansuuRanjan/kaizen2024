import { databases, DATABASE_ID } from "../config/appwrite";
import { ID, Query, Permission, Role } from "appwrite";
import supabase from "../config/supabase";

export const getDocuments = async (COLLECTION_ID, limit = 21, offset = 0) => {
    try {
        const res = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.limit(limit),
            Query.offset(offset),
        ]);
        return res.documents;
    } catch (err) {
        throw new Error(err.message);
    }
}

export const getDocument = async (COLLECTION_ID, DOCUMENT_ID) => {
    try {
        const res = await databases.getDocument(DATABASE_ID, COLLECTION_ID, DOCUMENT_ID);
        return res;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const deleteDocument = async (COLLECTION_ID, DOCUMENT_ID) => {
    try {
        const res = await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, DOCUMENT_ID);
        return res;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const getDocumentByQuery = async (COLLECTION_ID, query, value) => {
    try {
        const res = await databases.listDocuments(DATABASE_ID, COLLECTION_ID,
            [Query.equal(query, value)]
        );
        return res.documents[0];
    } catch (error) {
        console.log(error.message);
    }
}



export const createUserDoc = async (COLLECTION_ID, data, user) => {
    const userExist = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
        Query.equal('email', data.email)
    ])

    if (userExist.documents.length === 0) {
        try {
            const DOCUMENT_ID = ID.unique();
            const res = await databases.createDocument(DATABASE_ID, COLLECTION_ID, DOCUMENT_ID, data, [
                Permission.delete(Role.user(user.$id)),
                Permission.read(Role.any()),
                Permission.update(Role.user(user.$id)),
            ]);
            return res;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    return userExist.documents[0] || null;
}

export const updateUserDoc = async (COLLECTION_ID, DOCUMENT_ID, data) => {
    try {
        const res = await databases.updateDocument(DATABASE_ID, COLLECTION_ID, DOCUMENT_ID, data);
        return res;
    } catch (error) {
        throw new Error(error.message);
    }
}


export const addEventToCart = async (data, user_id, team_members, uid) => {
    // Check if the user has already added the event to cart
    try {
        const { data: cartExist } = await supabase
            .from('cart')
            .select('*')
            .eq('event_id', data.event_id)
            .eq('user_id', user_id)


        if (cartExist.length > 0) {
            throw new Error('Event already added to cart');
        }

        // const { data: eventPurchased } = await supabase
        //     .from('purchased_events')
        //     .select('*')
        //     .eq('event_id', data.event_id)
        //     .eq('user_id', user_id)


        const { data: eventPurchased } = await supabase
            .from('purchased_events_members')
            .select(`*,
            cart:purchased_events(*,
            self:profiles(*),
            purchased_events_members(*,profiles(*)))
            `)
            .eq('user_id', uid)

        if (eventPurchased.length > 0) {
            for (let i = 0; i < eventPurchased.length; i++) {
                if (eventPurchased[i].event_id === data.event_id) {
                    throw new Error('Event already purchased!');
                }
            }
        }

        const { data: cart} = await supabase
            .from('cart')
            .insert(data)
            .select('*')


        team_members = team_members.map(member => {
            return { ...member, cart_id: cart[0].id, uid: user_id }
        })

        const { data: members, error: memberError } = await supabase
            .from('members')
            .insert(team_members)
            .select('*')


        return { cart, members };
    } catch (error) {
        throw new Error(error.message);
    }
}

export const getDocumentById = async function (table, id) {
    const { data, error } = await supabase
        .from(table)
        .select('*')
        .eq('id', id)
        .single()

    if (error) {
        throw new Error(error.message);
        return null;
    } else {
        return data;
    }

}


export const createProfile = async function (table, user) {

    // Check if the user already exists
    const { data: userExist } = await supabase
        .from(table)
        .select('email')
        .eq('email', user.email)
        .single()

    if (!userExist) {
        const { data, error } = await supabase
            .from(table)
            .insert(user)
            .single()

        if (error) {
            throw new Error(error.message);
        } else {
            return data;
        }
    }
}

export const updateUserProfile = async function (table, user_id, user) {
    const { data, error } = await supabase
        .from(table)
        .update(user)
        .eq('user_id', user_id)

    if (error) {
        throw new Error(error.message);
    } else {
        return data;
    }
}


export const getPaginatedEvents = async (collectionId, limit = 21, offset = 0, category = "All") => {
    try {
        const query = supabase
            .from(collectionId)
            .select('*')
            .range(offset, offset + limit - 1)
            .order('id', { ascending: false });

        if (category !== "All") {
            query.eq('category', category);
        }

        const { data, error } = await query;

        if (error) {
            throw new Error(error.message);
        }

        return {
            documents: data,
            nextCursor: data.length === limit ? offset + limit : undefined
        };
    } catch (err) {
        throw new Error(err.message);
    }
};

export const getUserEventCart = async (table, user_id) => {
    try {
        const { data, error } = await supabase
            .from(table)
            .select(`*, 
            events(*),
            self:profiles(*),
            members(*,profiles(*))
            `)
            .eq('user_id', user_id)

        if (error) {
            throw new Error(error.message);
        }

        // return only those events that are active
        const activeEvents = data.filter(event => event.events.status === 'Active');
        return activeEvents;
    } catch (error) {
        throw new Error(error.message);
        return [];
    }
}

export const getPurchasedEvents = async (table, user_id) => {
    try {
        const { data, error } = await supabase
            .from(table)
            .select(`*, 
            events(*),
            self:profiles(*),
            purchased_events_members(*,profiles(*))
            `)
            .eq('user_id', user_id)

        if (error) {
            throw new Error(error.message);
        }

        return data;
    } catch (error) {
        throw new Error(error.message);
        return [];
    }
}

export const getPurchasedSharedEvents = async (table, user_id) => {
    try {
        const { data, error } = await supabase
            .from(table)
            .select(`*,
            cart:purchased_events(*,
            self:profiles(*),
            events(*),
            purchased_events_members(*,profiles(*)))
            `)
            .eq('user_id', user_id)

        console.log(data);

        if (error) {
            console.log(error);
            throw new Error(error.message);
        }

        return data;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const searchUserProfiles = async (query) => {
    try {
        // Search for user profiles by name or email or kaizenid
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .or(`email.like.%${query}%, name.like.%${query}%, kaizenid.like.%${query}%`)
            .limit(5)

        if (error) {
            throw new Error(error.message);
        }

        return data;
    } catch (error) {
        throw new Error(error.message);
        return [];
    }
}

export const getCurrentUserProfile = async (user_id) => {
    try {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('user_id', user_id)
            .single()

        if (error) {
            return null;
        }

        return data;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const deleteCartItem = async (table, id) => {
    const { data, error } = await supabase
        .from(table)
        .delete()
        .eq('id', id)

    if (error) {
        throw new Error(error.message);
    }
}

export const addMembersToCartItem = async (table, member) => {
    const { data, error } = await supabase
        .from(table)
        .insert(member)
        .select('*,profiles(*)')

    if (error) {
        throw new Error(error.message);
    }

    return data;
}

export const deleteMembersFromCartItem = async (table, id) => {
    const { data, error } = await supabase
        .from(table)
        .delete()
        .eq('id', id)

    if (error) {
        throw new Error(error.message);
    }
}

export const createInternalTransaction = async (table, data) => {
    const { data: transaction, error } = await supabase
        .from(table)
        .insert(data)
        .select('*')

    if (error) {
        throw new Error(error.message);
    }

    return transaction;
}

export const getInternalTransactions = async (table, txnid) => {
    const { data, error } = await supabase
        .from(table)
        .select('*')
        .eq('txnid', txnid)

    if (error) {
        throw new Error(error.message);
    }

    return data;
}

export const updateInternalTransaction = async (table, txnid, data) => {
    const { data: transaction, error } = await supabase
        .from(table)
        .update(data)
        .eq('txnid', txnid)
        .select('*')

    if (error) {
        throw new Error(error.message);
    }

    return transaction;
}    