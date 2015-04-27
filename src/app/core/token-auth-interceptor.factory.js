(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('tokenAuthInterceptor', tokenAuthInterceptorFactory)
        .config(function($httpProvider) {
			$httpProvider.interceptors.push('tokenAuthInterceptor');
		});

    tokenAuthInterceptorFactory.$inject = ['$q', 'tokenStorage'];

	 /* @ngInject */
    function tokenAuthInterceptorFactory($q, tokenStorage) {
        var service = {
            request: request,
            responseError: responseError
        };

        return service;

        function request(config) {
        	var authToken = tokenStorage.retrieve();
			if (authToken) {
				config.headers['X-AUTH-TOKEN'] = authToken;
			}
			return config;

        }

        function responseError(error) {
        	if (error.status === 401 || error.status === 403) {
				TokenStorage.clear();
			}
			return $q.reject(error);
        }

       
    }
})();
