const AdminTestimonialCtrl = function ($scope, $state, $mdDialog, $mdToast, AdminDataService, ClientDataService, $sce) {

    $scope.testimonials = getTestimonials();
    //utlility methods
    $scope.trustAsHtml = (template) => {
        return $sce.trustAsHtml(template);
    };

    $scope.fetchTestimoials = () => {
        getTestimonials();
    };


    // run actions on respective resources
    $scope.updateProject = (event, testimonial) => {
            $mdDialog.show({
                locals: {
                    dataToPass: testimonial
                },
                controller: updateTestimonialDialogController,
                templateUrl: 'views/update-testimonial-dialog.html',
                parent: angular.element(document.body),
                clickOutsideToClose: true,
            });
    };

    $scope.deleteItem = (ev, item, $index, $mdToast) => {
        let confirm = $mdDialog.confirm()
            .title('Are you sure, you want to delete this item ?')
            .textContent('Clicking on YES, will delete this item permanently!')
            .targetEvent(ev)
            .ok('YES')
            .cancel('NO');
        $mdDialog.show(confirm).then(() => {
            AdminDataService.deleteTestimonial(item)
                .then((resp) => {
                    if (resp.data.success) {
                        $scope.items.forEach((elem) => {
                            if (elem._id === item._id) {
                                $scope.items.splice($index, 1);
                            }
                        });
                    }
                }, (err) => {
                    console.log(err, 'ERR');
                });
        }, () => {
            console.log('Item not deleted!');
        });
    };

    function getTestimonials(){
        ClientDataService.fetchTestimonials()
            .then((resp) => {
                $scope.testimonials = resp.data.testimonials;
            }, (err) => {
                console.log(err, 'ERROR');
            });
    }

    function addTestimonialDialogController($scope, $mdDialog, $mdToast) {
        $scope.createNewTestimonial = () => {
            AdminDataService.createNewTestimonial($scope.newTestimonial)
                .then((resp) => {
                    $mdDialog.hide();
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent(resp.data.message)
                            .hideDelay(3000)
                    );
                }, (err) => {
                    console.log(err, 'ERROR');
                });
        };
    }

    function updateTestimonialDialogController($scope, $mdDialog, $mdToast, dataToPass) {
        $scope.testimonial = dataToPass;

        $scope.updateTestimonial = () => {
            AdminDataService.updateTestimonial($scope.testimonial)
                .then((res) => {
                    $mdDialog.hide();
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('Testimonial successfully updated!')
                            .hideDelay(3000)
                    );
                }, (err) => {
                    $mdDialog.hide();
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('Testimonial not updated!')
                            .hideDelay(3000)
                    );
                });
        };
    }

    $scope.launchAddTestimonialModal = (ev) => {
        $mdDialog.show({
            controller: addTestimonialDialogController,
            templateUrl: 'views/add-testimonial-dialog.html',
            parent: angular.element(document.body),
            clickOutsideToClose: true,
        });
    };
}

export default AdminTestimonialCtrl;
