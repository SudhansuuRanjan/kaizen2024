const express = require('express');
const { sendMail, getMailQueue, updateMailQueue } = require('../services/mail.service');
const checkApiKey = require('../middlewares/auth.midddleware');
const generateAndUploadQRCode = require('../services/qr.service');

const router = express.Router();

// Send confirmation email
router.post('/internal-payment-confirmation', checkApiKey, async (req, res) => {
    const { email, name, tid, amount } = req.body;
    const template = process.env.INTERNAL_COLLECTION;
    const data = {
        name,
        email,
        tid,
        amount
    }
    try {
        await sendMail(email, data, template);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error sending email', error: error.message });
    }
})

router.post('/process-mail-queue', async (req, res) => {
    try {
        const mailQueue = await getMailQueue();

        if (mailQueue.length === 0) {
            return res.status(200).json({ message: 'No emails in queue' });
        }

        for (let i = 0; i < mailQueue.length; i++) {
            let { email, data, templateid } = mailQueue[i];
            data.qrurl = await generateAndUploadQRCode(data.brid, `${data.brid}.png`);
            await sendMail(email, data, templateid);
            await updateMailQueue(mailQueue[i].id, { sent: true });
        }

        res.status(200).json({ message: 'Emails sent successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error generating QR code', error: error.message });
    }
})


module.exports = router;


