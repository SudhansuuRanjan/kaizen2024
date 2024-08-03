const { getPromoCode, createPassPurchasePayment, createPass, updatePassPurchasePayment, getPassPurchasePayment } = require('../services/basicreg.service');
const generateRandomID = require('../utils/randomId');
const express = require('express');
const router = express.Router();
const checkApiKey = require('../middlewares/auth.midddleware');
const price = 5;
const groupDiscountReqMembers = 10;
const { bulkAddtoMailQueue } = require('../services/mail.service');
const { getTransactionDetailsFromSabpaisa } = require('../services/sabpaisa.service');



router.post("/check-promo-code", checkApiKey, async (req, res) => {
    const { code, persons } = req.body;

    if (!code || !persons) {
        return res.status(400).json({
            message: "Please send required parameters"
        });
    }

    try {
        const data = await getPromoCode(code);

        if (!data || data.length === 0) {
            return res.status(404).json({
                message: "Promo code does not exist!"
            });
        }

        const promocode = data[0];

        if (new Date(promocode.expires) < new Date()) {
            return res.status(400).json({
                message: "Promo code expired!"
            });
        }

        if (promocode.num_of_persons > persons.length) {
            return res.status(400).json({
                message: `Add at least ${promocode.num_of_persons} attendees to avail this promo code.`
            });
        }

        const total = persons.length * price;
        const discountAmount = (total * promocode.discount) / 100;
        const totalAmountAfterDiscount = (total - discountAmount).toFixed(0);

        res.status(200).json({
            message: `Promo code applied! You have got a discount of ${promocode.discount}%`,
            status: 'success',
            discount: promocode.discount,
            total,
            totalAmountAfterDiscount
        });

    } catch (error) {
        console.error('Error in /check-promo-code:', error);
        res.status(500).json({
            message: 'Error applying Promo Code.'
        });
    }
});


router.post("/create-pass-purchase-payment", checkApiKey, async (req, res) => {
    const { clientTxnId, members, coupon_code, user } = req.body;

    if (!clientTxnId || !members || !user) {
        return res.status(400).json({
            message: "Please send required parameters"
        });
    }

    const totalAmount = members.length * price;
    let discountAmount = 0;

    // apply 10% discount if group has 10 or more members
    if (members.length > groupDiscountReqMembers) {
        discountAmount = (totalAmount * 10) / 100;
    }

    if (coupon_code) {
        const promoCodeData = await getPromoCode(coupon_code);

        if (!promoCodeData || promoCodeData.length === 0) {
            return res.status(404).json({
                message: "Promo code does not exist!"
            });
        }

        const promocode = promoCodeData[0];

        if (new Date(promocode.expires) < new Date()) {
            return res.status(400).json({
                message: "Promo code expired!"
            });
        }

        if (promocode.num_of_persons > members.length) {
            return res.status(400).json({
                message: `Add at least ${promocode.num_of_persons} attendees to avail this promo code.`
            });
        }

        discountAmount = (totalAmount * promocode.discount) / 100;
    }



    const data = {
        clientTxnId,
        members_data: members,
        coupon_code,
        amount: totalAmount,
        finalAmount: Math.round(discountAmount > 0 ? totalAmount - discountAmount : totalAmount),
        email: user.email,
        name: user.name,
        user_id: user.id,
        num_of_members: members.length,
    }

    try {
        await createPassPurchasePayment(data);

        res.status(200).json({
            message: 'Pass purchase payment created successfully!',
            status: 'success',
            data
        });

    } catch (error) {
        console.error('Error in /create-pass-purchase-payment:', error);
        res.status(500).json({
            message: 'Error creating pass purchase payment transaction.'
        });
    }
})

router.post("/update-pass-purchase-payment", checkApiKey, async (req, res) => {
    const { clientTxnId } = req.body;

    if (!clientTxnId) {
        return res.status(400).json({
            message: "Please send required parameters"
        });
    }

    try {
        const data = await getPassPurchasePayment(clientTxnId);

        const sabpaisaResponse = await getTransactionDetailsFromSabpaisa({ clientCode: 'AIIMSK', clientTxnId });

        if (!sabpaisaResponse) {
            res.status(400).json({ message: 'Transaction not found in Sabpaisa' });
        } else if (sabpaisaResponse.status === 'SUCCESS') {
            await updatePassPurchasePayment(clientTxnId, {
                ...data,
                paymentData: sabpaisaResponse,
                paymentVerified: true,
                status: sabpaisaResponse.status
            });

            let members = data.members_data;
            members = members.map(member => {
                return {
                    ...member,
                    brid: generateRandomID(),
                    registration_mode: 'online',
                    parent_user_id: data.user_id,
                }
            });

            await createPass(members);

            const emailData = members.map((member) => {
                return {
                    email: member.email,
                    templateid: 'JT3V640FK7MBKCGH8TWPDDBBGA6X',
                    name: member.name,
                    service: 'brpass',
                    data: {
                        name: member.name,
                        qrurl: '',
                        brid: member.brid,
                    }
                }
            })

            await bulkAddtoMailQueue(emailData);

            res.status(200).json({
                message: 'Pass purchase payment updated successfully!',
                status: 'success',
                data
            });
        } else {
            // update transaction status to failure
            await updateInternalTransaction('internalpayments', txnid, { status: sabpaisaResponse.status, paymentData: sabpaisaResponse, paymentVerified: false });
            return res.status(400).json({ message: 'Transaction not successful', status: sabpaisaResponse.status });
        }
    } catch (error) {
        console.error('Error in /update-pass-purchase-payment:', error);
        res.status(500).json({
            message: 'Error updating pass purchase payment transaction.'
        });
    }
})

module.exports = router;
