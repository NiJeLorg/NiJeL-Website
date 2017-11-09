const AdminDashboardCtrl = function ($scope, $state, $mdDialog, $mdToast, AdminDataService, ClientDataService, $sce, $mdEditDialog) {

    $scope.sectionTitle = '';

    $scope.items = [];
    $scope.selected = [];
    //utlility methods
    $scope.trustAsHtml = (template) => {
        return $sce.trustAsHtml(template);
    };

    // fetch respective resources

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



};

export default AdminDashboardCtrl;
