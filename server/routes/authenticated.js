'use strict';

const apiRouter = require('../apiRouter'),
    testimonialCtrl = require('../controllers/testimonials'),
    projectCtrl = require('../controllers/projects'),
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
};
