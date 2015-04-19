(function() {
    'use strict'

    angular
        .module('app.user')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [{
            state: 'app.user',
            config: {
                url: '/user',
                abstract: true,
                views: {
                    'menuContent': {
                        templateUrl: 'app/user/user-main.html',
                        //controller: 'AppCtrl'
                    }
                }
            }
        }, {
            state: 'app.user.questions',
            config: {
                url: '/questions',
                views: {
                    'tab-user-questions': {
                        templateUrl: 'app/user/user-questions.html',
                        //controller: 'AppCtrl'
                    }
                },
                data: {
                    authenticate: false
                }

            }
        }, {
            state: 'app.user.answers',
            config: {
                url: '/answers',
                views: {
                    'tab-user-answers': {
                        templateUrl: 'app/user/user-answers.html',
                       // controller: 'AppCtrl'
                    }
                },
                data: {
                    authenticate: false
                }

            }
        }, {
            state: 'app.user.favorites',
            config: {
                url: '/favorites',
                views: {
                    'tab-user-favorites': {
                        templateUrl: 'app/user/user-favorites.html',
                        controller: 'UserFavoritesController as vm'
                    }
                },
                data: {
                    authenticate: false
                }
            }
        }];
    }

})();
