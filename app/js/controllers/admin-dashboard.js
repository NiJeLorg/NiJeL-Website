const AdminDashboardCtrl = function ($scope, $sce) {
    //utlility methods
    $scope.trustAsHtml = (template) => {
        return $sce.trustAsHtml(template);
    };
};

export default AdminDashboardCtrl;
