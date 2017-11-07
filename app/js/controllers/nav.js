const NavCtrl = function ($scope, ClientDataService, $sce) {
    $scope.trustAsHtml = (template) => {
        return $sce.trustAsHtml(template);
    };

    ClientDataService.fetchWhyNijelSections()
        .then((resp) => {
            $scope.titles = [];
            resp.data.sections.forEach(function (section) {
                $scope.titles.push(section.title);
            });
        }, (err) => {
            console.error(err, 'ERROR');
        });
};

export default NavCtrl;
