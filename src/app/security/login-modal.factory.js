(function() {
    'use strict';

    angular
        .module('app.security')
        .factory('loginModal', loginModalFactory);

    loginModalFactory.$inject = ['$ionicPopup', '$state', '$messageLoading', 'authService'];

    function loginModalFactory($ionicPopup, $state, $messageLoading, authService) {
        var service = {
            show: show
        };

        return service;

        function show(vm, title, callback) {

            var loginSuccessed = false;

            authService.userIsLoggedIn().then(function(response) {
                if (response === true) {
                    callback();
                } else {
                    vm.loginUser = {};
                    vm.errorMessage = '';
                    vm.gotoRegister = function() {
                        confirmPopup.close()
                        $state.go('register');
                    }

                    var confirmPopup = $ionicPopup.confirm({
                        title: title,
                        subTitle: '请输入用户名和密码',
                        template: '<div><label class="item item-input"><input type="text" name="user_name" placeholder="用户名/手机号" ng-model="loginUser.userName" autofocus ></label><label class="item item-input"><input type="password" name="password" ng-model="loginUser.password" placeholder="密码" ></label></div> <p ng-show="errorMessage" class="message error">{{errorMessage}}</p><div class="alternative-actions"> <a class="forgot-password button button-small button-clear" ui-sref="forgot_password">忘记密码?</a><a class="sign-up button button-small button-clear" ng-click="gotoRegister()">注册</a></div>',
                        scope: vm,
                        buttons: [{
                            text: '取消'
                        }, {
                            text: '<b>确定</b>',
                            type: 'button-positive',
                            onTap: function(e) {
                                if (!vm.loginUser.userName || !vm.loginUser.password) {
                                    vm.errorMessage = '用户名和密码不能为空'
                                        //don't allow the user to close unless he enters wifi password
                                    e.preventDefault();
                                } else {
                                    var user = {
                                        username: vm.loginUser.userName,
                                        password: vm.loginUser.password
                                    }

                                    authService.doLogin(user)
                                        .then(function(user) {
                                            loginSuccessed = true;
                                            confirmPopup.close();
                                        }, function(err) {
                                            //err
                                            vm.errorMessage = err;
                                        });

                                    e.preventDefault();
                                }
                            }
                        }]
                    });

                    confirmPopup.then(function() {
                        if (loginSuccessed) {
                            callback();
                        }
                    });
                }


            }, function(error) {
                $messageLoading.show('远程服务器故障，请稍后再试', 1000);
            });
        };
    }
})();
