const express = require('express');
const { getUserEventCart, addEventsToPurchased, clearUserCart, createCartPaymentTransaction, getCartPaymentTransaction, updateCartPaymentTransaction } = require('../services/cart.service');
const checkApiKey = require('../middlewares/auth.midddleware');
const sendMail = require('../services/mail.service');
const { getTransactionDetailsFromSabpaisa } = require('../services/sabpaisa.service');

const router = express.Router();

router.get('/', checkApiKey, async (req, res) => {
    const { user_id } = req.query;
    try {
        const cart = await getUserEventCart('cart', user_id);
        res.status(200).json({ cart });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching cart', error: error.message });
    }
});

router.post('/process_cart', checkApiKey, async (req, res) => {
    const { user_id } = req.query;
    try {
        const cart = await getUserEventCart('cart', user_id);

        for (let i = 0; i < cart.length; i++) {
            await addEventsToPurchased(user_id, cart[i], cart[i].members);
        }

        await clearUserCart(user_id);

        res.status(200).json({ message: 'Cart processed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error processing cart', error: error.message });
    }
})

router.post('/payment', checkApiKey, async (req, res) => {
    const { data } = req.body;
    try {
        const response = await createCartPaymentTransaction(data);

        res.status(200).json({ message: 'Cart processed successfully', response });
    } catch (error) {
        res.status(500).json({ message: 'Error processing cart', error: error.message });
    }
})

router.put('/handle_payment', async (req, res) => {
    const { clientTxnId } = req.body;
    try {
        const paymentData = await getTransactionDetailsFromSabpaisa({ clientCode: 'AIIMSK', clientTxnId });

        if (paymentData.status !== 'SUCCESS') {
            return res.status(400).json({ message: 'Payment failed' });
        }

        const transaction = await getCartPaymentTransaction(clientTxnId);
        const cart = transaction[0].cart_data;

        if (cart.length === 0) {
            return res.status(400).json({ message: 'Cart is empty' });
        }

        for (let i = 0; i < cart.length; i++) {
            await addEventsToPurchased(transaction[0].user_id, cart[i], cart[i].members);
        }

        await Promise.all[
            clearUserCart(cart[0].self.user_id),
            sendMail(cart[0].self.email, {
                name: cart[0].self.name,
                kaizenid: cart[0].self.kaizenid,
                listofevents: cart.map((event) => event.events.name).join(', ')
            }, 'KDYM9E7XGKMV21MSN1H6KB5E07XB'),
            updateCartPaymentTransaction(clientTxnId, { status: 'SUCCESS', paymentData, mail_sent: true, payment_verified: true })
        ];

        console.log('Cart processed successfully');

        res.status(200).json({ message: 'Cart processed successfully', status: 'SUCCESS' });
    } catch (error) {
        res.status(500).json({ message: 'Error processing cart', error: error.message, status: 'FAILED' });
    }
})

module.exports = router;