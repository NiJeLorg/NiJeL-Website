import uiRouter from '@uirouter/angularjs';
import angularAnimate from 'angular-animate';
import angularAria from 'angular-aria';
import ngMaterial from 'angular-material';
import ngFileUpload from 'ng-file-upload';
import ngQuill from 'ng-quill';
import ngSanitize from 'angular-sanitize';
import angular from 'angular';
import slugify from  './filters/slugify';
import $ from 'jquery';
import satellizer from 'satellizer';
// import dataGrid from 'angular-data-grid';


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
import AdminProjectCtrl from './controllers/admin/project';
import AdminProcessCtrl from './controllers/admin/process';
import AdminTestimonialCtrl from './controllers/admin/testimonial';
import AdminWhyNijelCtrl from './controllers/admin/why-nijel';
import AdminTeamCtrl from './controllers/admin/team';
import AdminServiceCtrl from './controllers/admin/services';

// import services
import ClientDataService from './services/ClientDataService';
import AdminDataService from './services/AdminDataService';


const nijelApp = angular.module('nijelApp', [uiRouter, angularAria, angularAnimate, ngMaterial, ngFileUpload, ngQuill, ngSanitize, require('angular-material-data-table'), satellizer]);

nijelApp.filter('slugify', [slugify]);
nijelApp.controller('TeamCtrl', TeamCtrl)
    .controller('HomeCtrl', HomeCtrl)
    .controller('NavCtrl', NavCtrl)
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
    .controller('AdminServiceCtrl', AdminServiceCtrl)
    .controller('AdminDashboardCtrl', AdminDashboardCtrl)
    .factory('ClientDataService', ClientDataService)
    .factory('AdminDataService', AdminDataService);

nijelApp.config(['$stateProvider', '$httpProvider',
    '$urlRouterProvider', '$locationProvider', '$mdThemingProvider','$authProvider',

    function ($stateProvider, $httpProvider, $urlRouterProvider,
              $locationProvider, $mdThemingProvider, $authProvider) {


        /**
         * Helper auth functions
         */
        let skipIfLoggedIn = ['$q', '$auth','$state', function($q, $auth,$state) {
            let deferred = $q.defer();
            if ($auth.isAuthenticated()) {
                $state.go('admin.dashboard');
            } else {
                deferred.resolve();
            }
            return deferred.promise;
        }];

        let loginRequired = ['$q', '$auth','$state', function($q, $auth, $state) {
            let deferred = $q.defer();
            if ($auth.isAuthenticated()) {
                deferred.resolve();
            } else {
                $state.go('admin.authenticate');
            }
            return deferred.promise;
        }];

        // For any unmatched url, redirect to /state1
        $urlRouterProvider.otherwise('/');

        $mdThemingProvider.theme('default')
            .primaryPalette('teal')
            .accentPalette('pink');
        $authProvider.google({
            clientId: '261811817799-7v2f4or792sv94rl8rjrn85e853334st.apps.googleusercontent.com',
            redirectUri: window.location.origin + '/admin/dashboard',
            requiredUrlParams: ['scope'],
            optionalUrlParams: ['display'],
            scope: ['profile', 'email'],
            scopePrefix: 'openid',
            scopeDelimiter: ' ',
            display: 'popup',
            oauthType: '2.0',
            popupOptions: { width: 452, height: 633 }

        });
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
                templateUrl: 'views/layout.html',
                data: {
                    'isAdmin': true
                },
                redirectTo: 'admin.authenticate'

            })
            .state('admin.authenticate', {
                url: '/authenticate',
                controller: 'AdminCtrl',
                templateUrl: 'views/admin/auth.html',
                resolve: {
                    skipIfLoggedIn: skipIfLoggedIn
                }
            })
            .state('admin.dashboard', {
                url: '/dashboard',
                controller: 'AdminDashboardCtrl',
                templateUrl: 'views/admin/dashboard.html',
                resolve: {
                    loginRequired: loginRequired
                }
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
                controller: 'AdminProcessCtrl',
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
            })
            .state('admin.dashboard.services', {
                url: '/services',
                controller: 'AdminServiceCtrl',
                templateUrl: 'views/admin/services.html',
            });

        $locationProvider.html5Mode(true);
    }
]).run(['$state', '$transitions', '$rootScope', ($state, $transitions, $rootScope) => {
    $transitions.onStart({}, function ($transition) {
        if ($transition.$to().data) {
            let data = $transition.$to().data;
            $rootScope.isAdminState = data.isAdmin;
        } else {
            $rootScope.isAdminState = false;
        }
    });
    ;
}]);


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
