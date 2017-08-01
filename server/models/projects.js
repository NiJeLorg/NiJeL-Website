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
            type: String,
            required: true
        },
        year: {
            type: String,
            required: true
        },
        isFeaturedProject: {
            type: Boolean
        },
        coverPhoto: {
            type: String
        }
    });

module.exports = mongoose.model('Project', ProjectSchema);
