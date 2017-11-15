import _ from 'lodash';

const AdminProjectCtrl = function ($scope, $state, $mdDialog, $mdToast, AdminDataService, ClientDataService, $sce) {

    // TODO Replace the action icos with android style action menu
    

    //utlility methods
    $scope.trustAsHtml = (template) => {
        return $sce.trustAsHtml(template);
    };

    $scope.selected = [];
    $scope.isFeatured = false;
    $scope.featuredFlag = false;

    $scope.filter = {
        options: {
            debounce: 500
        }
    };

    $scope.query = {
        filter: '',
        typeFilter: false,
        order: 'nameToLower'
    };

    $scope.featuredOptions = [
        {
            label: "Yes",
            value: true
        }, 
        {
            label: "No",
            value: false
        }];

    // Fetch Projects and set scope variables
    getProjects();

    $scope.featureProject = (project) => {
        // Validate that the total number of featured projects is not more than 3
        // Get currrent total number of feature projects
        // Add to current selection and check that it is not greater than limit
        // If it is greater than the limit then show a warning dialog
        // IF it is less than equal then feature those projects
        // See if we can attach an icon to identify also featured projects easily
        alert("You request "+ project.isFeaturedProject);

    }

    $scope.featureProject = (project) => {
        // Validate that the total number of featured projects is not more than 3
        // Get currrent total number of feature projects
        // Add to current selection and check that it is not greater than limit
        // If it is greater than the limit then show a warning dialog
        // IF it is less than equal then feature those projects
        // See if we can attach an icon to identify also featured projects easily
        ClientDataService.fetchProjects('', true)
        .then((resp) => {
            console.log("Featureing ", project.isFeaturedProject);
            if (resp.data.projects.length == 3 &&  project.isFeaturedProject == true){
                showAlert("We can only feature a maximum of 3 projects at a time. Please unfeature one of them before proceeding");
            }else{
                AdminDataService.updateProject(project)
                .then((resp) => {
                    if (resp.data.success) {
                        $mdToast.show(
                            $mdToast.simple()
                                .textContent('Project Successfully featured!')
                                .hideDelay(3000)
                        );
                    }
                }, (err) => {
                    console.log(err, 'ERR');
                });
                // showAlert("Success");
            }
            getProjects();
        }, (err) => {
            console.log(err, 'ERROR');
        });
        // alert("You request "+ project.isFeaturedProject);
    }
    function getProjects(){
        ClientDataService.fetchProjects($scope.query.filter, $scope.query.typeFilter)
            .then((resp) => {
                $scope.projects = resp.data.projects;
            }, (err) => {
                console.log(err, 'ERROR');
            });
    }

    $scope.removeFilter = function () {
        $scope.filter.show = false;
        $scope.query.filter = '';
        $scope.query.typeFilter = false

        if($scope.filter.form.$dirty) {
            $scope.filter.form.$setPristine();
        }
       getProjects();
    };

    $scope.$watchCollection('query', (newVal, oldVal) =>{
        getProjects();
    });
    
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

    function showAlert(message) {
        alert = $mdDialog.alert({
          title: 'Attention',
          textContent: message,
          ok: 'Close'
        });
        $mdDialog
          .show( alert )
          .finally(function() {
            alert = undefined;
          });
      }
    
}

export default AdminProjectCtrl;
