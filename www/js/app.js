// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('question-app', ['ionic', 'question-app.directives', 'question-app.controllers', 'question-app.filters', 'question-app.services', 'question-app.config', 'question-app.question.controllers', 'ngCordova'])

.run(['$ionicPlatform', 'AuthService', '$rootScope', '$state', function($ionicPlatform, AuthService, $rootScope, $state) {
    $ionicPlatform.ready(function() {
        AuthService.userIsLoggedIn().then(function(response) {

            //update user info and go on
            if (response === true) {
                console.log('user is logged in, update the user info');

                AuthService.updateUserInfo();
            } else {
                console.log('user is logged out, remove the user info');

                AuthService.logOut();
            }

            $state.go('app.question.home');
        }, function() {
            alert('error');

        });

        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });


    // UI Router Authentication Check
    $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
        if (toState.data.authenticate) {
            AuthService.userIsLoggedIn().then(function(response) {
                if (response === false) {
                    event.preventDefault();
                    AuthService.saveActiveState(toState.name);
                    $state.go('walkthrough');
                }
            });
        }
    });
}])

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('walkthrough', {
            url: "/walkthrough",
            templateUrl: "templates/walkthrough.html",
            controller: 'WalkthroughCtrl',
            data: {
                authenticate: false
            }
        })

    .state('login', {
        url: "/login",
        templateUrl: "templates/login.html",
        controller: 'LoginCtrl',
        data: {
            authenticate: false
        }
    })

    .state('register', {
        url: "/register",
        templateUrl: "templates/register.html",
        controller: 'RegisterCtrl',
        data: {
            authenticate: false
        }
    })

    .state('app', {
        url: "/app",
        abstract: true,
        templateUrl: "templates/main.html",
        controller: 'AppCtrl'
    })


    .state('app.settings', {
        url: "/settings",
        views: {
            'menuContent': {
                templateUrl: "templates/settings.html",
                controller: 'SettingCtrl'
            }
        },
        data: {
            authenticate: true
        }
    })


    // This state is for the Youtube  example, using Tabs
    .state('app.question', {
        url: '/question',
        abstract: true,
        views: {
            'menuContent': {
                templateUrl: 'templates/question/question-main.html',
                controller: 'AppCtrl'
            }
        }
    })

    .state('app.question.home', {
        url: "/home",
        views: {
            'question-home': {
                templateUrl: 'templates/question/question-home.html',
                controller: 'QuestionHomeCtrl'
            }
        },
        data: {
            authenticate: false
        }
    })

    .state('app.question.detail', {
        url: "/:questionID",
        views: {
            'question-home': {
                templateUrl: 'templates/question/question-detail.html',
                controller: 'QuestionDetailCtrl'
            }
        },
        data: {
            authenticate: false
        }
    })

    .state('new-question', {
        url: "/new-question",
        templateUrl: 'templates/question/new-question.html',
        controller: 'NewQuestionCtrl',
        data: {
            authenticate: true
        }
    })


    .state('new-comment', {
        url: "/new-comment/:answerId",
        templateUrl: "templates/question/new-comment.html",
        controller: 'QuestionCommentCtrl',
        data: {
            authenticate: true
        }
    })



    // This state is for the Youtube  example, using Tabs
    .state('app.user', {
        url: '/user',
        abstract: true,
        views: {
            'menuContent': {
                templateUrl: 'templates/user/user-main.html',
                controller: 'AppCtrl'
            }
        }
    })

    // Each tab has its own nav history stack:

    // state for the user questions Page
    .state('app.user.questions', {
        url: '/questions',
        views: {
            'tab-user-questions': {
                templateUrl: 'templates/user/user-questions.html',
                controller: 'AppCtrl'
            }
        },
        data: {
            authenticate: false
        }
    })

    // state for the user answers Page
    .state('app.user.answers', {
        url: '/answers',
        views: {
            'tab-user-answers': {
                templateUrl: 'templates/user/user-answers.html',
                controller: 'AppCtrl'
            }
        },
        data: {
            authenticate: false
        }
    })

    // state for the user favorites Page
    .state('app.user.favorites', {
        url: '/favorites',
        views: {
            'tab-user-favorites': {
                templateUrl: 'templates/user/user-favorites.html',
                controller: 'FavoritesCtrl'
            }
        },
        data: {
            authenticate: false
        }
    })




    .state('app.finding', {
        url: "/finding",
        views: {
            'menuContent': {
                templateUrl: "templates/finding.html"
            }
        },
        data: {
            authenticate: false
        }
    })

    .state('app.topic', {
        url: "/topic",
        views: {
            'menuContent': {
                templateUrl: "templates/topic.html"
            }
        },
        data: {
            authenticate: false
        }
    })

    .state('app.browse', {
        url: "/browse",
        views: {
            'menuContent': {
                templateUrl: "templates/browse.html"
            }
        },
        data: {
            authenticate: false
        }
    })


    .state('app.single', {
        url: "/playlists/:playlistId",
        views: {
            'menuContent': {
                templateUrl: "templates/playlist.html",
                controller: 'PlaylistCtrl'
            }
        },
        data: {
            authenticate: false
        }

    });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/question/home');
});
