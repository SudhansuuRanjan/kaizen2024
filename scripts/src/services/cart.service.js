const supabase = require('../config');

const getUserEventCart = async (table, user_id) => {
    try {
        const { data, error } = await supabase
            .from(table)
            .select(`*,
            members(*)
            `)
            .eq('user_id', user_id)

        if (error) {
            throw error;
        }

        return data;
    } catch (error) {
        throw error;
    }
}

const addFreeEventToPurchased = async (user, event, team_members) => {
    try {
        const { data, error } = await supabase
            .from('purchased_events')
            .insert({
                event_id: event.event_id,
                user_id: user.user_id,
                user_email: user.user_email,
            })
            .select(`id`)

        if (error) {
            throw new Error(error);
        }

        const members = team_members.map((member) => {
            return {
                event_id: member.event_id,
                user_id: member.user_id,
                cart_id: data[0].id,
                uid: user.user_id,
            }
        })

        const { error: memberError } = await supabase
            .from('purchased_events_members')
            .insert(members)

        if (memberError) {
            throw new Error(memberError);
        }

    } catch (error) {
        throw error;
    }
}

const getFreeEventFromProfile = async (user_id, event_id) => {
    try {
        const { data: registrationData, error } = await supabase
            .from('purchased_events_members')
            .select(`*,
            cart:purchased_events(*,
            events(*),
            purchased_events_members(*,profiles(*)))
            `)
            .eq('event_id', event_id)
            .eq('uid', user_id)

        if (error) {
            throw error;
        }

        return registrationData;
    } catch (error) {
        throw error;
    }
}


const addEventsToPurchased = async (user_id, event, team_members) => {
    // Check if the user has already added the event to cart
    try {
        const { data, error } = await supabase
            .from('purchased_events')
            .insert({
                event_id: event.event_id,
                user_id: event.user_id,
                user_email: event.user_email,
            })
            .select(`*`)

        if (error) {
            throw new Error(error.message);
        }

        const members = team_members.map((member) => {
            return {
                event_id: member.event_id,
                user_id: member.user_id,
                cart_id: data[0].id,
                uid: member.uid,
            }
        })


        const { error: memberError } = await supabase
            .from('purchased_events_members')
            .insert(members)

    } catch (error) {
        throw error;
    }
}

const clearUserCart = async (user_id) => {
    try {
        const { data, error } = await supabase
            .from('cart')
            .delete()
            .eq('user_id', user_id)
            .select('*')

        if (error) {
            throw error;
        }

        return data;
    } catch (error) {
        throw error;
    }
}

const createCartPaymentTransaction = async (data) => {
    try {
        const { data: transaction, error } = await supabase
            .from('events_purchase_info')
            .insert(data)
            .select('*')

        if (error) {
            throw error;
        }

        return transaction;
    } catch (error) {
        throw error;
    }
}

const getCartPaymentTransaction = async (clientTxnId) => {
    try {
        const { data, error } = await supabase
            .from('events_purchase_info')
            .select('*')
            .eq('clientTxnId', clientTxnId)

        if (error) {
            throw error;
        }

        return data;
    } catch (error) {
        throw error;
    }
}

const updateCartPaymentTransaction = async (clientTxnId, data) => {
    try {
        const { data: transaction, error } = await supabase
            .from('events_purchase_info')
            .update(data)
            .eq('clientTxnId', clientTxnId)

        if (error) {
            throw error;
        }

        return transaction;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getUserEventCart,
    addEventsToPurchased,
    clearUserCart,
    createCartPaymentTransaction,
    getCartPaymentTransaction,
    updateCartPaymentTransaction,
    addFreeEventToPurchased,
    getFreeEventFromProfile
}