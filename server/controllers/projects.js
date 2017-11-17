'use strict';

const Project = require('../models/projects'),
    cloudinary = require('cloudinary');

module.exports = {
    getAllProjects: (req, res) => {
        let projectsFilter = {
            name: new RegExp('^.*('+req.query.search +').*$', 'i'),
            isFeaturedProject: req.query.featured || false
        }
        Project.find(projectsFilter, (err, projects) => {
            if (err) {
                res.send(err);
            }
            res.json({
                success: true,
                projects: projects
            });
        });
    },

    addProject: (req, res) => {
        let project = new Project((req.body.obj || req.body));
        if (req.file) {
            cloudinary.uploader.upload(req.file.path, (result) => {
                project.coverPhoto = result.secure_url;
                project.coverPhotoId = result.public_id;
                project.save((err) => {
                    if (err) {
                        res.send(err);
                    }
                    res.json({
                        success: true,
                        message: 'Project successfully added',
                        project: project
                    });
                });
            });
        } else {
            project.save((err) => {
                if (err) {
                    res.send(err);
                }
                res.json({
                    success: true,
                    message: 'Project successfully added',
                    project: project
                });
            });
        }
    },

    getProject: (req, res) => {
        Project.findById(req.params.projectId, (err, project) => {
            if (!err) {
                res.json({
                    success: true,
                    project: project
                });
            }
        });
    },

    updateProject: (req, res) => {
        Project.findByIdAndUpdate(req.params.projectId, (req.body.obj || req.body), (err, project) => {
            if (!err) {
                if (req.file) {
                    cloudinary.uploader.upload(req.file.path, (result) => {
                        project.coverPhoto = result.secure_url;
                        project.save((err) => {
                            if (err) {
                                res.send(err);
                            }
                            res.json({
                                success: true,
                                message: 'Project successfully updated',
                                project: project
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
                    project.save((err) => {
                        if (err) {
                            res.send(err);
                        }
                        res.json({
                            success: true,
                            message: 'Project successfully updated',
                            project: project
                        });
                    });
                }
            } else {
                res.send(err);
            }
        });
    },

    deleteProject: (req, res) => {
        console.log(req.body);
        Project.remove({
            _id: req.params.projectId
        }, (err) => {
            if (err) {
                res.send(err);
            } else {
                res.json({
                    success: true,
                    message: 'Project successfully deleted'
                });
            }
        });
    }
};
