const QRCode = require('qrcode');
const supabase = require('../config');

async function generateAndUploadQRCode(text, fileName) {
    try {
        // Generate QR code as a Data URL
        const base64DataURL = await QRCode.toDataURL(text);

        // Remove the Data URL prefix to get the pure base64 string
        const base64String = base64DataURL.split(',')[1];

        // Decode the base64 string to get an ArrayBuffer
        const buffer = Buffer.from(base64String, 'base64');

        // Upload the buffer to Supabase storage
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

        // Return the public URL of the uploaded QR code
        return `https://qthpintkaihcmklahkwf.supabase.co/storage/v1/object/public/qrcodes/${fileName}`;
    } catch (err) {
        console.error('Error generating or uploading QR code:', err.message);
    }
}

module.exports = generateAndUploadQRCode;