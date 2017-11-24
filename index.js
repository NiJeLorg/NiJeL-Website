'use strict';
var env = process.env.NODE_ENV || 'development';
if (env === 'development') {
    require('dotenv').load();
}

const morgan = require('morgan'),
    express = require('express'),
    methodOverride = require('method-override'),
    bodyParser = require('body-parser'),
    multer = require('multer'),
    request = require('request'),
    favicon = require('serve-favicon'),
    path = require('path'),
    compression = require('compression'),
    apiRouter = require('./server/apiRouter'),
    publicRoutes = require('./server/routes/public'),
    cloudinary = require('cloudinary'),
    authenticatedRoutes = require('./server/routes/authenticated'),
    auth = require('./server/controllers/auth'),
    bunyan = require('bunyan'),
    c = console,
    debug = require('debug'),
    nijelApp = express(),
    port = process.env.PORT;

let mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect(process.env.DATABASE_URL, {
    useMongoClient: true
}).then(() => {
    debug('successful connection to the DB');
}, (err) => {
    debug(err, 'ERR');
});

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


// log all reques to the console
nijelApp.use(compression());
nijelApp.use(morgan('dev'));


nijelApp.use(methodOverride('X-HTTP-Method-Override'));


nijelApp.use(bodyParser.urlencoded({
    extended: true,
    limit: '500mb',
    parameterLimit: 5000
}));
nijelApp.use(bodyParser.json({
    limit: '500mb'
}));


// serve static files
nijelApp.use(express.static(path.resolve('./public')));

// serve favicon
nijelApp.use(favicon(path.join(__dirname, 'public', 'assets', 'favicon.ico')));

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
nijelApp.listen(port || 3000, () => {
    debug('server running on port ' + port);
});
