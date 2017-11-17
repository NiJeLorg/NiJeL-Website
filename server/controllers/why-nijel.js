'use strict';

const WhyNijel = require('../models/why-nijel'),
    cloudinary = require('cloudinary');

module.exports = {
    getAllWhyNijelSections: (req, res) => {
        WhyNijel.find((err, sections) => {
            if (err) {
                res.send(err);
            }
            res.json({
                success: true,
                sections: sections
            });
        });
    },

    addWhyNijelSection: (req, res) => {
        let section = new WhyNijel(req.body.obj);

        if (req.file) {
            cloudinary.uploader.upload(req.file.path, (result) => {
                section.coverPhoto = result.secure_url;
            });
        }
        section.save((err) => {
            if (err) {
                res.send(err);
            } else {
                res.json({
                    success: true,
                    message: 'Why NiJeL section successfully added',
                    section: section
                });
            }
        });
    },

    updateWhyNijelSection: (req, res) => {
        WhyNijel.findByIdAndUpdate(req.params.sectionId, (req.body.obj || req.body), (err, section) => {
            if (!err) {
                if (req.file) {
                    cloudinary.uploader.upload(req.file.path, (result) => {
                        section.coverPhoto = result.secure_url;
                        section.save((err) => {
                            if (err) {
                                res.send(err);
                            }
                            res.json({
                                success: true,
                                message: 'section successfully updated',
                                section: section
                            });
                        });
                        if (req.body.obj.coverPhotoId) {
                            cloudinary.uploader.destroy(req.body.obj.coverPhotoId, (err, result) => {
                                if (!err) {
                                    console.log('previous image deleted');
                                } else {
                                    console.log('err', err);
                                }
                            });
                        }
                    });

                } else {
                    section.save((err) => {
                        if (err) {
                            res.send(err);
                        }
                        res.json({
                            success: true,
                            message: 'section successfully updated',
                            section: section
                        });
                    });
                }
            } else {
                res.send(err);
            }
        });
    },


    deleteWhyNijelSection: (req, res) => {
        WhyNijel.remove({
            _id: req.params.sectionId
        }, (err) => {
            if (err) {
                res.send(err);
            } else {
                res.json({
                    success: true,
                    message: 'Why NiJeL section successfully deleted'
                });
            }
        });
    }
};
