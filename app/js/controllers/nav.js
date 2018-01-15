const NavCtrl = function ($scope, ClientDataService, $sce) {
    $scope.trustAsHtml = (template) => {
        return $sce.trustAsHtml(template);
    };

    ClientDataService.fetchWhyNijelSections()
        .then((resp) => {
            $scope.titles = [];
            resp.data.sections.forEach( (section) => {
                $scope.titles.push(section.title);
            });
        }, (err) => {
            console.error(err, 'ERROR');
        });
    
    ClientDataService.fetchServices()
        .then((resp)=> {
            $scope.serviceTitles = [];
            resp.data.services.forEach( (service) => {
                $scope.serviceTitles.push(service.title)
            });
        }, (err) => {
            console.error(err, 'ERROR')
        });

};

export default NavCtrl;
