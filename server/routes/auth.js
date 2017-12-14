const express = require('express'),
    request = require('request'),
    jwt = require('jwt-simple');
    moment = require('moment'),
    User = require('../models/user');

module.exports = (app) => {
    const createJWT = (user) => {
        let payload = {
            sub: user._id,
            iat: moment().unix(),
            exp: moment().add(14, 'days').unix()
        };
        return jwt.encode(payload, process.env.SUPERSECRET);
    };
    app.post('/auth/google', function (req, res) {
        let accessTokenUrl = 'https://accounts.google.com/o/oauth2/token';
        let peopleApiUrl = 'https://www.googleapis.com/plus/v1/people/me/openIdConnect';
        let params = {
            code: req.body.code,
            client_id: req.body.clientId,
            client_secret: process.env.GOGGLE_CLIENT_SECRET,
            redirect_uri: req.body.redirectUri,
            grant_type: 'authorization_code'
        };
        // Step 1. Exchange authorization code for access token.
        request.post(accessTokenUrl, {json: true, form: params}, function (err, response, token) {
            let accessToken = token.access_token;
            let headers = {Authorization: 'Bearer ' + accessToken};

            // Step 2. Retrieve profile information about the current user.
            request.get({url: peopleApiUrl, headers: headers, json: true}, function (err, response, profile) {
                if (profile.error) {
                    return res.status(500).send({message: profile.error.message});
                }
                // Step 3a. Link user accounts.
                if (req.header('Authorization')) {
                    User.findOne({ google: profile.sub }, function(err, existingUser) {
                        if (existingUser) {
                            return res.status(409).send({ message: 'There is already a Google account that belongs to you' });
                        }
                        var token = req.header('Authorization').split(' ')[1];
                        var payload = jwt.decode(token,  process.env.GOGGLE_CLIENT_SECRET);
                        User.findById(payload.sub, function(err, user) {
                            if (!user) {
                                return res.status(400).send({ message: 'User not found' });
                            }
                            user.google = profile.sub;
                            user.email =  profile.email;
                            user.displayName = user.displayName || profile.name;
                            user.save(function() {
                                var token = createJWT(user);
                                res.send({ token: token });
                            });
                        });
                    });
                } else {
                    // Step 3b. Create a new user account or return an existing one.
                    User.findOne({ google: profile.sub }, function(err, existingUser) {
                        if (existingUser) {
                            return res.send({ token: createJWT(existingUser) });
                        }
                        var user = new User();
                        user.google = profile.sub;
                        user.email =  profile.email;
                        user.displayName = profile.name;
                        user.save(function(err) {
                            var token = createJWT(user);
                            res.send({ token: token });
                        });
                    });
                }

            });
        });
    });

};
