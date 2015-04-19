(function() {
    'use strict';

    angular.module('app.layout')
        .controller('WalkthroughConroller', WalkthroughConroller);


    WalkthroughConroller.$inject = ['$scope', '$state', '$ionicSlideBoxDelegate'];

    function WalkthroughConroller($scope, $state, $ionicSlideBoxDelegate) {

        $scope.$on('$ionicView.enter', function() {
            //this is to fix ng-repeat slider width:0px;
            $ionicSlideBoxDelegate.$getByHandle('walkthrough-slider').update();
        });

    };
})();
