module.exports = (req, res, next) => {

    if (!req.headers.api_key)
        return res.status(400).json({ info: 'A API_KEY não foi informada!' });

    if (req.headers.api_key != process.env.API_KEY)
        return res.status(400).json({ info: 'A API_KEY está incorreta!' });

    if (!req.headers.marketplace_id)
        return res.status(400).json({ info: 'A MARKETPLACE_ID não foi informado!' });

    return next();
}