const NavCtrl = function ($scope, ClientDataService, $sce, $stateParams) {
    $scope.trustAsHtml = (template) => {
        return $sce.trustAsHtml(template);
    };
    console.log($stateParams);

    ClientDataService.fetchWhyNijelSections()
        .then((resp) => {
            $scope.titles = [];
            resp.data.sections.forEach(function(section){
                $scope.titles.push(section.title);
            });
            console.log($scope.titles)
        }, (err) => {
            console.log(err, 'ERROR');
        });
};

export default NavCtrl;
