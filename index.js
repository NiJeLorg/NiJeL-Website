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
    cookieParser = require('cookie-parser'),
    apiRouter = require('./server/apiRouter'),
    publicRoutes = require('./server/routes/public'),
    authenticatedRoutes = require('./server/routes/authenticated'),
    cloudinary = require('cloudinary'),
    passport = require('passport'),
    session = require('express-session'),
    auth = require('./server/controllers/auth'),
    c = console,
    nijelApp = express(),
    port = process.env.PORT;

let mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect(process.env.DATABASE_URL, {
    useMongoClient: true
}).then(() => {
    console.log('successful connection to the DB');
}, (err) => {
    console.log(err, 'ERR');
});

// require('./server/config/passport')(passport);

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// log all reques to the console
nijelApp.use(morgan('dev'));

require('./server/config/passport')(passport);

nijelApp.use(session({
    secret: process.env.SUPERSECRET,
    resave: true,
    saveUninitialized: true
}));

nijelApp.use(cookieParser());

nijelApp.use(passport.initialize());

nijelApp.use(passport.session());

nijelApp.use(methodOverride());

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

require('./server/routes/auth')(nijelApp, passport);

// api Router for all api requests
nijelApp.use('/api', apiRouter);
// nijelApp.use('/auth', authRoutes);

// call other routes
publicRoutes();

authenticatedRoutes();

// for all requests other than those listed above send index.html page

nijelApp.get('*', (req, res) => {
    res.sendFile('index.html', {
        root: './public'
    });
});

// start the server
nijelApp.listen(port || 3000, () => {
    c.log('server running on port ' + port);
});
