const AdminWhyNijelCtrl = function ($scope, $state, $mdDialog, $mdToast, AdminDataService, ClientDataService, $sce) {

    getWhyNijelSections();

    //utlility methods
    $scope.trustAsHtml = (template) => {
        return $sce.trustAsHtml(template);
    };

    function getWhyNijelSections() {
        ClientDataService.fetchWhyNijelSections()
            .then((resp) => {
                $scope.sections = resp.data.sections;
            }, (err) => {
                console.error(err, 'ERROR');
            });
    }

    $scope.updateWhyNijelSection = (event, section) => {
        $mdDialog.show({
            locals: {
                dataToPass: section
            },
            controller: updateWhyNijelSectionDialogController,
            templateUrl: 'views/admin/update-whyNijelSection-dialog.html',
            parent: angular.element(document.body),
            clickOutsideToClose: true,
        });
    };


    $scope.deleteWhyNijelSection = (ev, section, $index, $mdToast) => {
        let confirm = $mdDialog.confirm()
            .title('Are you sure, you want to delete this item ?')
            .textContent('Clicking on YES, will delete this item permanently!')
            .targetEvent(ev)
            .ok('YES')
            .cancel('NO');
        $mdDialog.show(confirm).then(() => {
            AdminDataService.deleteWhyNijelSection(section)
                .then((resp) => {
                    if (resp.data.success) {
                        $scope.sections.forEach((elem, $index) => {
                            if (elem._id === section._id) {
                                console.log($index, "asdcasdcsd");
                                $scope.sections.splice($index, 1);
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
            templateUrl: 'views/admin/add-whyNijelSection-dialog.html',
            parent: angular.element(document.body),
            clickOutsideToClose: true,
        });
    };

    function addWhyNijelSectionDialogController($scope, $mdDialog, $mdToast, Upload) {
        $scope.createNewWhyNijelSection = (file) => {
            if (file) {
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
                                .textContent('Section Successfully added!')
                                .hideDelay(3000)
                        );
                        getWhyNijelSections();
                    }
                }, (err) => {
                    console.error(err, 'ERROR');
                });
            } else {
                AdminDataService.createNewWhyNijelSection($scope.section)
                    .then((resp) => {
                        if (resp.data.success) {
                            $mdDialog.hide();
                            $mdToast.show(
                                $mdToast.simple()
                                    .textContent('Section Successfully added!')
                                    .hideDelay(3000)
                            );
                            getWhyNijelSections();
                        }
                    }, (err) => {
                        console.error(err, 'ERROR')
                    });
            }
        };
    }

    function updateWhyNijelSectionDialogController($scope, $mdDialog, $mdToast, dataToPass, Upload) {
        $scope.section = dataToPass;
        $scope.updateWhyNijelSection = (file) => {
            if (file) {
                file.upload = Upload.upload({
                    url: ('/api/whynijel/' + $scope.section._id),
                    method: 'PUT',
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
                                .textContent('Section Successfully updated!')
                                .hideDelay(3000)
                        );
                    }
                }, (err) => {
                    console.error(err, 'ERR');
                });
            } else {
                AdminDataService.updateWhyNijelSection($scope.section)
                    .then((resp) => {
                        if (resp.data.success) {
                            $mdDialog.hide();
                            $mdToast.show(
                                $mdToast.simple()
                                    .textContent('Section Successfully updated!')
                                    .hideDelay(3000)
                            );
                        }
                    }, (err) => {
                        console.error(err, 'ERR');
                    });
            }
        };

    }

};

export default AdminWhyNijelCtrl;
