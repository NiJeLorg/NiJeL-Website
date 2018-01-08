const jwt = require('jwt-simple'),
    moment = require('moment');
module.exports = {
    ensureAuthenticated: function(req, res, next){
        if (!req.header('Authorization')) {
            return res.status(401).send({ message: 'Please make sure your request has an Authorization header' });
        }
        var token = req.header('Authorization').split(' ')[1];
        var payload = null;
        try {
            payload = jwt.decode(token, process.env.SUPERSECRET);
        }
        catch (err) {
            return res.status(401).send({ message: err.message });
        }

        if (payload.exp <= moment().unix()) {
            return res.status(401).send({ message: 'Token has expired' });
        }
        req.user = payload.sub;
        next();
    }
};

