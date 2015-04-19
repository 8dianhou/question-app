(function() {
    'use strict';

    angular
        .module('app.security')
        .controller('LoginController', LoginController);


    LoginController.$inject = ['$state', '$ionicHistory', '$ionicLoading', 'authService'];


    function LoginController($state, $ionicHistory, $ionicLoading, authService) {
        var vm = this;
        vm.user = {};
        vm.error = false;
        vm.closeLogin = closeLogin;
        vm.doLogin = doLogin;
        vm.title = '欢迎回来'

        function closeLogin() {
            vm.user = {}
            $ionicHistory.goBack();
        }

        function doLogin() {

            $ionicLoading.show({
                template: '登录中...'
            });

            var user = {
                username: vm.user.userName,
                password: vm.user.password
            };

            authService.doLogin(user)
                .then(function(user) {

                    var activeState = authService.retrieveAncClearActiveState()
                        //success
                    if (activeState.length !== 0) {
                        $state.go(activeState);
                    } else {
                        $state.go('app.question.home');
                    }

                    $ionicLoading.hide();
                }, function(err) {
                    //err
                    vm.error = err;
                    $ionicLoading.hide();
                });
        };
    }
})();
