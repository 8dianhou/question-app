(function() {
    'use strict';

    angular
        .module('app.security')
        .provider('authService', AuthServiceProvider);

    AuthServiceProvider.$inject = [];

    function AuthServiceProvider() {
        this.$get = AuthService;

        AuthService.$inject = ['$rootScope', '$http', '$q', 'localStorage', 'restfulHelper', 'tokenStorage', 'SERVER_API_URL'];

        function AuthService($rootScope, $http, $q, localStorage, restfulHelper, tokenStorage, SERVER_API_URL) {

            var USER_KEY = '_user_';
            var ACTIVE_STATE = '_active_state';


            var service = {
                saveActiveState: saveActiveState,
                retrieveAncClearActiveState: retrieveAncClearActiveState,
                verifyPhone: verifyPhone,
                userIsLoggedIn: userIsLoggedIn,
                doLogin: doLogin,
                doRegister: doRegister,
                doForgotPassword: doForgotPassword,
                logOut: logOut,
                updateUserInfo: updateUserInfo,
                saveUser: saveUser,
                getUser: getUser
            };

            return service;

            function saveActiveState(activeState) {
                localStorage.setObject(ACTIVE_STATE, activeState)
            };


            function retrieveAncClearActiveState() {
                var activeState = localStorage.getObject(ACTIVE_STATE);
                localStorage.destroy(ACTIVE_STATE);

                return activeState
            };


            // validate the user phone
            function verifyPhone(phoneNumber) {
                return restfulHelper.jsonp(SERVER_API_URL + 'api/user/verify_phone', {
                    phone: phoneNumber
                });
            };

            function userIsLoggedIn() {
                var deferred = $q.defer();


               var authToken = tokenStorage.retrieve();
               var user = localStorage.getObject(USER_KEY);

               if(authToken && user.length !== 0) {
                    var now = new Date();

                    if(now.getTime() < user.data.expires) {
                        deferred.resolve(true);
                    } 
               }

               deferred.resolve(false);

               return deferred.promise;



                // var user = localStorage.getObject(USER_KEY);
                // if (user.length !== 0) {
                //     restfulHelper.jsonp(SERVER_API_URL + 'api/user/validate_auth')
                //         .then(function(result) {
                //             deferred.resolve(result);
                //         }, function() {
                //             deferred.resolve(false);
                //         });

                // } else {
                //     deferred.resolve(false);
                // }
                // return deferred.promise;
            };

            function doLogin(user) {
                var deferred = $q.defer(),
                    authService = this;


                //restfulHelper.jsonp(SERVER_API_URL + 'api/user/auth/v2', user)
                restfulHelper.post(SERVER_API_URL + 'api/user/authentication/v2', user, {}, {}, true)

                .then(function(result, status, headers) {
                    //recieve and store the user's cookie in the local storage
                    var data = result.data;
                    var userInfo = {
                        data: data,
                        user_id: data.accountId
                    };

                    authService.saveUser(userInfo);

                    var headers = result.headers;

                    tokenStorage.store(headers('X-AUTH-TOKEN'));

                    deferred.resolve(userInfo);
                }, function(reason) {
                    deferred.reject(reason);
                });


                return deferred.promise;
            };

            function doRegister(user) {
                var deferred = $q.defer(),
                    authService = this;

                restfulHelper.jsonp(SERVER_API_URL + 'api/user/regisiter', {
                    phone: user.phone,
                    verify_code: user.verifyCode,
                    email: user.email,
                    fullname: user.fullName,
                    password: user.password
                }).then(function(data) {
                    //recieve and store the user's cookie in the local storage
                    var user = {
                        data: data,
                        user_id: data.accountId
                    };

                    authService.saveUser(user);

                    deferred.resolve(data);
                }, function(error) {
                    deferred.reject(error);
                });

                return deferred.promise;
            };


            function doForgotPassword(username) {
                var deferred = $q.defer();
                $http.jsonp(SERVER_API_URL + 'user/retrieve_password/' +
                        '?user_login=' + username +
                        '&callback=JSON_CALLBACK')
                    .success(function(data) {
                        deferred.resolve(data);
                    })
                    .error(function(data) {
                        deferred.reject(data);
                    });
                return deferred.promise;
            };

            function logOut() {

                tokenStorage.clear();   
                //empty user data
                localStorage.destroy(USER_KEY);
            };

            //update user avatar from WP
            function updateUserInfo() {
                var deferred = $q.defer(),
                    authService = this,
                    user = localStorage.getObject(USER_KEY).data;

                restfulHelper.jsonp(SERVER_API_URL + 'api/user/info', {
                    accountId: user.accountId
                }).then(function(result, status, headers) {
                    var userInfo = {
                        data: result,
                        user_id: result.accountId
                    };

                    authService.saveUser(userInfo);



                    deferred.resolve(result);
                }, function(err) {
                    console.log('更新用户数据错误' +
                        err);
                });

                return deferred.promise;
            };

            function saveUser(user) {
                localStorage.setObject(USER_KEY, user);
            };

            function getUser() {
                var user = localStorage.getObject(USER_KEY);

                if (user['data']) {
                    return {
                        avatar: localStorage.getObject(USER_KEY).data.avatarUrl,
                        fullname: localStorage.getObject(USER_KEY).data.fullname,
                        logined: true
                    }
                } else {
                    return {
                        avatar: 'img/avatars/avatar.jpg',
                        fullname: '您尚未登录',
                        logined: false
                    };
                }
            };
        };

    }

})();
