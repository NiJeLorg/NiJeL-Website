const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    TestimonialSchema = new Schema({
        testimonial: {
            type: String,
            required: true
        },
        reviewer: {
            type: String,
            required: true
        },
        position: {
            type: String,
            required: true
        },
        company: {
            type: String,
            required: true
        }
    });


module.exports = mongoose.model('Testimonial', TestimonialSchema);
