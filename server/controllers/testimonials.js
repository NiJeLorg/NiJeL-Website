'use strict';
const Testimonial = require('../models/testimonials');

module.exports = {
    getAllTestimonials: (req, res) => {
        Testimonial.find((err, testimonials) => {
            if (err) {
                res.send(err);
            }
            res.json({
                success: true,
                testimonials: testimonials
            });
        });
    },
    addTestimonial: (req, res) => {
        let testimonial = new Testimonial();
        testimonial.testimonial = req.body.testimonial;
        testimonial.reviewer = req.body.reviewer;
        testimonial.position = req.body.position;
        testimonial.company = req.body.company;

        testimonial.save((err) => {
            if (err) {
                res.send(err);
            }
            res.json({
                success: true,
                message: 'Testimonial successfully added',
                testimonial: testimonial

            });
        });
    },
    updateTestimonial: (req, res) => {
        Testimonial.findById(req.params.testimonialId, (err, testimonial) => {
            if (!err) {
                console.log(req.body, 'REQUEST BODY');

                if (req.body.testimonial) {
                    testimonial.testimonial = req.body.testimonial;
                }
                if (req.body.reviewer) {
                    testimonial.reviewer = req.body.reviewer;
                }
                if (req.body.position) {
                    testimonial.position = req.body.position;
                }
                if (req.body.company) {
                    testimonial.company = req.body.company;
                }

                testimonial.save((err) => {
                    if (err) {
                        res.send(err);
                    }
                    res.json({
                        success: true,
                        message: 'Testimonial successfully updated'
                    });
                });
            } else {
                res.send(err);
            }
        });

    },
    deleteTestimonial: (req, res) => {
        Testimonial.remove({
            _id: req.params.testimonialId
        }, (err) => {
            if (err) {
                res.send(err);
            } else {
                res.json({
                    success: true,
                    message: 'Testimonial successfully deleted'
                });
            }
        });
    }
};
