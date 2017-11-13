const WhyNijelCtrl = function ($scope, ClientDataService, $sce, $stateParams) {
    $scope.trustAsHtml = (template) => {
        return $sce.trustAsHtml(template);
    };
    $scope.currentUrlTab = $stateParams.tab;
    ClientDataService.fetchWhyNijelSections()
        .then((resp) => {
            $scope.sections = resp.data.sections;
        }, (err) => {
            console.error(err, 'ERROR');
        });   
    $scope.isActive = (tab) => {
        return $scope.currentUrlTab == tab;
    }
};

export default WhyNijelCtrl;
