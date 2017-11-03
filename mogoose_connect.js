'use strict';
const mongoose = require('mongoose');


const connect = function(){
    mongoose.Promise = global.Promise;
    var env = process.env.NODE_ENV || 'development';
    if (env === 'development') {
        require('dotenv').load();
    }
    mongoose.connect(process.env.DATABASE_URL, {
        useMongoClient: true
    }).then(() => {
        console.info('successful connection to the DB');
    }, (err) => {
        console.log(err, 'ERR');
    });

}

const close = function() {
    mongoose.connection.close(function () {
        console.info('Mongoose default connection with DB  is disconnected through app termination');
        process.exit(0);
    });
}


module.exports = {
    connect: connect,
    close: close
};
