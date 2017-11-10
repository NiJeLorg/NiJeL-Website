
import _ from 'lodash';

const AdminProjectCtrl = function ($scope, $state, $mdDialog, $mdToast, AdminDataService, ClientDataService, $sce) {


    // Fetch Projects and set scope variables
    getProjects();

    //utlility methods
    $scope.trustAsHtml = (template) => {
        return $sce.trustAsHtml(template);
    };

    $scope.filter = {
        options: {
            debounce: 500
        }
    };

    $scope.query = {
        filter: '',
        order: 'nameToLower'
    };

    function getProjects(){
        ClientDataService.fetchProjects()
            .then((resp) => {
                $scope.projects = resp.data.projects;
                $scope.filteredProjects = resp.data.projects;
            }, (err) => {
                console.log(err, 'ERROR');
            });
    }

    $scope.removeFilter = function () {
        $scope.filter.show = false;
        $scope.query.filter = '';

        if($scope.filter.form.$dirty) {
            $scope.filter.form.$setPristine();
        }
        $scope.filteredProjects =  $scope.projects;
    };

    $scope.filterProjects = () => {
      $scope.filteredProjects= _.filter($scope.projects, (project) => {

          let regex = '.*';
          if($scope.query.filter){
              regex = '^.*('+$scope.query.filter +').*$';
          }
          console.log(regex);
          let reg = new RegExp(regex, 'i');
          console.log(reg);
          return project.name.match(reg);
      });
    };

    $scope.$watch('query.filter', () =>{
        $scope.filterProjects();
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
}

export default AdminProjectCtrl;
