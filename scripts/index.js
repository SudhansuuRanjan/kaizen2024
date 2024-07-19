import express from 'express';
import cors from 'cors';
import axios from 'axios';
import querystring from 'querystring';
import crypto from 'crypto';

const PORT = process.env.PORT || 3001;
const app = express();

const allowedOrigins = [
    'http://localhost:5173',
    'https://kaizenaiims.com',
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);

        if (allowedOrigins.indexOf(origin) === -1) {
            var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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

// Middleware to check for API key
const checkApiKey = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    const validApiKey = process.env.ACCESS_KEY;

    if (apiKey && apiKey === validApiKey) {
        next();
    } else {
        res.status(403).json({ error: 'Forbidden: Invalid API key' });
    }
};

app.get('/', (req, res) => {
    res.send({ message: 'Hello World!' });
});

app.post('/getpaymentdetails', checkApiKey, async (req, res) => {
    const { clientTxnId, clientCode } = req.body;
    const realQuery = querystring.stringify({ clientTxnId, clientCode });
    console.log(realQuery);

    try {
        const result = await axios.post('https://txnenquiry.sabpaisa.in/SPTxtnEnquiry/getTxnStatusByClientxnId', {
            clientCode,
            statusTransEncData: encrypt(realQuery)
        });

        const decryptedData = decrypt(result.data.statusResponseData);

        res.send({ clientCode: result.data.clientCode, decryptedData: querystring.parse(decryptedData) });
    } catch (error) {
        console.error('Error fetching payment details:', error);
        res.status(500).send({ error: 'Error fetching payment details' });
    }
});

// send alumni mail 
app.post("/api/confirmation-email", checkApiKey, async (req, res) => {
    const person = req.body;
    // console.log(people);

    const courier_options = {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + process.env.COURIER_API_KEY,
        },
        body: JSON.stringify({
            message: {
                to: {
                    email: person.email,
                },
                template: process.env.INTERNAL_COLLECTION,
                data: {
                    name: person.name,
                    email: person.email,
                    tid: person.tid,
                    amount: person.amount,
                },
                routing: {
                    method: "all",
                    channels: ["email"],
                },
            },
        }),
    };

    try {
        await fetch("https://api.courier.com/send", courier_options);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

    res.status(200).json({ message: "Mail Sent" });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}🚀.`);
});
