(function() {
    'use strict';

    angular
        .module('app.security')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['$state', '$ionicHistory', '$ionicLoading', '$messageLoading', 'authService'];

    function RegisterController($state, $ionicHistory, $ionicLoading, $messageLoading, authService) {
        var vm = this;
        vm.user = {};
        vm.doVerifyPhone = doVerifyPhone;
        vm.closeRegister = closeRegister;
        vm.doRegister = doRegister;

        function doVerifyPhone(){
            var phoneNumber = vm.user.telephone || '';

            if (phoneNumber.length == 0) {
                $messageLoading.show('请输入有效号码...', 1000);
                return;
            }

            authService.verifyPhone(phoneNumber)
                .then(function(data) {
                    $messageLoading.show('验证码已发送...', 1000);

                }, function(err) {
                    $messageLoading.show(err, 1000);
                });
        }

        function closeRegister() {
            vm.user = {}
            $ionicHistory.goBack();
        }

        function doRegister() {
            $ionicLoading.show({
                template: '用户注册中...'
            });

            var user = {
                phone: vm.user.telephone,
                verifyCode: vm.user.verifyCode,
                email: vm.user.email,
                fullName: vm.user.fullName,
                password: vm.user.password
            };

            authService.doRegister(user)
                .then(function(user) {
                    //success
                    $state.go('app.home');
                    $ionicLoading.hide();
                }, function(err) {
                    //err
                    vm.error = err;
                    $ionicLoading.hide();
                });
        };
    };
})();
