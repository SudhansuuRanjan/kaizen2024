import axios from 'axios';

export const applyPromoCode = async (code, persons) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_APP_API_URL}/basicreg/check-promo-code`, { code, persons }, {
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': import.meta.env.VITE_APP_ACCESS_KEY
            }
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}

export const createPassTransaction = async (txnId, peoples, promoCode, user) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_APP_API_URL}/basicreg/create-pass-purchase-payment`, {
            clientTxnId: txnId,
            members: peoples,
            coupon_code: promoCode,
            user
        }, {
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': import.meta.env.VITE_APP_ACCESS_KEY
            }
        })

        console.log(response.data);

        return response.data;
    } catch (error) {
        throw error;
    }
}