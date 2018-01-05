import moment from 'moment';
import $ from 'jquery';


const HomeCtrl = function($scope, ClientDataService, $document) {

    $scope.isAdminState = false;
    $scope.processTab = 'our-process';

    let testimonialIndex;
    $scope.tweets = [];

    ClientDataService.fetchTestimonials()
        .then((resp) => {
            if (resp.data.testimonials) {
                $scope.testimonials = resp.data.testimonials;
                testimonialIndex = 0;
                $scope.currentTestimonial = $scope.testimonials[testimonialIndex];
            }
        }, (err) => {
            console.log(err, 'ERR');
        });


    $scope.selectTestimonial = (typeOfMovement) => {
        if (typeOfMovement === 'next') {
            if (testimonialIndex === ($scope.testimonials.length - 1)) {
                testimonialIndex = $scope.testimonials.length - 1;
            } else {
                testimonialIndex++;
            }
        } else if (typeOfMovement === 'previous') {
            if (testimonialIndex === 0) {
                testimonialIndex = 0;
            } else {
                testimonialIndex--;
            }
        }
        $scope.currentTestimonial = $scope.testimonials[testimonialIndex];
    };

    ClientDataService.fetchLastThreeTweets()
        .then((resp) => {
            if (resp.data.success) {
                JSON.parse(resp.data.tweets).forEach((tweet, index) => {
                    tweet.created_at = moment(tweet.created_at).format("MMM Do");
                    $scope.tweets.push(tweet);
                });
            }
        }, (err) => {
            console.log(err, 'ERR');
        });

    
        

    $(window).scroll((e) => {
        if ($(document).scrollTop() >= 80) {
            $('.main-nav').css({
                'position': 'fixed',
                'background': '#fff',
                'height': '100px',
                'margin-top': '0',
                'box-shadow': '1px 1px 20px 0 rgba(0, 0, 0, 0.5)'
            });
            $('.nav-links a').css({
                'color': '#787976'
            });
            $('.open-nav-logo').css({
                'opacity': '0',
                'display': 'none'
            });
            $('.nav-logo').css({
                'display': 'block'
            });
            localStorage.navbarToggle = true;
        }
    });

};

export default HomeCtrl;
