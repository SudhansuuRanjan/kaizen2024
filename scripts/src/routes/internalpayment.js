const express = require('express');
const { getInternalTransactions, deleteInternalTransaction, createInternalTransaction, getInternalTransaction, updateInternalTransaction } = require('../services/internaltxn.service');
const checkApiKey = require('../middlewares/auth.midddleware');
const { getTransactionDetailsFromSabpaisa } = require('../services/sabpaisa.service');
const { sendMail } = require('../services/mail.service');

const router = express.Router();

// Create a new internal transaction
router.post('/', checkApiKey, async (req, res) => {
    const { txnid, amount, name, email, address, phone, designation, department } = req.body;
    const data = { txnid, amount, name, email, address, phone, designation, department };
    try {
        const result = await createInternalTransaction('internalpayments', data);
        res.status(200).json({ message: 'Transaction created successfully', result });
    } catch (error) {
        res.status(500).json({ message: 'Error creating transaction', error: error.message });
    }
})

// Update an internal transaction
router.put('/update', checkApiKey, async (req, res) => {
    const { txnid } = req.body;
    try {
        const data = await getInternalTransaction('internalpayments', txnid);
        if (data.length === 0) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        const sabpaisaResponse = await getTransactionDetailsFromSabpaisa({ clientCode: 'AIIMSK', clientTxnId: txnid });

        if (!sabpaisaResponse) {
            res.status(400).json({ message: 'Transaction not found in Sabpaisa' });
        } else if (data[0].paymentVerified) {
            res.status(200).json({ message: 'Transaction already verified', status: sabpaisaResponse.status });
        } else if (sabpaisaResponse.status === 'SUCCESS') {
            // send email
            const emailData = {
                email: data[0].email,
                name: data[0].name,
                amount: data[0].amount,
                tid: data[0].txnid,
            }
            await sendMail(emailData.email, emailData, process.env.INTERNAL_COLLECTION);
            // update transaction status to success
            await updateInternalTransaction('internalpayments', txnid, { status: sabpaisaResponse.status, paymentData: sabpaisaResponse, paymentVerified: true, mail_sent: true });
            return res.status(200).json({ message: 'Transaction updated successfully', status: sabpaisaResponse.status });
        } else {
            // update transaction status to failure
            await updateInternalTransaction('internalpayments', txnid, { status: sabpaisaResponse.status, paymentData: sabpaisaResponse, paymentVerified: false });
            return res.status(400).json({ message: 'Transaction not successful', status: sabpaisaResponse.status });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error updating transaction', error });
    }
})

// Get all internal transactions
router.get('/', checkApiKey, async (req, res) => {
    try {
        const data = await getInternalTransactions('internalpayments');
        res.status(200).json({ data });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching transactions', error: error.message });
    }
})

// Delete an internal transaction
router.delete('/delete', checkApiKey, async (req, res) => {
    const { txnid } = req.body;
    try {
        const data = await deleteInternalTransaction('internalpayments', txnid);
        res.status(200).json({ message: 'Transaction deleted successfully', data });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting transaction', error: error.message });
    }
})


module.exports = router;