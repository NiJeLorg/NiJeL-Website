'use strict';
const User = require('../models/user'),
    nijelEmailDomain = 'nijel.org',
    jwt = require('jsonwebtoken'),
    bcrypt = require('bcrypt-nodejs'),
    envVar = require('dotenv').config().parsed,
    emailCheck = require('email-check');


module.exports = {
    signup: (req, res) => {
        let user = new User();

        if (req.body.email.substring((req.body.email.indexOf('@') + 1), (req.body.email.length)) === nijelEmailDomain) {

            emailCheck(req.body.email)
                .then((response) => {
                    user.email = req.body.email;
                    user.password = req.body.password;

                    user.save((err) => {
                        if (!err) {
                            res.json({
                                success: true,
                                message: 'User successfully created'
                            });
                        } else {
                            if (err.code === 11000) {
                                res.json({
                                    success: false,
                                    message: 'A user with that email address already exists'
                                });
                            } else {
                                res.json({
                                    success: false,
                                    message: err
                                });
                            }
                        }
                    });
                })
                .catch((err) => {
                    if (err.message === 'refuse') {
                        res.status(401).json({
                            success: false,
                            message: 'Unauthorized Access! Provide a valid NiJeL email address'
                        });
                    }
                });

        } else {
            res.status(401).json({
                success: false,
                message: 'Unauthorized Access! Provide a valid NiJeL email address'
            });
        }

    },
    login: (req, res) => {
        User.findOne({
            email: req.body.email
        }).exec((err, user) => {
            if (!err) {
                if (!user) {
                    res.status(404).json({
                        success: false,
                        message: 'Authentication failed, User not found'
                    });
                } else {
                    bcrypt.compare(req.body.password, user.password, function (err, response) {
                        if (response) {
                            let token = jwt.sign(user, process.env.SUPERSECRET);
                            res.status(200).json({
                                success: true,
                                user: user,
                                token: token
                            });
                        } else {
                            res.status(401).json({
                                success: false,
                                message: 'Authorization Failed. Wrong Password!'
                            });
                        }
                    });

                }
            } else {
                throw err;
            }
        });
    }
};
