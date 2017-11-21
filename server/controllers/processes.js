'use strict';

const Processes = require('../models/processes'),
    cloudinary = require('cloudinary');

module.exports = {
    getAllProcessesSections: (req, res) => {
        Processes.find((err, sections) => {
            if (err) {
                res.send(err);
            }
            res.json({
                success: true,
                sections: sections
            });
        });
    },

    addProcessSection: (req, res) => {
        let section = new Processes(req.body.obj);

        if (req.file) {
            cloudinary.uploader.upload(req.file.path, (result) => {
                section.coverPhoto = result.secure_url;
                section.coverPhotoId=result.public_id;
                section.save((err) => {
                    if (err) {
                        res.send(err);
                    } else {
                        res.json({
                            success: true,
                            message: 'Process section successfully added',
                            section: section
                        });
                    }
                });
            });
        } else {
            section.save((err) => {
                if (err) {
                    res.send(err);
                } else {
                    res.json({
                        success: true,
                        message: 'Process section successfully added',
                        section: section
                    });
                }
            });
        }
    },

    updateProcessSection: (req, res) =>  {
        Processes.findByIdAndUpdate(req.params.sectionId, (req.body.obj || req.body), (err, section) => {
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
                                message: 'Process section successfully added',
                                section: section
                            });
                        });
                        if(req.body.obj.coverPhotoId) {
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
                            message: 'Process section successfully added',
                            section: section
                        });
                    });
                }
            } else {
                res.send(err);
            }
        });
    },

    

    deleteProcessSection: (req, res) => {
        Processes.remove({
            _id: req.params.sectionId
        }, (err) => {
            if (err) {
                res.send(err);
            } else {
                res.json({
                    success: true,
                    message: 'Process section successfully deleted'
                });
            }
        });
    }
};
