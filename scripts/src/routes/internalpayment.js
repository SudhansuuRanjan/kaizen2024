const express = require('express');
const { getInternalTransactions, deleteInternalTransaction, createInternalTransaction, getInternalTransaction, updateInternalTransaction } = require('../services/internaltxn.service');
const checkApiKey = require('../middlewares/auth.midddleware');
const { getTransactionDetailsFromSabpaisa } = require('../services/sabpaisa.service');

const router = express.Router();

// Create a new internal transaction
router.post('/', checkApiKey, async (req, res) => {
    const { txnid, amount, name, email, address, phone, designation } = req.body;
    const data = { txnid, amount, name, email, address, phone, designation };
    try {
        const result = await createInternalTransaction('internalpayments', data);
        res.status(200).json({ message: 'Transaction created successfully', result });
    } catch (error) {
        res.status(500).json({ message: 'Error creating transaction', error: error.message });
    }
})

// Update an internal transaction
router.put('/update', checkApiKey, async (req, res) => {
    const { txnid, status, paymentData } = req.body;
    try {
        const data = await getInternalTransaction('internalpayments', txnid);
        if (data.length === 0) {
            res.status(404).json({ message: 'Transaction not found' });
        } else {
            const sabpaisaResponse = await getTransactionDetailsFromSabpaisa({ clientCode: 'AIIMS', clientTxnId: txnid });
            if (!sabpaisaResponse) {
                res.status(400).json({ message: 'Transaction not found in Sabpaisa' });
            } else if (sabpaisaResponse.status !== 'SUCCESS') {
                res.status(400).json({ message: 'Transaction Failed' });
            }
            const result = await updateInternalTransaction('internalpayments', txnid, { status, paymentData, paymentVerified: true });
            res.status(200).json({ message: 'Transaction updated successfully', result });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating transaction', error: error.message });
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