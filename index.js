'use strict';
const morgan = require('morgan'),
    envVar = require('dotenv').config(),
    express = require('express'),
    mongoose = require('mongoose'),
    apiRouter = require('./server/apiRouter'),
    c = console,
    nijelApp = express(),
    port = process.env.PORT || envVar.PORT;

// connecct to the db
mongoose.connect(envVar.DB_URL, () => {
    c.log('successful connection to the DB');
});

// log all reques to the console
nijelApp.use(morgan('dev'));

// serve static files
nijelApp.use(express.static('public'));

// api Router for all api requests
nijelApp.use('/api', apiRouter);

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
