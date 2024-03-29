(function() {
    'use strict';

    angular
        .module('app.security')
        .directive('cfShowHideContainer', cfshowHideContainer)
        .directive('cfShowHideInput', cfShowHideInput);


    /* @ngInject */
    function cfshowHideContainer() {
        return {
            scope: {

            },
            controller: function($scope, $element, $attrs) {
                $scope.show = false;

                $scope.toggleType = function($event) {
                    $event.stopPropagation();
                    $event.preventDefault();

                    $scope.show = !$scope.show;

                    // Emit event
                    $scope.$broadcast("toggle-type", $scope.show);
                };
            },
            templateUrl: 'app/security/show-hide-password.html',
            restrict: 'A',
            replace: false,
            transclude: true
        };
    }

    function cfShowHideInput() {
         return {
        scope: {

        },
        link: function(scope, element, attrs) {
            // listen to event
            scope.$on("toggle-type", function(event, show) {
                var password_input = element[0],
                    input_type = password_input.getAttribute('type');

                if (!show) {
                    password_input.setAttribute('type', 'password');
                }

                if (show) {
                    password_input.setAttribute('type', 'text');
                }
            });
        },
        require: '^cfShowHideContainer',
        restrict: 'A',
        replace: false,
        transclude: false
    };
    }

})();