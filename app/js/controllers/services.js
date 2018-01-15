const ServicesCtrl = function ($scope, ClientDataService, $sce, $stateParams) {
    $scope.trustAsHtml = (template) => {
        return $sce.trustAsHtml(template);
    };
    $scope.currentTab = $stateParams.serviceTab;
    ClientDataService.fetchServices()
        .then((resp) => {
            $scope.services = resp.data.services;
        }, (err) => {
            console.error(err, 'ERROR');
        });
    $scope.isActive = (serviceTab) => {
        return $scope.currentTab == serviceTab;
    }
};

export default ServicesCtrl;