'use strict';

const ClientDataService = function ($http, $q) {

    return {
        fetchProjects: () => {
            return $http({
                method: 'GET',
                url: '/api/projects'
            });
        },

        fetchSingleProject: (projectId) => {
            return $http({
                method: 'GET',
                url: ('/api/projects/' + projectId)
            });
        },

        fetchLastThreeTweets: () => {
            return $http({
                method: 'GET',
                url: '/api/nijel-tweets'
            });
        },

        fetchTestimonials: () => {
            return $http({
                method: 'GET',
                url: '/api/testimonials'
            })
        },

        fetchTeamMembers: () => {
            return $http({
                method: 'GET',
                url: '/api/team'
            });
        },

        fetchWhyNijelSections: () => {
            return $http({
                method: 'GET',
                url: '/api/whynijel'
            });
        },

        fetchProcessesSections: () => {
            return $http({
                method: 'GET',
                url: '/api/processes'
            });
        },
    };
};

export default ClientDataService;
