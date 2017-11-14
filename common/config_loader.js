'use strict';

var env = process.env.NODE_ENV || 'development';

if (env === 'development') {
    require('dotenv').load({path:__dirname+'/./../.env'});
}

let configs = process.env;

module.exports = configs;