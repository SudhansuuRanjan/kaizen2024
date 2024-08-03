const { getTransactionDetailsFromSabpaisa } = require("../services/sabpaisa.service");
const express = require('express');
const checkApiKey = require('../middlewares/auth.midddleware');
const { getInternalNonVerifiedTransactions } = require('../services/internaltxn.service');
const { updateInternalTransaction } = require('../services/internaltxn.service');
const { sendMail } = require('../services/mail.service');

const router = express.Router();

router.post('/verifytransactions', checkApiKey, async (req, res) => {
    const paymentData = [];
    const expectedData = [];
    const result = [];
    const { clientCode } = req.body;
    try {
        const data = await getInternalNonVerifiedTransactions('internalpayments');

        for (let i = 0; i < data.length; i++) {
            paymentData.push(data[i].paymentData);
            try {
                const txnDetails = await getTransactionDetailsFromSabpaisa({ clientCode, clientTxnId: data[i].txnid });

                const currResult = {
                    txnid: data[i].txnid,
                    expected: txnDetails.status,
                    status: data[i].status,
                    paymentVerified: data[i].paymentVerified,
                    mail_sent: data[i].mail_sent,
                };

                if (data[i].status === txnDetails.status) {
                    await updateInternalTransaction('internalpayments', data[i].txnid, { paymentVerified: true });
                    console.log('Transaction already verified');
                } else if (data[i].status !== 'SUCCESS' && txnDetails.status === 'SUCCESS') {
                    await updateInternalTransaction('internalpayments', data[i].txnid, { paymentVerified: true, status: 'SUCCESS', paymentData: txnDetails, mail_sent: true });
                    // send email
                    const emailData = {
                        email: data[i].email,
                        name: data[i].name,
                        amount: data[i].amount,
                        tid: data[i].txnid,
                    };
                    await sendMail(emailData.email, emailData, process.env.INTERNAL_COLLECTION);
                    console.log('Transaction Updated and Email sent');
                } else if (txnDetails.status !== data[i].status) {
                    await updateInternalTransaction('internalpayments', data[i].txnid, { paymentVerified: true, status: txnDetails.status, paymentData: txnDetails });
                    console.log('Transaction Updated');
                }

                result.push(currResult);
            } catch (error) {
                expectedData.push({ error: 'Error fetching payment details', txnid: data[i].txnid });
                await updateInternalTransaction('internalpayments', data[i].txnid, { paymentVerified: true });
            }
        }

        res.send({ data }); // send both result and expectedData
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Error fetching payment data', error });
    }
});


router.post('/transaction', checkApiKey, async (req, res) => {
    const { txnid } = req.body;
    try {
        const data = await getTransactionDetailsFromSabpaisa({ clientCode: 'AIIMSK', clientTxnId: txnid });
        res.status(200).json({ data });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching transaction', error: error.message });
    }
})

module.exports = router;