const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ProjectSchema = new Schema({
        name: {
            type: String,
            required: true
        },
        client: {
            type: String,
            required: true
        },
        linkToLiveSite: {
            type: String,
        },
        relevantSDG: {
            type: Number,
            required: true
        },
        year: {
            type: String,
            required: true
        }
    });

module.exports = mongoose.model('Project', ProjectSchema);
