const { getTransactionDetailsFromSabpaisa } = require("../services/sabpaisa.service");
const express = require('express');
const checkApiKey = require('../middlewares/auth.midddleware');
const { getInternalTransactions } = require('../services/internaltxn.service');
const { updateInternalTransaction } = require('../services/internaltxn.service');
const sendEmail = require('../services/mail.service');

const router = express.Router();

router.post('/verifytransactions', checkApiKey, async (req, res) => {
    const paymentData = [];
    const expectedData = [];
    const result = [];
    const { clientCode } = req.body;
    try {
        const data = await getInternalTransactions('internalpayments');

        for (let i = 0; i < data.length; i++) {
            if (data[i].paymentData) {
                paymentData.push(data[i].paymentData);
                try {
                    const txnDetails = await getTransactionDetailsFromSabpaisa({ clientCode, clientTxnId: data[i].txnid });
                    let currResult = {
                        txnid: data[i].txnid,
                        amount: data[i].amount,
                        status: data[i].status,
                        expectedStatus: txnDetails.status,
                    }

                    if (data[i].status === txnDetails.status) {
                        console.log('Transaction already verified');
                    } else if (data[i].status !== 'SUCCESS' && txnDetails.status === 'SUCCESS') {
                        await updateInternalTransaction('internalpayments', data[i].txnid, { paymentVerified: true, status: 'SUCCESS', paymentData: txnDetails });
                        // send email
                        const emailData = {
                            email: data[i].email,
                            name: data[i].name,
                            amount: data[i].amount,
                            tid: data[i].txnid,
                        }
                        await sendEmail(emailData.email, emailData, process.env.INTERNAL_COLLECTION);
                        console.log('Transaction Updated and Email sent');
                    } else if (txnDetails.status !== data[i].status) {
                        await updateInternalTransaction('internalpayments', data[i].txnid, { paymentVerified: true, status: txnDetails.status, paymentData: txnDetails });
                        console.log('Transaction Updated');
                    }

                    result.push(currResult);
                } catch (error) {
                    expectedData.push({ error: 'Error fetching payment details', txnid: data[i].txnid });
                }
            }
        }
        res.send({ result });
    } catch (error) {
        res.status(500).send({ message: 'Error fetching payment data', error });
    }
});


module.exports = router;