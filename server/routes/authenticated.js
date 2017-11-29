'use strict';

const apiRouter = require('../apiRouter'),
    testimonialCtrl = require('../controllers/testimonials'),
    projectCtrl = require('../controllers/projects'),
    teamCtrl = require('../controllers/team'),
    whyNijelCtrl = require('../controllers/why-nijel'),
    processesCtrl = require('../controllers/processes'),
    servicesCtrl = require('../controllers/services'),
    multer = require('multer'),
    upload = multer({
        dest: './uploads/'
    });

module.exports = () => {

    apiRouter.route('/projects')
        .post(upload.single('photo'), projectCtrl.addProject);

    apiRouter.route('/projects/:projectId')
        .put(upload.single('photo'), projectCtrl.updateProject)
        .delete(projectCtrl.deleteProject);

    apiRouter.route('/testimonials')
        .post(testimonialCtrl.addTestimonial);

    apiRouter.route('/testimonials/:testimonialId')
        .put(testimonialCtrl.updateTestimonial)
        .delete(testimonialCtrl.deleteTestimonial);

    apiRouter.route('/team')
        .post(teamCtrl.addTeamMember);

    apiRouter.route('/team/:teamMemberId').put(upload.single('photo'), teamCtrl.updateTeamMember)
        .delete(teamCtrl.deleteTeamMember);

    apiRouter.route('/whynijel')
        .post(upload.single('photo'), whyNijelCtrl.addWhyNijelSection);

    apiRouter.route('/whynijel/:sectionId') 
        .put(upload.single('photo'), whyNijelCtrl.updateWhyNijelSection)
        .delete(whyNijelCtrl.deleteWhyNijelSection);

    apiRouter.route('/processes')
        .post(upload.single('photo'), processesCtrl.addProcessSection);

    apiRouter.route('/processes/:sectionId')
        .put(upload.single('photo'), processesCtrl.updateProcessSection)
        .delete(processesCtrl.deleteProcessSection);
    
    apiRouter.route('/services')
        .post(servicesCtrl.addService);

    apiRouter.route('/services/:serviceId')
        .put(servicesCtrl.updateService)
        .delete(servicesCtrl.deleteService);
};
