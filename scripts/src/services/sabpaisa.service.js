const crypto = require('crypto');
const querystring = require('querystring');
const axios = require('axios');

const algorithm = "aes-128-cbc";
const authKey = process.env.AUTH_KEY;
const authIV = process.env.AUTH_IV;

function encrypt(text) {
    let cipher = crypto.createCipheriv(algorithm, Buffer.from(authKey), authIV);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return encrypted.toString("base64");
}

function decrypt(text) {
    let decipher = crypto.createDecipheriv(
        algorithm,
        Buffer.from(authKey),
        authIV
    );
    let decrypted = decipher.update(Buffer.from(text, "base64"));
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}

const getTransactionDetailsFromSabpaisa = async (data) => {
    try {
        const realQuery = querystring.stringify(data);
        const result = await axios.post('https://txnenquiry.sabpaisa.in/SPTxtnEnquiry/getTxnStatusByClientxnId', {
            clientCode: data.clientCode,
            statusTransEncData: encrypt(realQuery)
        });

        const decryptedData = decrypt(result.data.statusResponseData);

        return querystring.parse(decryptedData);
    } catch (error) {
        throw new Error(error.message);
    }
}


module.exports = { getTransactionDetailsFromSabpaisa };
