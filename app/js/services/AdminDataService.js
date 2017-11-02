'use strict';

const AdminDataService = function ($http, $q)  {

    return {
        signup(user) {
            return $http.post('/api/users', user);
        },
        login(user) {
            return $http.post('/api/login', user);
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
        updateTestimonial(testimonial) {
            return $http.put(('/api/testimonials/' + testimonial._id), testimonial);
        },
        updateProject(project) {
            return $http.put(('/api/projects/' + project._id), project);
        }
    };
};

export default AdminDataService;
