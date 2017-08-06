const mongoose = require('mongoose'),
    bcrypt = require('bcrypt-nodejs');
    Schema = mongoose.Schema,
    UserSchema = new Schema({
        email: {
            type: String,
            required: true,
            index: {
                unique: true,
            }
        },
        password: {
            type: String,
            required: true
        }
    });


UserSchema.pre('save', function(next) {
    let user = this;
    bcrypt.hash(user.password, null, null, (err, hash)=> {
        if(err) {
            return next(err);
        } else {
            user.password = hash;
            next();
        }
    })
})

module.exports = mongoose.model('User', UserSchema);
