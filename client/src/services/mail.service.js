import axios from 'axios';

const sendConfirmationEmail = async (email, name, tid, amount) => {
    const emailData = {
        email,
        name,
        tid,
        amount
    }
    try {
        const response = await axios.post(`${import.meta.env.VITE_APP_MAILER_API_URL}/api/confirmation-email`, emailData, {
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': import.meta.env.VITE_APP_MAIL_ACCESS_KEY
            }
        });
        console.log('Response:', response.data);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};


export { sendConfirmationEmail };