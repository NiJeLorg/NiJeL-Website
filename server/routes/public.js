'use strict';

const apiRouter = require('../apiRouter'),
    testimonialCtrl = require('../controllers/testimonials'),
    projectCtrl = require('../controllers/projects'),
    teamCtrl = require('../controllers/team'),
    whyNijelCtrl = require('../controllers/why-nijel'),
    processesCtrl = require('../controllers/processes'),
    nijelTweets = require('../controllers/nijel_tweets'),
    userCtrl = require('../controllers/user');

module.exports = () => {
    apiRouter.route('/nijel-tweets')
        .get(nijelTweets.fetchLastThreeTweets);

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

    apiRouter.route('/team')
        .get(teamCtrl.getAllTeamMembers);

    apiRouter.route('/whynijel')
        .get(whyNijelCtrl.getAllWhyNijelSections);

    apiRouter.route('/processes')
        .get(processesCtrl.getAllProcessesSections);
};
