const AdminCtrl = function ($scope, $state, AdminDataService) {
    $scope.$parent.isAdminState = $state.is('admin');

    $scope.authenticate = () => {
        AdminDataService.login()
            .then((success) => {
                console.log(success)
            });
    };
};

export default AdminCtrl;
