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

        if (req.file.path) {
            cloudinary.uploader.upload(req.file.path, (result) => {
                section.coverPhoto = result.secure_url;
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
        }

        // cloudinary.uploader.upload(req.file.path, (result) => {
        //     let project = new Project();
        //     project.name = req.body.obj.name;
        //     project.client = req.body.obj.client;
        //     project.linkToLiveSite = req.body.obj.linkToLiveSite;
        //     project.relevantSDG = req.body.obj.relevantSDG;
        //     project.year = req.body.obj.year;
        //     project.isFeaturedProject = req.body.obj.isFeaturedProject;
        //     project.coverPhoto = result.secure_url;

        //     project.save((err) => {
        //         if (err) {
        //             res.send(err);
        //         }
        //         res.json({
        //             success: true,
        //             message: 'Project successfully added',
        //             project: project
        //         });
        //     });
        // });
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
