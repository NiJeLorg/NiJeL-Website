'use strict';
const User = require('../models/user'),
    nijelEmailDomain = 'nijel.org',
    jwt = require('jsonwebtoken'),
    envVar = require('dotenv').config().parsed;


module.exports = {
    signup: (req, res) => {
        let user = new User();

        if (req.body.email.substring((req.body.email.indexOf('@') + 1), (req.body.email.length)) === nijelEmailDomain) {
            user.email = req.body.email;
            user.password = req.body.password;

            user.save((err) => {
                if (!err) {
                    res.json({
                        success: true,
                        message: 'User successfully created'
                    });
                }
            });
        } else {
            res.send('Wrong Email!!');
        }

    },
    login: (req, res) => {
        User.findOne({
            email: req.body.email
        }).exec((err, user) => {
            if (!err) {
                if (!user) {
                    res.json({
                        success: false,
                        message: 'Authentication failed, User not found'
                    });
                } else if (user) {
                    let token = jwt.sign(user, envVar.SUPERSECRET, {
                        expiresIn: '2d'
                    });
                    res.json({
                        success: true,
                        user: user,
                        token: token
                    });
                }
            }
        });
    }
};
