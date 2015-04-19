(function() {
    'use strict';

    angular
        .module('app.layout')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [{
            state: 'app',
            config: {
                url: "/app",
                abstract: true,
                templateUrl: "app/layout/main.html",
                controller: 'AppController'
            }
        }, {
            state: 'walkthrough',
            config: {
                url: "/walkthrough",
                templateUrl: "app/layout/walkthrough.html",
                controller: 'WalkthroughConroller',
                data: {
                    authenticate: false
                }
            }
        }];
    }



})();
