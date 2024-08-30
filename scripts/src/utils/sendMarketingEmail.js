const readCSV = require('./readcsv');
const { sendMail } = require('../services/mail.service');


const sendMarketingEmail = async (template) => {
    try {
        const data = await readCSV('data1.csv');
        for (let i = 1770; i < data.length; i++) {
            let { Email } = data[i];
            console.log(i + 1, ' Sending marketing email to:', Email, ' with template:', template);
            await sendMail(Email, {}, template);
        }
    } catch (error) {
        console.error('Error sending marketing email:', error.message);
    }
}


sendMarketingEmail('7JX2DWVC0AM8V4KQCRSXJE95QGWW');