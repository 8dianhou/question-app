(function() {
    'use strict';

    angular
        .module('app.settings')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [{
            state: 'app.settings',
            config: {
                url: "/settings",
                views: {
                    'menuContent': {
                        templateUrl: "app/settings/settings.html",
                        controller: 'SettingsController as vm'
                    }
                },
                data: {
                    authenticate: true
                }
            }
        }];
    }
})();
