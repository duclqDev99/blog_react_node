const jwt = require('jsonwebtoken');
const { secretKey } = require('../config/auth.config');

const verifyToken = async (req, res, next) => {
    try {
        const token = req.header('Authorization');
        if (!token) {
            return res.status(401).json({ error: 'Token không được cung cấp' });
        }
        jwt.verify(token, secretKey, (err, user) => {
            if (err) {
                return res.status(403).json({ error: 'Token không hợp lệ' });
            }
            req.user = user;
            next();
        });
    } catch (error) {
        console.log('error:', error);
    }
};

module.exports = { verifyToken };