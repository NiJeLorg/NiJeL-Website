const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    TestimonialSchema = new Schema({
        testimonial: {
            type: String,
            required: true,
            index: {
                unique: true
            }
        },
        reviewer: {
            type: String,
            required: true
        },
        position: {
            type: String,
        },
        company: {
            type: String,
        }
    });


module.exports = mongoose.model('Testimonial', TestimonialSchema);
