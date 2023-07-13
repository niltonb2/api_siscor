const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    if (req.path == '/usuarios/save' || req.path == '/usuarios/login' || req.path == '/' || req.path == '/checkout/transaction')
        return next();

    const auth = req.headers.authorization;

    if (!auth)
        return res.status(400).json({ info: 'O token não foi informado!' });

    const partsAuth = auth.split(' ');

    if (partsAuth.length != 2)
        return res.status(400).json({ info: 'Erro na validação do token!' });

    const [title, token] = partsAuth;

    if (!/^Bearer$/i.test(title))
        return res.status(400).json({ info: 'Token em formato inválido!' });

    jwt.verify(token, process.env.JWTSecret, (error, decoded) => {
        if (error) return res.status(400).json({ info: 'Token inválido!' });
        res.usuarioId = decoded.id;
        return next();
    })
};