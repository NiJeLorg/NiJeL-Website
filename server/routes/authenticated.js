'use strict';

const apiRouter = require('../apiRouter'),
    testimonialCtrl = require('../controllers/testimonials'),
    projectCtrl = require('../controllers/projects'),
    teamCtrl = require('../controllers/team'),
    whyNijelCtrl = require('../controllers/why-nijel'),
    processesCtrl = require('../controllers/processes'),
    servicesCtrl = require('../controllers/services'),
    authValidator = require('../middleware/authValidator'),
    multer = require('multer'),
    upload = multer({dest: './uploads/'});

module.exports = () => {
    apiRouter.route('/projects')
        .post(authValidator.ensureAuthenticated, upload.single('photo'), projectCtrl.addProject);

    apiRouter.route('/projects/:projectId')
        .put(authValidator.ensureAuthenticated, upload.single('photo'), projectCtrl.updateProject)
        .delete(projectCtrl.deleteProject);

    apiRouter.route('/testimonials')
        .post(authValidator.ensureAuthenticated, testimonialCtrl.addTestimonial);

    apiRouter.route('/testimonials/:testimonialId')
        .put(authValidator.ensureAuthenticated, testimonialCtrl.updateTestimonial)
        .delete(authValidator.ensureAuthenticated, testimonialCtrl.deleteTestimonial);

    apiRouter.route('/team')
        .post(authValidator.ensureAuthenticated, teamCtrl.addTeamMember);

    apiRouter.route('/team/:teamMemberId').put(authValidator.ensureAuthenticated, upload.single('photo'), teamCtrl.updateTeamMember)
        .delete(authValidator.ensureAuthenticated, teamCtrl.deleteTeamMember);

    apiRouter.route('/whynijel')
        .post(authValidator.ensureAuthenticated, upload.single('photo'), whyNijelCtrl.addWhyNijelSection);

    apiRouter.route('/whynijel/:sectionId')
        .put(authValidator.ensureAuthenticated, upload.single('photo'), whyNijelCtrl.updateWhyNijelSection)
        .delete(authValidator.ensureAuthenticated, whyNijelCtrl.deleteWhyNijelSection);

    apiRouter.route('/processes')
        .post(upload.single('photo'), processesCtrl.addProcessSection);

    apiRouter.route('/processes/:sectionId')
        .put(authValidator.ensureAuthenticated, upload.single('photo'), processesCtrl.updateProcessSection)
        .delete(authValidator.ensureAuthenticated, processesCtrl.deleteProcessSection);

    apiRouter.route('/services')
        .post(authValidator.ensureAuthenticated, servicesCtrl.addService);

    apiRouter.route('/services/:serviceId')
        .put(authValidator.ensureAuthenticated, servicesCtrl.updateService)
        .delete(authValidator.ensureAuthenticated, servicesCtrl.deleteService);
};
