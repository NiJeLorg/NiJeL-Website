import moment from 'moment';
import $ from 'jquery';


const HomeCtrl = function($scope, ClientDataService, $document, $sce) {

    $scope.isAdminState = false;
    $scope.targetAttr = "";
    $scope.trustAsHtml = (text) => {
        return $sce.trustAsHtml(text);
    }


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
                     // replace #hashtags and @mentions
                    tweet.text = tweet.text.replace( /(^|\s)#(\w*[a-zA-Z_]+\w*)/gim, '$1<a href="https://twitter.com/search?q=%23$2"' + $scope.targetAttr + ' target="_blank">#$2</a>').
                                replace(/(^|\s)\@(\w*[a-zA-Z_]+\w*)/gim, '$1<a href="https://twitter.com/$2"' + $scope.targetAttr + 'target="_blank" >@$2</a>');

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
