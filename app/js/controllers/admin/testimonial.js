const AdminTestimonialCtrl = function ($scope, $state, $mdDialog, $mdToast, AdminDataService, ClientDataService, $sce) {

    getTestimonials();
    //utlility methods
    $scope.trustAsHtml = (template) => {
        return $sce.trustAsHtml(template);
    };

    function getTestimonials() {
        ClientDataService.fetchTestimonials()
            .then((resp) => {
                $scope.testimonials = resp.data.testimonials;
            }, (err) => {
                console.error(err, 'ERROR');
            });
    }

    // run actions on respective resources
    $scope.updateTestimonial = (event, testimonial) => {
        $mdDialog.show({
            locals: {
                dataToPass: testimonial
            },
            controller: updateTestimonialDialogController,
            templateUrl: 'views/admin/update-testimonial-dialog.html',
            parent: angular.element(document.body),
            clickOutsideToClose: true,
        });
    };

    $scope.deleteTestimonial = (ev, testimonial, $index, $mdToast) => {
        let confirm = $mdDialog.confirm()
            .title('Are you sure, you want to delete this item ?')
            .textContent('Clicking on YES, will delete this item permanently!')
            .targetEvent(ev)
            .ok('YES')
            .cancel('NO');
        $mdDialog.show(confirm).then(() => {
            AdminDataService.deleteTestimonial(testimonial)
                .then((resp) => {
                    if (resp.data.success) {
                        $scope.testimonials.forEach((elem, $index) => {
                            if (elem._id === testimonial._id) {
                                $scope.testimonials.splice($index, 1);
                            }
                        });
                    }
                }, (err) => {
                    console.error(err, 'ERR');
                });
        }, () => {
        });
    };

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
                    getTestimonials();
                }, (err) => {
                    console.error(err, 'ERROR');
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
            templateUrl: 'views/admin/add-testimonial-dialog.html',
            parent: angular.element(document.body),
            clickOutsideToClose: true,
        });
    };
}

export default AdminTestimonialCtrl;
