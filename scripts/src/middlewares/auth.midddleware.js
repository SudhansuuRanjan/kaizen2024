// Middleware to check for API key
const checkApiKey = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    const validApiKey = process.env.ACCESS_KEY;

    if (!apiKey) {
        res.status(403).json({ error: 'Forbidden: API key is required' })
    } else if (apiKey === validApiKey) {
        next();
    } else {
        res.status(403).json({ error: 'Forbidden: Invalid API key' });
    }
};

module.exports = checkApiKey;