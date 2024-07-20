const express = require('express');
const sendMail = require('../services/mail.service');
const checkApiKey = require('../middlewares/auth.midddleware');

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


module.exports = router;


