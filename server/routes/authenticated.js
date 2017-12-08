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
        .post(auth.validate, upload.single('photo'), projectCtrl.addProject);

    apiRouter.route('/projects/:projectId')
        .put(auth.validate, upload.single('photo'), projectCtrl.updateProject)
        .delete(projectCtrl.deleteProject);

    apiRouter.route('/testimonials')
        .post(auth.validate, testimonialCtrl.addTestimonial);

    apiRouter.route('/testimonials/:testimonialId')
        .put(auth.validate, testimonialCtrl.updateTestimonial)
        .delete(auth.validate, testimonialCtrl.deleteTestimonial);

    apiRouter.route('/team')
        .post(auth.validate, teamCtrl.addTeamMember);

    apiRouter.route('/team/:teamMemberId').put(auth.validate, upload.single('photo'), teamCtrl.updateTeamMember)
        .delete(auth.validate, teamCtrl.deleteTeamMember);

    apiRouter.route('/whynijel')
        .post(auth.validate, upload.single('photo'), whyNijelCtrl.addWhyNijelSection);

    apiRouter.route('/whynijel/:sectionId') 
        .put(auth.valiauth.validatedate, upload.single('photo'), whyNijelCtrl.updateWhyNijelSection)
        .delete(auth.validate, whyNijelCtrl.deleteWhyNijelSection);

    apiRouter.route('/processes')
        .post(upload.single('photo'), processesCtrl.addProcessSection);

    apiRouter.route('/processes/:sectionId')
        .put(auth.validate, upload.single('photo'), processesCtrl.updateProcessSection)
        .delete(auth.validate, processesCtrl.deleteProcessSection);
    
    apiRouter.route('/services')
        .post(auth.validate, servicesCtrl.addService);

    apiRouter.route('/services/:serviceId')
        .put(auth.validate, servicesCtrl.updateService)
        .delete(auth.validate, servicesCtrl.deleteService);
};
