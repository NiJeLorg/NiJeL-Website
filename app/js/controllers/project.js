const ProjectCtrl = ($scope, $stateParams, ClientDataService) => {
    ClientDataService.fetchSingleProject($stateParams.id)
        .then((resp) => {
            console.log(resp);
            $scope.project = resp.data.project;
        }, (err) => {
            console.log(err, 'ERR');
        });    
};

export default ProjectCtrl;
