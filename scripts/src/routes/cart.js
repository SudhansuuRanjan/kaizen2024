const express = require('express');
const { getUserEventCart, addEventsToPurchased, clearUserCart, createCartPaymentTransaction, getCartPaymentTransaction, updateCartPaymentTransaction, addFreeEventToPurchased, getFreeEventFromProfile, getNonVerifiedCartPaymentTransactions } = require('../services/cart.service');
const checkApiKey = require('../middlewares/auth.midddleware');
const { bulkAddtoMailQueue } = require('../services/mail.service');
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

        res.status(200).json({ message: 'Cart transaction created successfully', response });
    } catch (error) {
        res.status(500).json({ message: 'Error processing cart', error: error.message });
    }
})

router.put("/handle_free_event", checkApiKey, async (req, res) => {
    const { user, data, members } = req.body;
    try {
        if (data.price > 0) {
            return res.status(400).json({ message: 'Event is not free' });
        }

        // check if user has already registered for the event
        const existingEvent = await getFreeEventFromProfile(user.user_id, data.event_id);
        if (existingEvent.length > 0) {
            return res.status(400).json({ message: 'You are already registered in this event.' })
        }

        await addFreeEventToPurchased(user, data, members);
        const [response] = await getFreeEventFromProfile(user.user_id, data.event_id);

        if (!response) {
            return res.status(400).json({ message: 'Event not found' });
        }

        const emailData = response.cart.purchased_events_members.map((member) => {
            return {
                email: member.profiles.email,
                templateid: 'KDYM9E7XGKMV21MSN1H6KB5E07XB',
                name: member.profiles.name,
                service: 'event-registration',
                data: {
                    name: member.profiles.name,
                    kaizenid: member.profiles.kaizenid,
                    listofevents: response.cart.events.name
                }
            };
        });

        await bulkAddtoMailQueue(emailData);
        res.status(200).json({ message: 'Event registered successfully', response });
    } catch (error) {
        res.status(500).json({ message: 'Error processing cart', error: error.message });
    }
})

router.put('/handle_payment', checkApiKey, async (req, res) => {
    const { clientTxnId } = req.body;
    try {
        const paymentData = await getTransactionDetailsFromSabpaisa({ clientCode: 'AIIMSK', clientTxnId });

        if (!paymentData) {
            console.log({ message: 'Transaction not found in Sabpaisa' });
            res.status(400).json({ message: 'Transaction not found in Sabpaisa' });
        }

        if (paymentData.status !== 'SUCCESS') {
            console.log({ message: 'Payment failed' });
            return res.status(400).json({ message: 'Payment failed' });
        }

        const transaction = await getCartPaymentTransaction(clientTxnId);

        if (transaction[0].paymentVerified) {
            console.log({ message: 'Transaction already verified', status: transaction[0].status });
            res.status(200).json({ message: 'Transaction already verified', status: sabpaisaResponse.status });
        }

        const cart = transaction[0].cart_data;

        if (cart.length === 0) {
            return res.status(400).json({ message: 'Cart is empty' });
        }

        for (let i = 0; i < cart.length; i++) {
            await addEventsToPurchased(transaction[0].user_id, cart[i], cart[i].members);
        }

        const userEventRegistrations = [];

        for (let i = 0; i < cart.length; i++) {
            let cartItem = cart[i];
            const members = cartItem.members;

            // Ensure members array exists and is not empty
            if (members && members.length > 0) {
                for (let j = 0; j < members.length; j++) {
                    const profile = members[j].profiles;
                    const event = cartItem.events;

                    // Ensure profiles and event objects exist
                    if (profile && event) {
                        const existingMember = userEventRegistrations.find((user) => user.email === profile.email);
                        if (existingMember) {
                            existingMember.registeredEvents.push(event.name);
                        } else {
                            userEventRegistrations.push({
                                name: profile.name,
                                email: profile.email,
                                registeredEvents: [event.name],
                                kaizenid: profile.kaizenid
                            });
                        }
                    }
                }
            }
        }

        const emailData = userEventRegistrations.map((member) => {
            return {
                email: member.email,
                templateid: 'KDYM9E7XGKMV21MSN1H6KB5E07XB',
                name: member.name,
                service: 'event-registration',
                data: {
                    name: member.name,
                    kaizenid: member.kaizenid,
                    listofevents: member.registeredEvents.join(', ')
                }
            };
        });

        await Promise.all([
            clearUserCart(cart[0].self.user_id),
            bulkAddtoMailQueue(emailData),
            updateCartPaymentTransaction(clientTxnId, { status: 'SUCCESS', paymentData, mail_sent: true, payment_verified: true })
        ]);

        res.status(200).json({ message: 'Cart processed successfully', status: 'SUCCESS' });
    } catch (error) {
        res.status(500).json({ message: 'Error processing cart', error: error.message, status: 'FAILED' });
    }
})

router.post('/verify-cart-payment', checkApiKey, async (req, res) => {
    try {
        // get transactions from db where paymentVerified is false 
        const transactions = await getNonVerifiedCartPaymentTransactions();

        if (!transactions || transactions.length === 0) {
            return res.status(200).json({
                message: 'No unverified payments found!'
            });
        }

        for (let i = 0; i < transactions.length; i++) {
            const transaction = transactions[i];
            const { clientTxnId } = transaction;

            const paymentData = await getTransactionDetailsFromSabpaisa({ clientCode: 'AIIMSK', clientTxnId });

            if (!paymentData) {
                await updateCartPaymentTransaction(clientTxnId, { status: 'NOT_FOUND', paymentData, payment_verified: true, mail_sent: false });
                // console.log({ message: 'Transaction not found in Sabpaisa' });
                continue;
            }

            if (paymentData.status !== 'SUCCESS') {
                await updateCartPaymentTransaction(clientTxnId, { status: paymentData.status, paymentData, payment_verified: true, mail_sent: false });
                // console.log({ message: 'Payment failed' });
                continue;
            }

            const cart = transaction.cart_data;

            if (cart.length === 0) {
                await updateCartPaymentTransaction(clientTxnId, { status: 'FAILED', paymentData, payment_verified: true, mail_sent: false });
                // console.log({ message: 'Cart is empty' });
                continue;
            }

            for (let i = 0; i < cart.length; i++) {
                await addEventsToPurchased(transaction.user_id, cart[i], cart[i].members);
            }

            const userEventRegistrations = [];

            for (let i = 0; i < cart.length; i++) {
                let cartItem = cart[i];
                const members = cartItem.members;

                // Ensure members array exists and is not empty
                if (members && members.length > 0) {
                    for (let j = 0; j < members.length; j++) {
                        const profile = members[j].profiles;
                        const event = cartItem.events;

                        // Ensure profiles and event objects exist
                        if (profile && event) {
                            const existingMember = userEventRegistrations.find((user) => user.email === profile.email);
                            if (existingMember) {
                                existingMember.registeredEvents.push(event.name);
                            } else {
                                userEventRegistrations.push({
                                    name: profile.name,
                                    email: profile.email,
                                    registeredEvents: [event.name],
                                    kaizenid: profile.kaizenid
                                });
                            }
                        }
                    }
                }
            }

            const emailData = userEventRegistrations.map((member) => {
                return {
                    email: member.email,
                    templateid: 'KDYM9E7XGKMV21MSN1H6KB5E07XB',
                    name: member.name,
                    service: 'event-registration',
                    data: {
                        name: member.name,
                        kaizenid: member.kaizenid,
                        listofevents: member.registeredEvents.join(', ')
                    }
                };
            });

            try {
                await Promise.all([
                    clearUserCart(cart[0].self.user_id),
                    bulkAddtoMailQueue(emailData),
                    updateCartPaymentTransaction(clientTxnId, { status: 'SUCCESS', paymentData, mail_sent: true, payment_verified: true })
                ]);

            } catch (error) {
                // console.log({ message: 'Error processing cart', error: error.message });
                continue;
            }
        }

        res.status(200).json({ message: 'Cart processed successfully', status: 'SUCCESS' });
    } catch (error) {
        res.status(500).json({ message: 'Error processing cart', error: error.message, status: 'FAILED' });
    }
})

module.exports = router;