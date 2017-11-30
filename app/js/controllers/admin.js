const AdminCtrl = function ($scope, $state, $window, AdminDataService) {
    $scope.$parent.isAdminState = $state.is('admin');

    $scope.authenticate = () => {
        $window.location.href = '/auth/google';
    };
};

export default AdminCtrl;
