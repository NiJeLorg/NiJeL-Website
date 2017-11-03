'use strict';
const mongoose = require('mongoose');


/**
 *  Creates a connection to a mongoose db
 * @param dbUrl - String representing connection url
 */
const connect = function (dbUrl) {
    mongoose.Promise = global.Promise;
    mongoose.connect(dbUrl, {
        useMongoClient: true
    }).then(() => {
        console.info('successful connection to the DB');
    }, (err) => {
        console.log(err, 'ERR');
    });

}

/**
 * Closes connection to mongoose db
 */
const close = function () {
    mongoose.connection.close(function () {
        console.info('Mongoose default connection with DB  is disconnected through app termination');
        process.exit(0);
    });
}

module.exports = {
    connect: connect,
    close: close
};
