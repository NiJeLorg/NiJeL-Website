'use strict';

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
    jwt = require('jsonwebtoken'),
    User = require('../models/user');

module.exports = (passport) => {

    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        done(null, user);
    });

    passport.use(new GoogleStrategy({
        clientID: process.env.GOGGLE_CLIENT_ID,
        clientSecret: process.env.GOGGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACKURL
    }, (token, refreshToken, profile, done) => {

        const createToken = (user) => {
            return jwt.sign(user, process.env.SUPERSECRET, {
                expiresIn: '2d'
            });
        };

        let data = profile._json;

        if (data.domain && data.domain === 'nijel.org') {
            User.findOrCreate({
                userId: data.id
            }, {
                userId: data.id,
                email: data.emails[0].value,
                displayName: data.displayName
            }, (err, user) => {
                if (err)
                    return done(err);
                let token = createToken(user);
                return done(null, {
                    user,
                    token
                });
            });
        } else {
            return done(null, false, {
                message: 'User is not a valid Nijel.org user'
            });
        }
    }));
};
