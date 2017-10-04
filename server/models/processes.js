const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ProcessesSchema = new Schema({
        title: {
            type: String,
            required: true
        },
        coverPhoto: {
            type: String,
        },
        text: {
            type: String,
            required: true
        },
    });

module.exports = mongoose.model('Processes', ProcessesSchema);
