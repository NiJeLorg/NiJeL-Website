
module.exports = {
    validate: function(req, res, next){
        console.log(req.isAuthenticated(), "blablablaba");
        if (req.isAuthenticated()) { return next(); }
        res.redirect('/auth/google');
    }
};

