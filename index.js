'use strict';
const morgan = require('morgan'),
    envVar = require('dotenv').config().parsed,
    express = require('express'),
    mongoose = require('mongoose'),
    methodOverride = require('method-override'),
    bodyParser = require('body-parser'),
    apiRouter = require('./server/apiRouter'),
    publicRoutes = require('./server/routes/public'),
    authenticatedRoutes = require('./server/routes/authenticated'),
    auth = require('./server/controllers/auth'),
    c = console,
    nijelApp = express(),
    port = process.env.PORT || envVar.PORT;


mongoose.connect(envVar.DB_URL, () => {
    c.log('successful connection to the db');
});

// log all reques to the console
nijelApp.use(morgan('dev'));


nijelApp.use(methodOverride('X-HTTP-Method-Override'));


// serve static files
nijelApp.use(express.static('public'));


nijelApp.use(bodyParser.urlencoded({
    extended: true
}));
nijelApp.use(bodyParser.json());


// api Router for all api requests
nijelApp.use('/api', apiRouter);


// call other routes
publicRoutes();

apiRouter.use(auth.authenticateUser);

authenticatedRoutes();

// for all requests other than those listed above send index.html page
nijelApp.get('*', (req, res) => {
    res.sendFile('index.html', {
        root: './public'
    });
});


// start the server
nijelApp.listen(port, () => {
    c.log('server running on port ' + port);
});
