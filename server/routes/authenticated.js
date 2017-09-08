'use strict';

const apiRouter = require('../apiRouter'),
    testimonialCtrl = require('../controllers/testimonials'),
    projectCtrl = require('../controllers/projects'),
    teamCtrl = require('../controllers/team'),
    multer = require('multer'),
    upload = multer({
        dest: './uploads/'
    });

module.exports = () => {

    apiRouter.route('/projects')
        .post(upload.single('photo'), projectCtrl.addProject);

    apiRouter.route('/projects/:projectId')
        .put(projectCtrl.updateProject)
        .delete(projectCtrl.deleteProject);

    apiRouter.route('/testimonials')
        .post(testimonialCtrl.addTestimonial);

    apiRouter.route('/testimonials/:testimonialId')
        .put(testimonialCtrl.updateTestimonial)
        .delete(testimonialCtrl.deleteTestimonial);

    apiRouter.route('/team')
        .post(teamCtrl.addTeamMember);

    apiRouter.route('/team/:teamMemberId')
        .delete(teamCtrl.deleteTeamMember);
};
