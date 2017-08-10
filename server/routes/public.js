'use strict';

const apiRouter = require('../apiRouter'),
    testimonialCtrl = require('../controllers/testimonials'),
    projectCtrl = require('../controllers/projects'),
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



};
