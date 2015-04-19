(function() {
    'use strict';

    angular
        .module('app.layout')
        .controller('AppController', AppController);


    AppController.$inject = ['$scope', '$state', '$ionicSlideBoxDelegate', 'authService'];


    function AppController($scope, $state, $ionicSlideBoxDelegate, authService) {
        $scope.$on('$ionicView.enter', function() {
            $scope.user = authService.getUser();
        });
    }
})();
