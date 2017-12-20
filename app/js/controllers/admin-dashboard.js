const AdminDashboardCtrl = function ($scope, $sce, $auth, $state) {
    //utlility methods
    $scope.trustAsHtml = (template) => {
        return $sce.trustAsHtml(template);
    };
    $scope.logout = () => {
        $auth.logout().then(function(){
            $state.go('home');
        });
    };
};

export default AdminDashboardCtrl;
