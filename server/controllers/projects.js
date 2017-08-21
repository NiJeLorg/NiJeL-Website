'use strict';

const Project = require('../models/projects'),
    cloudinary = require('cloudinary');

module.exports = {
    getAllProjects: (req, res) => {
        Project.find((err, projects) => {
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
        cloudinary.uploader.upload(req.file.path, (result) => {
            console.log(result, 'result');
            let project = new Project();
            project.name = req.body.obj.name;
            project.client = req.body.obj.client;
            project.linkToLiveSite = req.body.obj.linkToLiveSite;
            project.relevantSDG = req.body.obj.relevantSDG;
            project.year = req.body.obj.year;
            project.isFeaturedProject = req.body.obj.isFeaturedProject;
            project.coverPhoto = result.secure_url;

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
        Project.findById(req.params.projectId, (err, project) => {
            if (!err) {
                if (req.body.name) {
                    project.name = req.body.name;
                }
                if (req.body.client) {
                    project.client = req.body.client;
                }
                if (req.body.relevantSDG) {
                    project.relevantSDG = req.body.relevantSDG;
                }
                if (req.body.linkToLiveSite) {
                    project.linkToLiveSite = req.body.linkToLiveSite;
                }
                if (req.body.year) {
                    project.year = req.body.year;
                }

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
            } else {
                res.send(err);
            }
        });

    },

    deleteProject: (req, res) => {
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
