const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    TeamSchema = new Schema({
        fullname: {
            type: String,
            required: true
        },
        position: {
            type: String,
            required: true
        },
        bio: {
            type: String,
            required: true
        },
        avatar: {
            type: String,
        }
    });

module.exports = mongoose.model('Team', TeamSchema);
