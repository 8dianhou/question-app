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
                        controller: 'QuestionHomeCtrl'
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
                        controller: 'QuestionDetailCtrl'
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
                controller: 'NewQuestionCtrl',
                data: {
                    authenticate: true
                }
            }

        }, {
            state: 'new-comment',
            config: {
                url: "/new-comment/:answerId",
                templateUrl: "app/question/new-comment.html",
                controller: 'QuestionCommentCtrl',
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
