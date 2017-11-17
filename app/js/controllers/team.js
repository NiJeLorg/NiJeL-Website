const TeamCtrl = function ($scope, $mdDialog, ClientDataService)  {

    $scope.activeMember = {};

    ClientDataService.fetchTeamMembers()
        .then((resp) => {
            $scope.teamMembers = resp.data.teamMembers;
        }, (err) => {
            console.log(err, 'ERR');
        });

    $scope.selectMember = (obj) => {
        $scope.activeMember = obj;
    };

    $scope.launchTeamMemberModal = (ev, teamMember) => {
        $mdDialog.show({
            controller: teamMemberDialogController,
            templateUrl: 'views/team-member-dialog.html',
            locals: {
                projects: teamMember
            },
            parent: angular.element(document.body),
            clickOutsideToClose: true,
        });
    };

    function teamMemberDialogController($scope, items, $sce) {
        $scope.member = items;
        $scope.trustAsHtml = (template) => {
            return $sce.trustAsHtml(template);
        };

    }

};

export default TeamCtrl;
