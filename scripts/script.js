const generateAndUploadQRCode = require("./src/services/qr.service");

const responses = [];

// Generate and upload QR codes
const generateQRCode = async (text, fileName) => {
    const response = await generateAndUploadQRCode(text, fileName);
    responses.push(response);
};

const generateAllQRCodes = async () => {
    for (let index = 0; index < 10; index++) {
        await generateQRCode(`https://example.com/${index}`, `qr-code-${index}.png`);
    }

    console.log(responses);
};

generateAllQRCodes();
