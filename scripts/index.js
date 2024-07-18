const PORT = process.env.PORT || 4000;
import express from 'express';
import cors from 'cors';

const app = express();

const allowedOrigins = [
    'https://kaizen-admin.vercel.app',
    'http://localhost:5173',
    'https://kaizenaiims.com',
    "http://localhost:4000"
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get('/', (req, res) => {
    res.send({ message: 'Hello World!' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});