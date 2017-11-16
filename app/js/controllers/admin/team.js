const AdminTeamCtrl = function ($scope, $state, $mdDialog, $mdToast, AdminDataService, ClientDataService, $sce) {

    $scope.team = getTeam();
    //utlility methods
    $scope.trustAsHtml = (template) => {
        return $sce.trustAsHtml(template);
    };

    $scope.fetchTeam = () => {
        getTeam();
    };

    // TODO Implement update team member

    $scope.deleteItem = (ev, item, $index, $mdToast) => {
        let confirm = $mdDialog.confirm()
            .title('Are you sure, you want to delete this item ?')
            .textContent('Clicking on YES, will delete this item permanently!')
            .targetEvent(ev)
            .ok('YES')
            .cancel('NO');
        $mdDialog.show(confirm).then(() => {
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
                    console.error(err, 'ERROR')
                });
        }, () => {
            console.error('Item not deleted!');
        });
    };

    function getTeam(){
        ClientDataService.fetchTeamMembers()
            .then((resp) => {
                $scope.team = resp.data.teamMembers;
            }, (err) => {
                console.error(err, 'ERROR');
            });
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
                    console.error(err, 'ERROR');
                });
        };
    }

    // TODO implement team member update dialog

    $scope.launchAddTeamMemberModal = (ev) => {
        $mdDialog.show({
            controller: addTeamMemberDialogController,
            templateUrl: 'views/add-teamMember-dialog.html',
            parent: angular.element(document.body),
            clickOutsideToClose: true,
        });
    };
}

export default AdminTeamCtrl;
