const jwt = require('jsonwebtoken'),
    envVar = require('dotenv').config().parsed;

module.exports = {
    authenticateUser: (req, res, next) => {
        let token = req.headers['x-access-token'] || req.body.token;
        if (token) {
            jwt.verify(token, envVar.SUPERSECRET, (err, decoded) => {
                if (!err) {
                    req.decoded = decoded;
                    next();
                } else {
                    res.json({
                        success: false,
                        message: 'Failed to authenticate token!'
                    });
                }
            });
        } else {
            res.status(403).json({
                success: false,
                message: 'No token provided'
            });
        }
    }
};
