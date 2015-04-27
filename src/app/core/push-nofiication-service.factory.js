(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('pushNotificationsService', pushNotificationsServiceFactory);


    pushNotificationsServiceFactory.$inject = ['$rootScope', '$state', '$cordovaPush', '$ionicHistory', '$cordovaToast'];


    /* @ngInject */
    function pushNotificationsServiceFactory($rootScope, $state, $cordovaPush, $ionicHistory, $cordovaToast) {
        var service = {
            register: register,
            unregister: unregister
        };

        return service;

        function register() {

            if (!isDevice()) {
                return;
            }



            var config = null;

            if (ionic.Platform.isAndroid()) {
                config = {
                    "senderID": "YOUR_GCM_PROJECT_ID" // REPLACE THIS WITH YOURS FROM GCM CONSOLE - also in the project URL like: https://console.developers.google.com/project/434205989073
                };
            } else if (ionic.Platform.isIOS()) {
                config = {
                    "badge": "true",
                    "sound": "true",
                    "alert": "true"
                }
            }

            $cordovaPush.register(config).then(function(result) {
                console.log("Register success " + result);

                $cordovaToast.showShortCenter('Registered for push notifications');
                $scope.registerDisabled = true;
                // ** NOTE: Android regid result comes back in the pushNotificationReceived, only iOS returned here
                if (ionic.Platform.isIOS()) {
                    $scope.regId = result;
                    storeDeviceToken("ios");
                }
            }, function(err) {
                console.log("Register error " + err)
            });



            // Notification Received
            $rootScope.$on('$cordovaPush:notificationReceived', function(event, notification) {
                console.log(JSON.stringify([notification]));
                if (ionic.Platform.isAndroid()) {
                    handleAndroid(notification);
                } else if (ionic.Platform.isIOS()) {
                    handleIOS(notification);
                    $scope.$apply(function() {
                        $scope.notifications.push(JSON.stringify(notification.alert));
                    })
                }
            });


        }

        function unregister() {


            console.log("Unregister called");

            if (!isDevice()) {
                return;
            }

            removeDeviceToken();
            $scope.registerDisabled = false;
        }

        // Android Notification Received Handler
        function handleAndroid(notification) {}

        // IOS Notification Received Handler
        function handleIOS(notification) {}

        // Stores the device token in a db using node-pushserver (running locally in this case)
        //
        // type:  Platform type (ios, android etc)
        function storeDeviceToken(type) {


        }

        // Removes the device token from the db via node-pushserver API unsubscribe (running locally in this case).
        // If you registered the same device with different userids, *ALL* will be removed. (It's recommended to register each
        // time the app opens which this currently does. However in many cases you will always receive the same device token as
        // previously so multiple userids will be created with the same token unless you add code to check).
        function removeDeviceToken() {
            var tkn = {
                "token": 111
            };

            console.log("UnRegister tkn " + String.stringify(tkn));
        }

        function isDevice() {
            var deviceInformation = ionic.Platform.device();

            for (var prop in deviceInformation) {
                if (deviceInformation.hasOwnProperty(prop))
                    return true;
            }

            return false;

        }
    }
})();
