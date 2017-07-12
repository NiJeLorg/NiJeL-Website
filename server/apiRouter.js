'use strict';
const express = require('express'),
    apiRouter = express.Router();


apiRouter.get('/', (req, res) => {
    res.json({
        message: 'Welcome to our API'
    });
});

module.exports = apiRouter;
