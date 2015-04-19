(function() {
    'use strict'

    angular
        .module('blocks.utils')
        .factory('localStorage', localStorageFactory);

    localStorageFactory.$inject = ['$window'];

    function localStorageFactory($window) {
        return {
            set: function(key, value) {
                $window.localStorage[key] = value;
            },
            get: function(key, defaultValue) {
                return $window.localStorage[key] || defaultValue;
            },
            setObject: function(key, value) {
                $window.localStorage[key] = angular.toJson(value);
            },
            getObject: function(key) {
                return JSON.parse($window.localStorage[key] || '[]');
            },
            destroy: function(key) {
                $window.localStorage.removeItem(key);
            },
            log: function(key, defaultValue) {
                console.log($window.localStorage[key] || defaultValue);
            },
            logObject: function(key) {
                console.log(JSON.parse($window.localStorage[key] || '{}'));
            }
        }
    }

})();
