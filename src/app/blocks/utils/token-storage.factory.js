(function() {
    'use strict'

    angular
        .module('blocks.utils')
        .factory('tokenStorage', tokenStorageFactory);

    tokenStorageFactory.$inject = ['$window'];

    function tokenStorageFactory($window) {
        var storageKey = 'auth_token';

        var service = {
            store: store,
            retrieve : retrieve,
            clear : clear
        };

        return service;

        function store(token) {
            return $window.localStorage.setItem(storageKey, token);
        }

        function retrieve() {
            return $window.localStorage.getItem(storageKey);
        }

        function clear() {
            return $window.localStorage.removeItem(storageKey);
        }
    }

})();
