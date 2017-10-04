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
        description: {
            type: String
        },
        coverPhoto: {
            type: String
        },
        coverPhotoId: {
            type: String
        },
        linkToLiveSite: {
            type: String,
        },
        relevantSDG: {
            type: String,
        },
        year: {
            type: String,
        },
        isFeaturedProject: {
            type: Boolean
        },
    });

module.exports = mongoose.model('Project', ProjectSchema);
