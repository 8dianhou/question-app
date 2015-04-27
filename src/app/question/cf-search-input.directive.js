(function() {
    'use strict';

    angular
        .module('app.question')
        .directive('cfSearchInput', cfSearchInput);


    /* @ngInject */
    function cfSearchInput() {
        return {
            restrict: 'E',
            require: 'ngModel',
            replace: true,
            scope: {},
            controller: function($scope) {},
            link: function(scope, element, attrs, ctrls) {
                attrs.minLength = attrs.minLength || 0;
                scope.placeholder = attrs.placeholder || '';
                scope.searchText = {
                    value: ctrls.$viewValue
                };

                if (attrs.class)
                    element.addClass(attrs.class);


                scope.clearSearch = function() {
                    scope.searchText.value = '';
                };

                scope.$watch('searchText.value', function(value) {
                    if (ctrls.$viewValue != value) {
                        ctrls.$setViewValue(value);
                    }
                });
            },
            template: '<div class="item-input-wrapper">' +
                '<i class="icon ion-android-search"></i>' +
                '<input type="search" placeholder="{{placeholder}}" ng-model="searchText.value" autofocus>' +
                '<i ng-if="searchText.value.length > 0" ng-click="clearSearch()" class="icon ion-close"></i>' +
                '</div>'
        };
    }

})();
