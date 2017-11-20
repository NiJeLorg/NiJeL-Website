const mongoose = require('mongoose'),
    bcrypt = require('bcrypt-nodejs'),
    Schema = mongoose.Schema,
    UserSchema = new Schema({
        userId: String,
        email: String,
        displayName: String
    });

UserSchema.statics.findOrCreate = require('find-or-create');

module.exports = mongoose.model('User', UserSchema);
