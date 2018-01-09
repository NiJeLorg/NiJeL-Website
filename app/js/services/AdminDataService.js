'use strict';

const AdminDataService = function ($http, $q)  {

    return {
        login() {
            return $http.get('/auth/google');
        },
        createNewTestimonial(testimonial) {
            return $http.post('/api/testimonials', testimonial);
        },
        createNewProject(project) {
            return $http.post('/api/projects', project);
        },
        createNewTeamMember(teamMember) {
            return $http.post('/api/team', teamMember);
        },
        createNewWhyNijelSection(section) {
            return $http.post('/api/whynijel', section);
        },
        createNewProcessSection(section) {
            return $http.post('/api/processes', section);
        },
        createNewService(service) {
            return $http.post('/api/services', service);
        },
        deleteTestimonial(testimonial) {
            return $http.delete(('/api/testimonials/' + testimonial._id));
        },
        deleteProject(project) {
            return $http.delete(('/api/projects/' + project._id));
        },
        deleteWhyNijelSection(section) {
            return $http.delete('/api/whynijel/' + section._id);
        },
        deleteProcessSection(section) {
            return $http.delete('/api/processes/' + section._id);
        },
        deleteTeamMember(teamMember) {
            return $http.delete(('/api/team/' + teamMember._id));
        },
        deleteService(service) {
            return $http.delete(('/api/services/' + service._id));
        },
        updateTestimonial(testimonial) {
            return $http.put(('/api/testimonials/' + testimonial._id), testimonial);
        },
        updateWhyNijelSection(section) {
            return $http.put(('/api/whynijel/' + section._id), section);
        },
        updateProject(project) {
            return $http.put(('/api/projects/' + project._id), project);
        },
        updateTeamMember(teamMember) {
            return $http.put(('/api/team/' + teamMember._id), teamMember);
        },
        updateProcessSection(section) {
            return $http.put(('/api/processes/' + section._id), section);
        },
        updateService(service) {
            return $http.put(('/api/services/' + service._id), service);
        }
    };
};

export default AdminDataService;
