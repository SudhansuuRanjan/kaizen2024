import axios from 'axios';

const createInternalPaymentTransaction = async (data) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_APP_API_URL}/internalpayment`, data, {
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': import.meta.env.VITE_APP_ACCESS_KEY
            }
        });

        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
};

const updateInternalPaymentTransaction = async (data) => {
    try {
        const response = await axios.put(`${import.meta.env.VITE_APP_API_URL}/internalpayment/update`, data, {
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': import.meta.env.VITE_APP_ACCESS_KEY
            }
        });

        return response.data;
    }
    catch (error) {
        throw new Error(error.message);
    }
}


const createCartPaymentTransaction = async (data) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_APP_API_URL}/cart/payment`, { data }, {
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': import.meta.env.VITE_APP_ACCESS_KEY
            }
        });

        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
};

const updateCartPaymentTransaction = async (data) => {
    try {
        const response = await axios.put(`${import.meta.env.VITE_APP_API_URL}/cart/handle_payment`, data, {
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': import.meta.env.VITE_APP_ACCESS_KEY
            }
        });

        return response.data;
    }
    catch (error) {
        throw new Error(error.message);
    }
}

const handleFreeEvent = async (user, data, members) => {
    try {
        const response = await axios.put(`${import.meta.env.VITE_APP_API_URL}/cart/handle_free_event`, { user, data, members }, {
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': import.meta.env.VITE_APP_ACCESS_KEY
            }
        });

        return response.data;
    }
    catch (error) {
        throw new Error(error);
    }
}

const updatePassPaymentTransaction = async (data) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_APP_API_URL}/basicreg/update-pass-purchase-payment`, data, {
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': import.meta.env.VITE_APP_ACCESS_KEY
            }
        });

        return response.data;
    }
    catch (error) {
        throw new Error(error.message);
    }
}

export {
    createInternalPaymentTransaction,
    updateInternalPaymentTransaction,
    createCartPaymentTransaction,
    updateCartPaymentTransaction,
    handleFreeEvent,
    updatePassPaymentTransaction
};