const AdminServiceCtrl = function ($scope, $state, $mdDialog, $mdToast, AdminDataService, ClientDataService, $sce) {
    
    getServices();
    //utlility methods
    $scope.trustAsHtml = (template) => {
        return $sce.trustAsHtml(template);
    };

    function getServices() {
        ClientDataService.fetchServices()
            .then((resp) => {
                $scope.services = resp.data.services;
            }, (err) => {
                console.error(err, 'ERROR');
            });
        
    }

    $scope.updateService = (event, service) => {
        $mdDialog.show({
            locals: {
                dataToPass: service
            },
            controller: updateServiceDialogController,
            templateUrl: 'views/admin/update-service-dialog.html',
            parent: angular.element(document.body),
            clickOutsideToClose: true,
        });
    };

    $scope.deleteService = (ev, service, $index, $mdToast) => {
        let confirm = $mdDialog.confirm()
            .title('Are you sure, you want to delete this item ?')
            .textContent('Clicking on YES, will delete this item permanently!')
            .targetEvent(ev)
            .ok('YES')
            .cancel('NO');
        $mdDialog.show(confirm).then(() => {
            AdminDataService.deleteService(service)
                .then((resp) => {
                    if (resp.data.success) {
                        $scope.services.forEach((elem, $index) => {
                            if (elem._id === service._id) {
                                $scope.services.splice($index, 1);
                            }
                        });
                    }
                }, (err) => {
                    console.error(err, 'ERR');
                });
        }, () => {
        });
    };

    function addServiceDialogController($scope, $mdDialog, $mdToast) {
        $scope.createNewService = () => {
            AdminDataService.createNewService($scope.service)
                .then((resp) => {
                    $mdDialog.hide();
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent(resp.data.message)
                            .hideDelay(3000)
                    );
                    getServices();
                }, (err) => {
                    console.error(err, 'ERROR');
                });
        };
    }

    function updateServiceDialogController($scope, $mdDialog, $mdToast, dataToPass) {
        $scope.service = dataToPass;

        $scope.updateService = () => {
            AdminDataService.updateService($scope.service)
                .then((res) => {
                    $mdDialog.hide();
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('Service successfully updated!')
                            .hideDelay(3000)
                    );
                }, (err) => {
                    $mdDialog.hide();
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('Service not updated!')
                            .hideDelay(3000)
                    );
                });
        };
    }

    $scope.launchAddServiceModal = (env) => {
        $mdDialog.show({
            controller:addServiceDialogController,
            templateUrl: 'views/admin/add-service-dialog.html',
            parent: angular.element(document.body),
            clickOutsideToClose: true,
        });
    };
}

export default AdminServiceCtrl;