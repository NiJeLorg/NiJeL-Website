const WhyNijelCtrl = function ($scope, ClientDataService, $sce) {
    $scope.trustAsHtml = (template) => {
        return $sce.trustAsHtml(template);
    };
    ClientDataService.fetchWhyNijelSections()
        .then((resp) => {
            $scope.sections = resp.data.sections;
        }, (err) => {
            console.log(err, 'ERROR');
        });
};

export default WhyNijelCtrl;
