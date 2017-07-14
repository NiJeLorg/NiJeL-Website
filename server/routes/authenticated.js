'use strict';

const apiRouter = require('../apiRouter'),
    testimonialCtrl = require('../controllers/testimonials'),
    projectCtrl = require('../controllers/projects');

module.exports = () => {

    apiRouter.route('/projects')
        .post(projectCtrl.addProject);

    apiRouter.route('/projects/:projectId')
        .put(projectCtrl.updateProject)
        .delete(projectCtrl.deleteProject);

    apiRouter.route('/testimonials')
        .post(testimonialCtrl.addTestimonial);

    apiRouter.route('/testimonials/:testimonialId')
        .put(testimonialCtrl.updateTestimonial)
        .delete(testimonialCtrl.deleteTestimonial);
};
