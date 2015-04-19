(function() {
    'use strict'

    angular
        .module('blocks.utils')
        .factory('$messageLoading', messageLoadingFactory);

    messageLoadingFactory.$inject = ['$ionicLoading', '$timeout'];

    function messageLoadingFactory($ionicLoading, $timeout) {
        return {
            show: function(text, delayMils) {
                $ionicLoading.show({
                    template: text
                });

                $timeout(function() {
                    $ionicLoading.hide();
                }, delayMils);
            }
        };
    }
})();
