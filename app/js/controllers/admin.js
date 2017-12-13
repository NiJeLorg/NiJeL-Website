const AdminCtrl = function ($scope, $auth, $state, $window, AdminDataService) {
    $scope.$parent.isAdminState = $state.is('admin');

    $scope.authenticate = (provider) => {
        // $window.location.href = '/auth/google';
        $auth.authenticate(provider)
            .then(function() {
                console.log('You have successfully signed in with ' + provider + '!');
                $state.go('admin.dashboard');
            })
            .catch(function(error) {
                if (error.message) {
                    // Satellizer promise reject error.
                   console.error(error.message);
                } else if (error.data) {
                    // HTTP response error from server
                    console.error(error.data.message, error.status);
                } else {
                    console.error(error);
                }
            });
    };

};

export default AdminCtrl;
