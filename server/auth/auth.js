const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
    User = require('../models/user');


module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });

    passport.use(new GoogleStrategy({
        clientID: process.env.GOGGLE_CLIENT_ID,
        clientSecret: process.env.GOGGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACKURL
    }, (token, refreshToken, profile, done) => {
        User.findOrCreate({
            userid: profile.id
        }, {
            name: profile.displayName,
            userid: profile.id
        }, (err, user) => {
            return done(err, user);
        });
    }));
};
// passport.use(new GoogleStrategy({
//     clientID: process.env.GOGGLE_CLIENT_ID,
//     clientSecret: process.env.GOGGLE_CLIENT_SECRET,
//     callbackURL: process.env.GOOGLE_CALLBACKURL
// }, function (accessToken, refreshToken, profile, done) {
//
// }));

// module.exports = passport;
