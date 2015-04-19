(function() {
    'use strict';

    angular
        .module('app.security')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }


    function getStates() {
        return [{
            state: 'login',
            config: {
                url: "/login",
                templateUrl: "app/security/login.html",
                controller: 'LoginController as vm',
		        title: 'Login',
                data: {
                    authenticate: false
                }
            }
        }, {
            state: 'register',
            config: {
                url: "/register",
                templateUrl: "app/security/register.html",
                controller: 'RegisterController as vm',
                data: {
                    authenticate: false
                }
            }
        }];

    }
})();
