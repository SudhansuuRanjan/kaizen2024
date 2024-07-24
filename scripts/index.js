const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const emailRoutes = require('./src/routes/email');
const sabpaisaRoutes = require('./src/routes/sabpaisa');
const internalPaymentRoutes = require('./src/routes/internalpayment');
const cartRoutes = require('./src/routes/cart');

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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/email', emailRoutes);
app.use('/sabpaisa', sabpaisaRoutes);
app.use('/internalpayment', internalPaymentRoutes);
app.use('/cart', cartRoutes);


app.get('/', (req, res) => {
    res.send({ message: 'Hello World!' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}🚀.`);
});


module.exports = app;