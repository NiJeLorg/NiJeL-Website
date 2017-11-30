const mongoose = require ('mongoose'),
    Schema = mongoose.Schema,
    ServicesSchema = new Schema({
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
    });

module.exports = mongoose.model('Services', ServicesSchema);