const AdminProcessCtrl = function ($scope, $state, $mdDialog, $mdToast, AdminDataService, ClientDataService, $sce) {

    getProcesses();
    //utlility methods
    $scope.trustAsHtml = (template) => {
        return $sce.trustAsHtml(template);
    };

    // run actions on respective resources
    // TODO implement update process dialog show

    $scope.deleteItem = (ev, item, $index, $mdToast) => {
        let confirm = $mdDialog.confirm()
            .title('Are you sure, you want to delete this item ?')
            .textContent('Clicking on YES, will delete this item permanently!')
            .targetEvent(ev)
            .ok('YES')
            .cancel('NO');
        $mdDialog.show(confirm).then(() => {
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
                    console.error(err, 'ERROR')
                });
        }, () => {
        });
    };

    function getProcesses(){
        ClientDataService.fetchProcessesSections()
            .then((resp) => {
                $scope.items = resp.data.sections;
            }, (err) => {
                console.error(err, 'ERROR');
            });
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
                console.error(err, 'ERR');
            });
        };
    }


    $scope.launchAddProcessSectionModal = (ev) => {
        $mdDialog.show({
            controller: addProcessesSectionDialogController,
            templateUrl: 'views/add-processSection-dialog.html',
            parent: angular.element(document.body),
            clickOutsideToClose: true,
        });
    };

}

export default AdminProcessCtrl;
