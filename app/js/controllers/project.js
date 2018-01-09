const ProjectCtrl = function ($scope, $stateParams, ClientDataService)  {
    ClientDataService.fetchSingleProject($stateParams.id)
        .then((resp) => {
            $scope.project = resp.data.project;
        }, (err) => {
            console.log(err, 'ERR');
        });
};

export default ProjectCtrl;
