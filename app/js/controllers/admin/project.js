const AdminProjectCtrl = function ($scope, $state, $mdDialog, $mdToast, AdminDataService, ClientDataService, $sce) {

    $scope.projects = getProjects();
    $scope.selected = [];
    //utlility methods
    $scope.trustAsHtml = (template) => {
        return $sce.trustAsHtml(template);
    };

    $scope.fetchProjects = () => {
        getProjects();
    };


    // run actions on respective resources
    $scope.updateProject = (event, project) => {
            $mdDialog.show({
                locals: {
                    dataToPass: project
                },
                controller: updateProjectDialogController,
                templateUrl: 'views/update-project-dialog.html',
                parent: angular.element(document.body),
                clickOutsideToClose: true,
            });
    };

    $scope.deleteItem = (ev, item, $index, $mdToast) => {
        let confirm = $mdDialog.confirm()
            .title('Are you sure, you want to delete this item ?')
            .textContent('Clicking on YES, will delete this item permanently!')
            .targetEvent(ev)
            .ok('YES')
            .cancel('NO');
        $mdDialog.show(confirm).then(() => {
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
        }, () => {
            console.log('Item not deleted!');
        });
    };

    function getProjects(){
        ClientDataService.fetchProjects()
            .then((resp) => {
                console.log("Finished fetching");
                $scope.projects = resp.data.projects;
            }, (err) => {
                console.log(err, 'ERROR');
            });
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

    $scope.launchAddProjectModal = (ev) => {
        $mdDialog.show({
            controller: addProjectDialogController,
            templateUrl: 'views/add-project-dialog.html',
            parent: angular.element(document.body),
            clickOutsideToClose: true,
        });
    };
}

export default AdminProjectCtrl;
