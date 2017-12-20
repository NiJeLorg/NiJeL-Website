const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    UserSchema = new Schema({
        userId: String,
        email: String,
        displayName: String,
        google: String
    });

UserSchema.statics.findOrCreate = require('find-or-create');

module.exports = mongoose.model('User', UserSchema);
