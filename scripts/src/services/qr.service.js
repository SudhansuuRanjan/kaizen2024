// generateAndUploadQRCode.js
const QRCode = require('qrcode');
const supabase = require('../config');
const stream = require('stream');

async function generateAndUploadQRCode(text, fileName) {
    try {
        // Create a readable stream from the QR code
        const qrStream = new stream.PassThrough();
        QRCode.toFileStream(qrStream, text);
        const buffer = await qrStream.toArray();
        // Upload the stream to Supabase storage
        const { data, error } = await supabase.storage
            .from('qrcodes')
            .upload(`${fileName}`, buffer, {
                cacheControl: '3600',
                upsert: true,
                contentType: 'image/png'
            });

        if (error) {
            throw error;
        }

        return `https://qthpintkaihcmklahkwf.supabase.co/storage/v1/object/public/qrcodes/${fileName}`;
    } catch (err) {
        console.error('Error generating or uploading QR code:', err.message);
    }
}

module.exports = generateAndUploadQRCode;
