const mongoose = require('mongoose'),
    bcrypt = require('bcrypt-nodejs'),
    Schema = mongoose.Schema,
    UserSchema = new Schema({
        google: {
            id: String,
            token: String,
            email: String,
            name: String,
        },
    });

UserSchema.statics.findOrCreate = require('find-or-create');

module.exports = mongoose.model('User', UserSchema);
