const ServicesCtrl = function ($scope, ClientDataService, $sce, $stateParams) {
    ClientDataService.fetchServices()
        .then((resp) => {
            $scope.services = resp.data.services;
        }, (err) => {
            console.error(err, 'ERROR');
        });

};

export default ServicesCtrl;