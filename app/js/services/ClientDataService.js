'use strict';

const ClientDataService = function ($http, $q) {

    return {
        fetchProjects: (searchQueryString, featuredFlag) => {
            return $http({
                method: 'GET',
                url: '/api/projects',
                params: {
                    search: searchQueryString,
                    featured: featuredFlag
                }
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

        fetchServices: () => {
            return $http({
                method: 'GET',
                url: '/api/services'
            });
        },
    };
};

export default ClientDataService;
