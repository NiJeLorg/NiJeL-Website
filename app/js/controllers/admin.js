const AdminCtrl = function ($scope, $state, AdminDataService) {
    $scope.loginErrorMessage = '';
    $scope.signupErrorMessage = '';

    $scope.login = (obj) => {
        AdminDataService.login(obj)
            .then((resp) => {
                localStorage.token = resp.data.token;
                $state.go('admin-dashboard');
            }, (err) => {
                $scope.loginErrorMessage = err.data.message;
            });
    };
    $scope.signup = (obj) => {
        if (obj.password === obj.confirmPassword) {
            AdminDataService.signup(obj)
                .then((resp) => {
                    let result = resp.data.success ? () => {
                        $scope.signupErrorMessage = 'User created!, you can now login on the login section';
                    } : () => {
                        $scope.signupErrorMessage = resp.data.message;
                    };
                    result();
                }, (err) => {
                    $scope.signupErrorMessage = err.data.message;
                });
        } else {
            $scope.signupErrorMessage = 'Make sure your passwords match';
        }
    };
};

export default AdminCtrl;
