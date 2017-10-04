const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    WhyNijelSchema = new Schema({
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

module.exports = mongoose.model('WhyNijel', WhyNijelSchema);
