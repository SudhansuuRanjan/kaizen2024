const supabase = require('../config');

async function getPromoCode(code) {
    try {
        const { data, error } = await supabase
            .from('promocodes')
            .select('*')
            .eq('code', code);

        if (error) {
            console.error('Error fetching promo code:', error.message);
            throw error;
        }

        if (!data || data.length === 0) {
            throw new Error('Promo code not found');
        }

        return data;
    } catch (error) {
        console.error('Error in getPromoCode:', error.message);
        throw error;
    }
}


const createPassPurchasePayment = async (paymentData) => {
    try {
        const { data, error } = await supabase
            .from('pass_purchase_info')
            .insert(paymentData)
            .single();

        if (error) {
            console.error('Error creating pass purchase payment:', error.message);
            throw error;
        }

        return data;
    } catch (error) {
        console.error('Error in createPassPurchasePayment:', error.message);
        throw error;
    }
}

const getPassPurchasePayment = async (clientTxnId) => {
    try {
        const { data, error } = await supabase
            .from('pass_purchase_info')
            .select('*')
            .eq('clientTxnId', clientTxnId);

        if (error) {
            console.error('Error fetching pass purchase payment:', error.message);
            throw error;
        }

        if (data.length === 0) {
            throw new Error('Pass purchase payment not found');
        }

        return data[0];
    } catch (error) {
        console.error('Error in getPassPurchasePayment:', error.message);
        throw error;
    }
}


const updatePassPurchasePayment = async (clientTxnId, paymentData) => {
    try {
        const { data, error } = await supabase
            .from('pass_purchase_info')
            .update(paymentData)
            .eq('clientTxnId', clientTxnId)

        if (error) {
            console.error('Error updating pass purchase payment:', error.message);
            throw error;
        }

        return data;
    } catch (error) {
        console.error('Error in updatePassPurchasePayment:', error.message);
        throw error;
    }
}

const createPass = async (passData) => {
    try {
        const { error } = await supabase
            .from('brpass')
            .insert(passData)

        if (error) {
            console.error('Error creating pass:', error.message, passData);
            throw error;
        }

    } catch (error) {
        console.error('Error in createPass:', error.message);
        throw error;
    }
}

const getUnverifiedPaymnents = async () => {
    try {
        const { data, error } = await supabase
            .from('pass_purchase_info')
            .select('*')
            .eq('paymentVerified', false)

        if (error) {
            console.error('Error fetching unverified payments:', error.message);
            throw error;
        }

        return data;
    } catch (error) {
        console.error('Error in getUnverifiedPaymnents:', error.message);
        throw error;
    }
}

const getPassByBrid = async (brid) => {
    try {
        const { data, error } = await supabase
            .from('brpass')
            .select('*')
            .eq('brid', brid)

        if (error) {
            console.error('Error fetching pass by brid:', error.message);
            throw error;
        }

        return data;
    } catch (error) {
        console.error('Error in getPassByBrid:', error.message);
        throw error;
    }
}

const updatePass = async (id, passData) => {
    try {
        const { data, error } = await supabase
            .from('brpass')
            .update(passData)
            .eq('id', id)
            .select('*')

        if (error) {
            console.error('Error updating pass:', error.message);
            throw error;
        }

        return data;
    } catch (error) {
        console.error('Error in updatePass:', error.message);
        throw error;
    }
}

module.exports = { getPromoCode, createPassPurchasePayment, createPass, updatePassPurchasePayment, getPassPurchasePayment, getUnverifiedPaymnents, getPassByBrid, updatePass };