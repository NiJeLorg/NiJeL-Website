'use strict';

const apiRouter = require('../apiRouter'),
    testimonialCtrl = require('../controllers/testimonials'),
    projectCtrl = require('../controllers/projects'),
    teamCtrl = require('../controllers/team'),
    whyNijelCtrl = require('../controllers/why-nijel'),
    processesCtrl = require('../controllers/processes'),
    servicesCtrl = require('../controllers/services'),
    auth = require('../middleware/auth'),
    multer = require('multer'),
    upload = multer({
        dest: './uploads/'
    });

module.exports = () => {

    apiRouter.route('/projects')
        .post(auth.ensureAuthenticated, upload.single('photo'), projectCtrl.addProject);

    apiRouter.route('/projects/:projectId')
        .put(auth.ensureAuthenticated, upload.single('photo'), projectCtrl.updateProject)
        .delete(projectCtrl.deleteProject);

    apiRouter.route('/testimonials')
        .post(auth.ensureAuthenticated, testimonialCtrl.addTestimonial);

    apiRouter.route('/testimonials/:testimonialId')
        .put(auth.ensureAuthenticated, testimonialCtrl.updateTestimonial)
        .delete(auth.ensureAuthenticated, testimonialCtrl.deleteTestimonial);

    apiRouter.route('/team')
        .post(auth.ensureAuthenticated, teamCtrl.addTeamMember);

    apiRouter.route('/team/:teamMemberId').put(auth.ensureAuthenticated, upload.single('photo'), teamCtrl.updateTeamMember)
        .delete(auth.ensureAuthenticated, teamCtrl.deleteTeamMember);

    apiRouter.route('/whynijel')
        .post(auth.ensureAuthenticated, upload.single('photo'), whyNijelCtrl.addWhyNijelSection);

    apiRouter.route('/whynijel/:sectionId') 
        .put(auth.ensureAuthenticated, upload.single('photo'), whyNijelCtrl.updateWhyNijelSection)
        .delete(auth.ensureAuthenticated, whyNijelCtrl.deleteWhyNijelSection);

    apiRouter.route('/processes')
        .post(upload.single('photo'), processesCtrl.addProcessSection);

    apiRouter.route('/processes/:sectionId')
        .put(auth.ensureAuthenticated, upload.single('photo'), processesCtrl.updateProcessSection)
        .delete(auth.ensureAuthenticated, processesCtrl.deleteProcessSection);
    
    apiRouter.route('/services')
        .post(auth.ensureAuthenticated, servicesCtrl.addService);

    apiRouter.route('/services/:serviceId')
        .put(auth.ensureAuthenticated, servicesCtrl.updateService)
        .delete(auth.ensureAuthenticated, servicesCtrl.deleteService);
};
