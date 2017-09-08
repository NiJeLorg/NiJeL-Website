'use strict';

const Team = require('../models/team'),
    cloudinary = require('cloudinary');

module.exports = {
    getAllTeamMembers: (req, res) => {
        Team.find((err, teamMembers) => {
            if (err) {
                res.send(err);
            }
            res.json({
                success: true,
                teamMembers: teamMembers
            });
        });
    },

    addTeamMember: (req, res) => {
        let teamMember = new Team(req.body);

        teamMember.save((err) => {
            if (err) {
                res.send(err);
            } else {
                res.json({
                    success: true,
                    message: 'Team Member successfully added',
                    teamMember: teamMember
                })
            }
        });

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

    deleteTeamMember: (req, res) => {
        Team.remove({
            _id: req.params.teamMemberId
        }, (err) => {
            if (err) {
                res.send(err);
            } else {
                res.json({
                    success: true,
                    message: 'Team Member successfully deleted'
                });
            }
        });
    }
};
