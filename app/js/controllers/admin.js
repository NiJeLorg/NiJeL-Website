const AdminCtrl = function ($scope, $auth, $state, $mdToast, $window, AdminDataService) {
    $scope.$parent.isAdminState = $state.is('admin');

    $scope.authenticate = (provider) => {
        $auth.authenticate(provider)
            .then(function() {
                $state.go('admin.dashboard').then(
                    $mdToast.show($mdToast.simple().textContent('You have successfully signed in with ' + provider + '!'))
                );

            })
            .catch(function(error) {
                if (error.data.message) {
                    $mdToast.show($mdToast.simple().textContent(error.data.message).highlightClass("md-warn"));
                }
            });
    };

};

export default AdminCtrl;
