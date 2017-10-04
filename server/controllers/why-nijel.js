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

    // updateProject: (req, res) => {
    //     Project.findById(req.params.projectId, (err, project) => {
    //         if (!err) {
    //             if (req.body.name) {
    //                 project.name = req.body.name;
    //             }
    //             if (req.body.client) {
    //                 project.client = req.body.client;
    //             }
    //             if (req.body.relevantSDG) {
    //                 project.relevantSDG = req.body.relevantSDG;
    //             }
    //             if (req.body.linkToLiveSite) {
    //                 project.linkToLiveSite = req.body.linkToLiveSite;
    //             }
    //             if (req.body.year) {
    //                 project.year = req.body.year;
    //             }

    //             project.save((err) => {
    //                 if (err) {
    //                     res.send(err);
    //                 }
    //                 res.json({
    //                     success: true,
    //                     message: 'Project successfully updated',
    //                     project: project
    //                 });
    //             });
    //         } else {
    //             res.send(err);
    //         }
    //     });

    // },

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
