const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
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
        User.findOrCreate({
            userId: profile.id
        }, {
            userId: profile.id,
            email: profile.emails[0].value,
            displayName: profile.displayName
        }, (err, user) => {
            if (err)
                return done(err);
            done(null, user);
        });
    }));
};
