// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
(function() {
    'use strict';

    angular.module('question-app', [
        'ionic',
        'app.core',
        'app.security',
        'app.question',
        'app.user',
        'app.settings',
        'ngCordova'
    ])


    .run(['$ionicPlatform', 'authService', '$rootScope', '$state', 'pushNotificationsService', function($ionicPlatform, authService, $rootScope, $state, pushNotificationsService) {
        $ionicPlatform.ready(function() {
            authService.userIsLoggedIn().then(function(response) {
                //update user info and go on
                if (response === true) {
                    console.log('user is logged in, update the user info');

                    authService.updateUserInfo();
                } else {
                    console.log('user is logged out, remove the user info');

                    authService.logOut();
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

            pushNotificationsService.register();
        });

        // $ionicPlatform.on("resume", function() {
        //     authService.userIsLoggedIn().then(function(response) {
        //         //update user info and go on
        //         if (response === true) {
        //             console.log('user is logged in, update the user info');

        //             authService.updateUserInfo();
        //         } else {
        //             console.log('user is logged out, remove the user info');

        //             authService.logOut();
        //         }

        //         $state.go('app.question.home');
        //     }, function() {
        //         alert('error');
        //     });

        //     pushNotificationsService.register();
        // });


        // UI Router Authentication Check
        $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
            if (toState.data.authenticate) {
                authService.userIsLoggedIn().then(function(response) {
                    if (response === false) {
                        event.preventDefault();
                        authService.saveActiveState(toState.name);
                        $state.go('walkthrough');
                    }
                });
            }
        });
    }]);
})();
