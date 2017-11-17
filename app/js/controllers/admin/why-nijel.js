const AdminWhyNijelCtrl = function ($scope, $state, $mdDialog, $mdToast, AdminDataService, ClientDataService, $sce) {

    getSections();
    //utlility methods
    $scope.trustAsHtml = (template) => {
        return $sce.trustAsHtml(template);
    };

    function getSections(){
        ClientDataService.fetchWhyNijelSections()
            .then((resp) => {
                $scope.sections = resp.data.sections;
            }, (err) => {
                console.error(err, 'ERROR');
            });
    }

    // run actions on respective resources
    // TODO Implement update why nijel section dialog

    $scope.deleteItem = (ev, item, $index, $mdToast) => {
        let confirm = $mdDialog.confirm()
            .title('Are you sure, you want to delete this item ?')
            .textContent('Clicking on YES, will delete this item permanently!')
            .targetEvent(ev)
            .ok('YES')
            .cancel('NO');
        $mdDialog.show(confirm).then(() => {
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
                    console.error(err, 'ERROR')
                });
        }, () => {
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
                console.error(err, 'ERR');
            });
        };
    }

    // TODO implement why nijel update dialog controller

}

export default AdminWhyNijelCtrl;
