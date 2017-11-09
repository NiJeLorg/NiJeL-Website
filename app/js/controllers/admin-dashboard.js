const AdminDashboardCtrl = function ($scope, $state, $mdDialog, $mdToast, AdminDataService, ClientDataService, $sce) {

    $scope.sectionTitle = '';

    $scope.items = [];

    //utlility methods
    $scope.trustAsHtml = (template) => {
        return $sce.trustAsHtml(template);
    };

    // fetch respective resources
    $scope.fetchTestimonials = () => {
        ClientDataService.fetchTestimonials()
            .then((resp) => {
                $scope.items = resp.data.testimonials;
            }, (err) => {
                console.log(err, 'ERROR');
            });
        $scope.sectionTitle = 'Testimonials';
    };

    $scope.fetchProjects = () => {
        ClientDataService.fetchProjects()
            .then((resp) => {
                $scope.items = resp.data.projects;
            }, (err) => {
                console.log(err, 'ERROR');
            });
        $scope.sectionTitle = 'All Projects';
    };

    $scope.fetchFeaturedProjects = () => {
        $scope.sectionTitle = 'Featured Projects';
    };

    $scope.fetchTeam = () => {
        ClientDataService.fetchTeamMembers()
            .then((resp) => {
                $scope.items = resp.data.teamMembers;
            }, (err) => {
                console.log(err, 'ERROR');
            });
        $scope.sectionTitle = 'Team';
    };

    $scope.fetchWhyNijel = () => {
        ClientDataService.fetchWhyNijelSections()
            .then((resp) => {
                $scope.items = resp.data.sections;
            }, (err) => {
                console.log(err, 'ERROR');
            });
        $scope.sectionTitle = 'Why NiJeL';
    };

    $scope.fetchProcesses = () => {
        ClientDataService.fetchProcessesSections()
            .then((resp) => {
                $scope.items = resp.data.sections;
            }, (err) => {
                console.log(err, 'ERROR');
            });
        $scope.sectionTitle = 'Processes';
    };

    // run actions on respective resources
    $scope.updateItem = (item) => {
        if ($scope.sectionTitle === 'Testimonials') {
            $mdDialog.show({
                locals: {
                    dataToPass: item
                },
                controller: updateTestimonialDialogController,
                templateUrl: 'views/update-testimonial-dialog.html',
                parent: angular.element(document.body),
                clickOutsideToClose: true,
            });
        } else if ($scope.sectionTitle === 'All Projects') {
            $mdDialog.show({
                locals: {
                    dataToPass: item
                },
                controller: updateProjectDialogController,
                templateUrl: 'views/update-project-dialog.html',
                parent: angular.element(document.body),
                clickOutsideToClose: true,
            });
        }
    };

    $scope.deleteItem = (ev, item, $index, $mdToast) => {
        var confirm = $mdDialog.confirm()
            .title('Are you sure, you want to delete this item ?')
            .textContent('Clicking on YES, will delete this item permanently!')
            .targetEvent(ev)
            .ok('YES')
            .cancel('NO');
        $mdDialog.show(confirm).then(() => {
            if ($scope.sectionTitle === 'Testimonials') {
                AdminDataService.deleteTestimonial(item)
                    .then((resp) => {
                        if (resp.data.success) {
                            $scope.items.forEach((elem) => {
                                if (elem._id === item._id) {
                                    $scope.items.splice($index, 1);
                                }
                            });
                        }
                    }, (err) => {
                        console.log(err, 'ERR');
                    });
            } else if ($scope.sectionTitle === 'All Projects') {
                AdminDataService.deleteProject(item)
                    .then((resp) => {
                        if (resp.data.success) {
                            $scope.items.forEach((elem) => {
                                if (elem._id === item._id) {
                                    $scope.items.splice($index, 1);
                                }
                            });
                        }
                    }, (err) => {
                        console.log(err, 'ERR');
                    });
            } else if ($scope.sectionTitle === 'Team') {
                AdminDataService.deleteTeamMember(item)
                    .then((resp) => {
                        if (resp.data.success) {
                            $scope.items.forEach((elem) => {
                                if (elem._id === item._id) {
                                    $scope.items.splice($index, 1);
                                }
                            });
                        }
                    }, (err) => {
                        console.log(err, 'ERROR')
                    });
            } else if ($scope.sectionTitle === 'Why NiJeL') {
                AdminDataService.deleteWhyNijelSection(item)
                    .then((resp) => {
                        if (resp.data.success) {
                            $scope.items.forEach((elem) => {
                                if (elem._id === item._id) {
                                    $scope.items.splice($index, 1);
                                }
                            });
                        }
                    }, (err) => {
                        console.log(err, 'ERROR')
                    });
            } else if ($scope.sectionTitle === 'Processes') {
                AdminDataService.deleteProcessSection(item)
                    .then((resp) => {
                        if (resp.data.success) {
                            $scope.items.forEach((elem) => {
                                if (elem._id === item._id) {
                                    $scope.items.splice($index, 1);
                                }
                            });
                        }
                    }, (err) => {
                        console.log(err, 'ERROR')
                    });
            }
        }, () => {
            console.log('Item not deleted!');
        });
    };


    // event handlers for launching specific resource dialogs
    $scope.launchAddTestimonialModal = (ev) => {
        $mdDialog.show({
            controller: addTestimonialDialogController,
            templateUrl: 'views/add-testimonial-dialog.html',
            parent: angular.element(document.body),
            clickOutsideToClose: true,
        });
    };

    $scope.launchAddProjectModal = (ev) => {
        $mdDialog.show({
            controller: addProjectDialogController,
            templateUrl: 'views/add-project-dialog.html',
            parent: angular.element(document.body),
            clickOutsideToClose: true,
        });
    };

    $scope.launchAddTeamMemberModal = (ev) => {
        $mdDialog.show({
            controller: addTeamMemberDialogController,
            templateUrl: 'views/add-teamMember-dialog.html',
            parent: angular.element(document.body),
            clickOutsideToClose: true,
        });
    };

    $scope.launchAddWhyNijelSectionModal = (ev) => {
        $mdDialog.show({
            controller: addWhyNijelSectionDialogController,
            templateUrl: 'views/add-whyNijelSection-dialog.html',
            parent: angular.element(document.body),
            clickOutsideToClose: true,
        });
    };

    $scope.launchAddProcessSectionModal = (ev) => {
        $mdDialog.show({
            controller: addProcessesSectionDialogController,
            templateUrl: 'views/add-processSection-dialog.html',
            parent: angular.element(document.body),
            clickOutsideToClose: true,
        });
    };


    // create dialog controllers
    function addTestimonialDialogController($scope, $mdDialog, $mdToast) {
        $scope.createNewTestimonial = () => {
            AdminDataService.createNewTestimonial($scope.newTestimonial)
                .then((resp) => {
                    $mdDialog.hide();
                    $mdToast.show(
                        $mdToast.simple()
                        .textContent(resp.data.message)
                        .hideDelay(3000)
                    );
                }, (err) => {
                    console.log(err, 'ERROR');
                });
        };
    }

    function addProjectDialogController($scope, $mdDialog, $mdToast, Upload) {
        $scope.createNewProject = (file) => {
            $scope.newProject.isFeaturedProject = null;
            $scope.isFeaturedProjectOptions = {
                yes: true,
                no: false
            };
            if (file) {
                file.upload = Upload.upload({
                    url: '/api/projects',
                    data: {
                        photo: file,
                        obj: $scope.newProject
                    }
                });

                file.upload.then((resp) => {
                    if (resp.data.success) {
                        $mdDialog.hide();
                        $mdToast.show(
                            $mdToast.simple()
                            .textContent('Project Successfully added!')
                            .hideDelay(3000)
                        );
                    }
                }, (err) => {
                    console.log(err, 'ERROR');
                });
            } else {
                AdminDataService.createNewProject($scope.newProject)
                    .then((resp) => {
                        if (resp.data.success) {
                            $mdDialog.hide();
                            $mdToast.show(
                                $mdToast.simple()
                                .textContent('Project Successfully added!')
                                .hideDelay(3000)
                            );
                        }
                    }, (err) => {
                        console.log(err, 'ERROR')
                    });
            }
        };
    }

    function addTeamMemberDialogController($scope, $mdDialog, $mdToast) {
        $scope.createNewTeamMember = () => {
            AdminDataService.createNewTeamMember($scope.teamMember)
                .then((resp) => {
                    $mdDialog.hide();
                    $mdToast.show(
                        $mdToast.simple()
                        .textContent(resp.data.message)
                        .hideDelay(3000)
                    );
                }, (err) => {
                    console.log(err, 'ERROR');
                });
        };
    }

    function addWhyNijelSectionDialogController($scope, $mdDialog, $mdToast, Upload) {
        $scope.createNewWhyNijelSection = (file) => {
            file.upload = Upload.upload({
                url: '/api/whynijel',
                data: {
                    photo: file,
                    obj: $scope.section
                }
            });

            file.upload.then((resp) => {
                if (resp.data.success) {
                    $mdDialog.hide();
                    $mdToast.show(
                        $mdToast.simple()
                        .textContent('Why Nijel Section successfully added!')
                        .hideDelay(3000)
                    );
                }
            }, (err) => {
                console.log(err, 'ERR');
            });
        };
    }


    function addProcessesSectionDialogController($scope, $mdDialog, $mdToast, Upload) {
        $scope.createNewProcessesSection = (file) => {
            file.upload = Upload.upload({
                url: '/api/processes',
                data: {
                    photo: file,
                    obj: $scope.section
                }
            });

            file.upload.then((resp) => {
                if (resp.data.success) {
                    $mdDialog.hide();
                    $mdToast.show(
                        $mdToast.simple()
                        .textContent('Process Section successfully added!')
                        .hideDelay(3000)
                    );
                }
            }, (err) => {
                console.log(err, 'ERR');
            });
        };
    }


    function updateTestimonialDialogController($scope, $mdDialog, $mdToast, dataToPass) {
        $scope.testimonial = dataToPass;

        $scope.updateTestimonial = () => {
            AdminDataService.updateTestimonial($scope.testimonial)
                .then((res) => {
                    $mdDialog.hide();
                    $mdToast.show(
                        $mdToast.simple()
                        .textContent('Testimonial successfully updated!')
                        .hideDelay(3000)
                    );
                }, (err) => {
                    $mdDialog.hide();
                    $mdToast.show(
                        $mdToast.simple()
                        .textContent('Testimonial not updated!')
                        .hideDelay(3000)
                    );
                });
        };
    }

    function updateProjectDialogController($scope, $mdDialog, $mdToast, dataToPass, Upload) {
        $scope.project = dataToPass;
        console.log($scope.project, 'scope.project');

        $scope.updateProject = (file) => {
            if (file) {
                file.upload = Upload.upload({
                    url: ('/api/projects/' + $scope.project._id),
                    method: 'PUT',
                    data: {
                        photo: file,
                        obj: $scope.project
                    }
                });

                file.upload.then((resp) => {
                    if (resp.data.success) {
                        $mdDialog.hide();
                        $mdToast.show(
                            $mdToast.simple()
                            .textContent('Project Successfully updated!')
                            .hideDelay(3000)
                        );
                    }
                }, (err) => {
                    console.log(err, 'ERR');
                });
            } else {
                AdminDataService.updateProject($scope.project)
                    .then((resp) => {
                        if (resp.data.success) {
                            $mdDialog.hide();
                            $mdToast.show(
                                $mdToast.simple()
                                .textContent('Project Successfully updated!')
                                .hideDelay(3000)
                            );
                        }
                    }, (err) => {
                        console.log(err, 'ERR');
                    });
            }
        };

    }
};

export default AdminDashboardCtrl;
