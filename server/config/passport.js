const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
    jwt = require('jsonwebtoken'),
    User = require('../models/user');

module.exports = (passport) => {

    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (user, done) {
        done(null, user);
    });

    passport.use(new GoogleStrategy({
        clientID: process.env.GOGGLE_CLIENT_ID,
        clientSecret: process.env.GOGGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACKURL
    }, (token, refreshToken, profile, done) => {

        const createToken = (user) => {
            return jwt.sign(user, process.env.SUPERSECRET, {
                expiresIn: '24h'
            });
        };

        if (profile._json.domain && profile._json.domain === 'nijel.org') {
            User.findOrCreate({
                userId: profile.id
            }, {
                userId: profile.id,
                email: profile.emails[0].value,
                displayName: profile.displayName
            }, (err, user) => {
                if (err)
                    return done(err);
                let token = createToken(user);
                return done(null, {
                    user,
                    token
                });
            });
        }
    }));
};
