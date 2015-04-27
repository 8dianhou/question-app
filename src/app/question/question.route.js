(function() {
    'use strict';

    angular
        .module('app.question')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        var otherwise = '/app/question/home';
        routerHelper.configureStates(getStates(), otherwise);
    }

    function getStates() {
        return [{
            state: 'app.question',
            config: {
                url: '/question',
                abstract: true,
                views: {
                    'menuContent': {
                        templateUrl: 'app/question/question-main.html',
                        //  controller: 'AppCtrl'
                    }
                }

            }
        }, {
            state: 'app.question.home',
            config: {
                url: "/home",
                views: {
                    'question-home': {
                        templateUrl: 'app/question/question-home.html',
                        controller: 'QuestionHomeController as vm'
                    }
                },
                data: {
                    authenticate: false
                }
            }
        }, {
            state: 'app.question.detail',
            config: {
                url: "/:questionID",
                views: {
                    'question-home': {
                        templateUrl: 'app/question/question-detail.html',
                        controller: 'QuestionDetailController as vm'
                    }
                },
                data: {
                    authenticate: false
                }
            }
        }, {
            state: 'app.question.search',
            config: {
                url: "/search",
                views: {
                    'question-home': {
                        templateUrl: 'app/question/search-home.html',
                        controller: 'QuestionSearchHomeController as vm'
                    }
                },
                data: {
                    authenticate: false
                }
            }
        }, {
            state: 'new-question',
            config: {
                url: "/new-question",
                templateUrl: 'app/question/new-question.html',
                controller: 'QuestionNewController as vm',
                data: {
                    authenticate: true
                }
            }

        }, {
            state: 'new-comment',
            config: {
                url: "/new-comment/:answerId",
                templateUrl: "app/question/new-comment.html",
                controller: 'QuestionCommentController as vm',
                data: {
                    authenticate: true
                }
            }
        }, {
            state: 'app.finding',
            config: {
                url: "/finding",
                views: {
                    'menuContent': {
                        templateUrl: "app/question/finding.html"
                    }
                },
                data: {
                    authenticate: false
                }
            }
        }, {
            state: 'app.topic',
            config: {
                url: "/topic",
                views: {
                    'menuContent': {
                        templateUrl: "app/question/topic.html"
                    }
                },
                data: {
                    authenticate: false
                }
            }
        }];
    }

})();
