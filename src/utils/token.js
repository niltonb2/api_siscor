const jwt = require('jsonwebtoken');

module.exports = {
    generate(id) {
        return jwt.sign(id, process.env.JWTSecret, { expiresIn: 86400 });
    }
};