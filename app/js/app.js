import uiRouter from '@uirouter/angularjs';
import angularAnimate from 'angular-animate';
import angularAria from 'angular-aria';
import ngMaterial from 'angular-material';
import ngFileUpload from 'ng-file-upload';
import ngQuill from 'ng-quill';
import angular from 'angular';
import $ from 'jquery';
// import dataGrid from 'angular-data-grid';

// import controllers
import HomeCtrl from './controllers/home';
import TeamCtrl from './controllers/team';
import ProjectsCtrl from './controllers/projects';
import ProjectCtrl from './controllers/project';
import ContactUsCtrl from './controllers/contacts';
import WhyNijelCtrl from './controllers/why-nijel';
import AdminCtrl from './controllers/admin';
import AdminDashboardCtrl from './controllers/admin-dashboard';
import AdminProjectCtrl from './controllers/admin/project';
import AdminProcessCtrl from './controllers/admin/process';
import AdminTestimonialCtrl from './controllers/admin/testimonial';
import AdminWhyNijelCtrl from './controllers/admin/why-nijel';
import AdminTeamCtrl from './controllers/admin/team';

// import services
import ClientDataService from './services/ClientDataService';
import AdminDataService from './services/AdminDataService';


const nijelApp = angular.module('nijelApp', [uiRouter, angularAria, angularAnimate, ngMaterial, ngFileUpload, ngQuill, require('angular-material-data-table')]);

nijelApp.controller('TeamCtrl', TeamCtrl)
    .controller('HomeCtrl', HomeCtrl)
    .controller('ProjectsCtrl', ProjectsCtrl)
    .controller('ProjectCtrl', ProjectCtrl)
    .controller('ContactUsCtrl', ContactUsCtrl)
    .controller('WhyNijelCtrl', WhyNijelCtrl)
    .controller('AdminCtrl', AdminCtrl)
    .controller('AdminProjectCtrl', AdminProjectCtrl)
    .controller('AdminProcessCtrl', AdminProcessCtrl)
    .controller('AdminTestimonialCtrl', AdminTestimonialCtrl)
    .controller('AdminWhyNijelCtrl', AdminWhyNijelCtrl)
    .controller('AdminTeamCtrl', AdminTeamCtrl)
    .controller('AdminDashboardCtrl', AdminDashboardCtrl)
    .factory('ClientDataService', ClientDataService)
    .factory('AdminDataService', AdminDataService);


nijelApp.config(['$stateProvider', '$httpProvider',
    '$urlRouterProvider', '$locationProvider', '$mdThemingProvider',

    function ($stateProvider, $httpProvider, $urlRouterProvider,
        $locationProvider, $mdThemingProvider) {

        // For any unmatched url, redirect to /state1
        $urlRouterProvider.otherwise('/');

        $mdThemingProvider.theme('default')
            .primaryPalette('teal')
            .accentPalette('pink');


        $stateProvider
            .state('home', {
                url: '/',
                controller: 'HomeCtrl',
                templateUrl: 'views/home.html'
            })
            .state('why-nijel', {
                url: '/why-nijel',
                controller: 'WhyNijelCtrl',
                templateUrl: 'views/why-nijel.html'
            })
            .state('projects', {
                url: '/projects',
                controller: 'ProjectsCtrl',
                templateUrl: 'views/projects.html',
            })
            .state('project', {
                url: '/projects/:id',
                controller: 'ProjectCtrl',
                templateUrl: 'views/project.html'
            })
            .state('team', {
                url: '/team',
                controller: 'TeamCtrl',
                templateUrl: 'views/team.html'
            })
            .state('contact-us', {
                url: '/contact-us',
                controller: 'ContactUsCtrl',
                templateUrl: 'views/contact-us.html'
            })
            .state('404', {
                url: '/404',
                templateUrl: 'views/404.html'
            })
            .state('admin', {
                url: '/admin',
                templateUrl: 'views/layout.html'
            })
            .state('admin.login', {
                url: '/login',
                controller: 'AdminCtrl',
                templateUrl: 'views/admin.html'
            })
            .state('admin.dashboard', {
                url: '/dashboard',
                controller: 'AdminDashboardCtrl',
                templateUrl: 'views/admin-dashboard.html'
            })
            .state('admin.dashboard.projects', {
                url: '/projects',
                controller: 'AdminProjectCtrl',
                templateUrl: 'views/admin/projects.html',
            })
            .state('admin.dashboard.team', {
                url: '/team',
                controller: 'AdminTeamCtrl',
                templateUrl: 'views/admin/team.html',
            })
            .state('admin.dashboard.processes', {
                url: '/processes',
                controller: 'AdminProcessesCtrl',
                templateUrl: 'views/admin/processes.html',
            })
            .state('admin.dashboard.why-nijel', {
                url: '/why-nijel',
                controller: 'AdminWhyNijelCtrl',
                templateUrl: 'views/admin/why-nijel.html',
            })
            .state('admin.dashboard.testimonials', {
                url: '/testimonials',
                controller: 'AdminTestimonialCtrl',
                templateUrl: 'views/admin/testimonials.html',
            });

        $locationProvider.html5Mode(true);

        $httpProvider.defaults.headers.common['x-access-token'] = localStorage.token;

    }
]);

if (localStorage.navbarToggle) {
    $(document).ready(() => {
        $('.main-nav').css({
            'position': 'fixed',
            'background': '#fff',
            'height': '100px',
            'margin-top': '0',
            'box-shadow': '1px 1px 20px 0 rgba(0, 0, 0, 0.5)'
        });
        $('.nav-links a').css({
            'color': '#787976'
        });
        $('.nav-logo').css({
            'display': 'block'
        });
        $('.open-nav-logo').css({
            'display': 'none'
        });
    });

}
