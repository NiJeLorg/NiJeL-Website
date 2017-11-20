import uiRouter from '@uirouter/angularjs';
import angularAnimate from 'angular-animate';
import angularAria from 'angular-aria';
import ngMaterial from 'angular-material';
import ngFileUpload from 'ng-file-upload';
import ngQuill from 'ng-quill';
import angular from 'angular';
import slugify from  './filters/slugify';
import $ from 'jquery';


// import controllers
import HomeCtrl from './controllers/home';
import TeamCtrl from './controllers/team';
import ProjectsCtrl from './controllers/projects';
import ProjectCtrl from './controllers/project';
import ContactUsCtrl from './controllers/contacts';
import WhyNijelCtrl from './controllers/why-nijel';
import AdminCtrl from './controllers/admin';
import NavCtrl from './controllers/nav';
import AdminDashboardCtrl from './controllers/admin-dashboard';


// import services
import ClientDataService from './services/ClientDataService';
import AdminDataService from './services/AdminDataService';


const nijelApp = angular.module('nijelApp', [ uiRouter, angularAria, angularAnimate, ngMaterial, ngFileUpload, ngQuill]);

nijelApp.filter('slugify', [slugify]);
nijelApp.controller('TeamCtrl', TeamCtrl)
    .controller('HomeCtrl', HomeCtrl)
    .controller('NavCtrl', NavCtrl)
    .controller('ProjectsCtrl', ProjectsCtrl)
    .controller('ProjectCtrl', ProjectCtrl)
    .controller('ContactUsCtrl', ContactUsCtrl)
    .controller('WhyNijelCtrl', WhyNijelCtrl)
    .controller('AdminCtrl', AdminCtrl)
    .controller('AdminDashboardCtrl', AdminDashboardCtrl)
    .factory('ClientDataService', ClientDataService)
    .factory('AdminDataService', AdminDataService);

nijelApp.config(['$stateProvider', '$httpProvider',
    '$urlRouterProvider', '$locationProvider', '$mdThemingProvider',

    function ($stateProvider, $httpProvider, $urlRouterProvider,
        $locationProvider, $mdThemingProvider) {

        // For any unmatched url, redirect to /state1
        // $urlRouterProvider.otherwise('/');

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
                url: '/why-nijel/{tab}',
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
                controller: 'AdminCtrl',
                templateUrl: 'views/admin.html'
            })
            .state('admin-dashboard', {
                url: '/admin/dashboard',
                controller: 'AdminDashboardCtrl',
                templateUrl: 'views/admin-dashboard.html'
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
