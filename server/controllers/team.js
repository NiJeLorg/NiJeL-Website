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
        let teamMember = new Team((req.body.obj || req.body));
        if (req.file) {
            cloudinary.uploader.upload(req.file.path, (result) => {
                teamMember.avatar = result.secure_url;
                teamMember.avatarId = result.public_id;
                teamMember.save((err) => {
                    if (err) {
                        res.send(err);
                    }
                    res.json({
                        success: true,
                        message: 'Team member successfully added',
                        teamMember: teamMember
                    });
                });
            });
        } else {
            teamMember.save((err) => {
                if (err) {
                    res.send(err);
                }
                res.json({
                    success: true,
                    message: 'Team Member successfully added',
                    teamMember: teamMember
                });
            });
        }
    },

    updateTeamMember: (req, res) => {
        Team.findByIdAndUpdate(req.params.teamMemberId, (req.body.obj || req.body), (err, teamMember) => {
            if (!err) {
                if (req.file) {
                    cloudinary.uploader.upload(req.file.path, (result) => {
                        teamMember.avatar = result.secure_url;
                        teamMember.save((err) => {
                            if (err) {
                                res.send(err);
                            }
                            res.json({
                                success: true,
                                message: 'Team Member successfully updated',
                                teamMember: teamMember
                            });
                        });
                        if (req.body.obj.avatarId) {
                            cloudinary.uploader.destroy(req.body.obj.avatarId, (err, result) => {
                                if (!err) {
                                    console.log('previous image deleted');
                                } else {
                                    console.log('err', err);
                                }
                            });
                        }
                    });

                } else {
                    teamMember.save((err) => {
                        if (err) {
                            res.send(err);
                        }
                        res.json({
                            success: true,
                            message: 'Team member successfully updated',
                            teamMember: teamMember
                        });
                    });
                }
            } else {
                res.send(err);
            }
        });
    },

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
