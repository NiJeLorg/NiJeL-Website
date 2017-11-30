const express = require('express'),
    Router = express.Router();

module.exports = (app, passport) => {
    const scope = ['https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/plus.login',
        'https://www.googleapis.com/auth/userinfo.profile'
    ];

    Router.route('/auth/google')
        .get(passport.authenticate('google', {
            scope
        }));

    Router.route('/auth/google/callback')
        .get(passport.authenticate('google', {
            failureRedirect: '/admin'
        }), (req, res) => {
            return res.redirect('/admin/dashboard');
        });

    app.use(Router);
};
