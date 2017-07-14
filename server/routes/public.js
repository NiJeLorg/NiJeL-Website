'use strict';

const apiRouter = require('../apiRouter'),
    testimonialCtrl = require('../controllers/testimonials'),
    projectCtrl = require('../controllers/projects'),
    userCtrl = require('../controllers/user');


module.exports = () => {
    apiRouter.route('/projects')
        .get(projectCtrl.getAllProjects);

    apiRouter.route('/projects/:projectId')
        .get(projectCtrl.getProject);

    apiRouter.route('/testimonials')
        .get(testimonialCtrl.getAllTestimonials);

    apiRouter.route('/users')
        .post(userCtrl.signup);

    apiRouter.route('/login')
        .post(userCtrl.login);

};
