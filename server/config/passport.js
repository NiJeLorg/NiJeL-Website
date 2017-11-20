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
        process.nextTick(() => {
            User.findOne({
                'google.id': profile.id
            }, (err, user) => {
                if (err) {
                    return done(err);
                }
                if (user) {
                    return done(null, user);
                } else {
                    let newUser = new User();
                    newUser.google.id = profile.id;
                    newUser.google.name = profile.displayName;
                    newUser.save((err) => {
                        if (err) {
                            throw err;
                        }
                        return done(null, newUser);
                    });
                }
            });
        });
    }));
};
