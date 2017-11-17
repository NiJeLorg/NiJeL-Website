const AdminTeamCtrl = function ($scope, $state, $mdDialog, $mdToast, AdminDataService, ClientDataService, $sce) {

    getTeam();
    //utlility methods
    $scope.trustAsHtml = (template) => {
        return $sce.trustAsHtml(template);
    };

    function getTeam() {
        ClientDataService.fetchTeamMembers()
            .then((resp) => {
                $scope.team = resp.data.teamMembers;
            }, (err) => {
                console.error(err, 'ERROR');
            });
    }

    $scope.updateTeamMember = (event, teamMember) => {
        $mdDialog.show({
            locals: {
                dataToPass: teamMember
            },
            controller: updateTeamMemberDialogController,
            templateUrl: 'views/admin/update-team-member-dialog.html',
            parent: angular.element(document.body),
            clickOutsideToClose: true,
        });
    };
    $scope.deleteTeamMember = (ev, teamMember, $index, $mdToast) => {
        let confirm = $mdDialog.confirm()
            .title('Are you sure, you want to delete this item ?')
            .textContent('Clicking on YES, will delete this item permanently!')
            .targetEvent(ev)
            .ok('YES')
            .cancel('NO');
        $mdDialog.show(confirm).then(() => {
            AdminDataService.deleteTeamMember(teamMember)
                .then((resp) => {
                    if (resp.data.success) {
                        $scope.team.forEach((elem, $index) => {
                            if (elem._id === teamMember._id) {
                                $scope.team.splice($index, 1);
                            }
                        });
                    }
                }, (err) => {
                    console.error(err, 'ERROR')
                });
        }, () => {
            console.error('Item not deleted!');
        });
    };


    function addTeamMemberDialogController($scope, $mdDialog, $mdToast, Upload) {
        $scope.createNewTeamMember = (file) => {
            if (file) {
                file.upload = Upload.upload({
                    url: '/api/team/',
                    data: {
                        photo: file,
                        obj: $scope.teamMember
                    }
                });

                file.upload.then((resp) => {
                    if (resp.data.success) {
                        $mdDialog.hide();
                        $mdToast.show(
                            $mdToast.simple()
                                .textContent('Team Member Successfully added!')
                                .hideDelay(3000)
                        );
                        getWhyNijelSections();
                    }
                }, (err) => {
                    console.error(err, 'ERROR');
                });
            } else {
                AdminDataService.createNewTeamMember($scope.teamMember)
                    .then((resp) => {
                        if (resp.data.success) {
                            $mdDialog.hide();
                            $mdToast.show(
                                $mdToast.simple()
                                    .textContent('Team Member Successfully added!')
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

    function updateTeamMemberDialogController($scope, $mdDialog, $mdToast, dataToPass, Upload) {
        $scope.teamMember = dataToPass;
        $scope.updateTeamMember = (file) => {
            if (file) {
                file.upload = Upload.upload({
                    url: ('/api/team/' + $scope.teamMember._id),
                    method: 'PUT',
                    data: {
                        photo: file,
                        obj: $scope.teamMember
                    }
                });

                file.upload.then((resp) => {
                    if (resp.data.success) {
                        $mdDialog.hide();
                        $mdToast.show(
                            $mdToast.simple()
                                .textContent('Team Member Successfully updated!')
                                .hideDelay(3000)
                        );
                    }
                }, (err) => {
                    console.error(err, 'ERR');
                });
            } else {
                AdminDataService.updateTeamMember($scope.teamMember)
                    .then((resp) => {
                        if (resp.data.success) {
                            $mdDialog.hide();
                            $mdToast.show(
                                $mdToast.simple()
                                    .textContent('Team Member Successfully updated!')
                                    .hideDelay(3000)
                            );
                        }
                    }, (err) => {
                        console.error(err, 'ERR');
                    });
            }
        };

    }

    $scope.launchAddTeamMemberModal = (ev) => {
        $mdDialog.show({
            controller: addTeamMemberDialogController,
            templateUrl: 'views/admin/add-teamMember-dialog.html',
            parent: angular.element(document.body),
            clickOutsideToClose: true,
        });
    };
}

export default AdminTeamCtrl;
