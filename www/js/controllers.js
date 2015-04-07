angular.module('question-app.controllers', [])



// WALKTHROUGH
.controller('WalkthroughCtrl', function($scope, $state, $ionicSlideBoxDelegate) {

    $scope.$on('$ionicView.enter', function() {
        //this is to fix ng-repeat slider width:0px;
        $ionicSlideBoxDelegate.$getByHandle('walkthrough-slider').update();
    });
})


//LOGIN
.controller('LoginCtrl', function($scope, $state, $ionicLoading, AuthService) {
    $scope.user = {};
    $scope.error = false;


    $scope.closeLogin = function() {
        $scope.user = {}
        $state.go('walkthrough');
    }

    $scope.doLogin = function() {

        $ionicLoading.show({
            template: '登录中...'
        });

        var user = {
            username: $scope.user.userName,
            password: $scope.user.password
        };

        AuthService.doLogin(user)
            .then(function(user) {

                var activeState = AuthService.retrieveAncClearActiveState()
                    //success
                if (activeState.length !== 0) {
                    $state.go(activeState);
                } else {
                    $state.go('app.question.home');
                }

                $ionicLoading.hide();
            }, function(err) {
                //err
                $scope.error = err;
                $ionicLoading.hide();
            });
    };
})


// REGISTER
.controller('RegisterCtrl', function($scope, $state, $ionicLoading, $messageLoading, AuthService) {
    $scope.user = {};

    $scope.doVerifyPhone = function() {
        var phoneNumber = $scope.user.telephone;

        if (phoneNumber.length == 0) {
            $messageLoading.show('请输入有效号码...', 1000);
            return;
        }

        AuthService.verifyPhone(phoneNumber)
            .then(function(data) {
                $messageLoading.show('验证码已发送...', 1000);

            }, function(err) {
                $messageLoading.show(err, 1000);
            });
    }

    $scope.closeRegister = function() {
        $scope.user = {}
        $state.go('walkthrough');
    }

    $scope.doRegister = function() {

        $ionicLoading.show({
            template: '用户注册中...'
        });

        var user = {
            phone: $scope.user.telephone,
            verifyCode: $scope.user.verifyCode,
            email: $scope.user.email,
            fullName: $scope.user.fullName,
            password: $scope.user.password
        };

        AuthService.doRegister(user)
            .then(function(user) {
                //success
                $state.go('app.home');
                $ionicLoading.hide();
            }, function(err) {
                //err
                $scope.error = err;
                $ionicLoading.hide();
            });
    };
})

.controller('AppCtrl', function($scope, AuthService) {
    $scope.$on('$ionicView.enter', function() {
        $scope.user = AuthService.getUser();
    });
})


// SETTINGS
.controller('SettingCtrl', function($scope, $ionicActionSheet, $ionicModal, $state, AuthService) {
    $scope.notifications = true;
    $scope.sendLocation = false;

    $ionicModal.fromTemplateUrl('templates/partials/terms.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.terms_modal = modal;
    });

    $ionicModal.fromTemplateUrl('templates/partials/faqs.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.faqs_modal = modal;
    });



    $scope.showTerms = function() {
        $scope.terms_modal.show();
    };

    $scope.showFAQS = function() {
        $scope.faqs_modal.show();
    };


    // Triggered on a the logOut button click
    $scope.showLogOutMenu = function() {

        // Show the action sheet
        var hideSheet = $ionicActionSheet.show({
            //Here you can add some more buttons
            // buttons: [
            // { text: '<b>Share</b> This' },
            // { text: 'Move' }
            // ],
            destructiveText: '退出',
            titleText: '这么好的应用，确定退出吗?',
            cancelText: '取消',
            cancel: function() {
                // add cancel code..
            },
            buttonClicked: function(index) {
                //Called when one of the non-destructive buttons is clicked,
                //with the index of the button that was clicked and the button object.
                //Return true to close the action sheet, or false to keep it opened.
                return true;
            },
            destructiveButtonClicked: function() {
                //Called when the destructive button is clicked.
                //Return true to close the action sheet, or false to keep it opened.
                AuthService.logOut();
                $state.go('app.question.home');
            }
        });
    };
})


.controller('FavoritesCtrl', function($scope, $ionicActionSheet, $ionicLoading, $timeout) {
    $scope.favorites = [{
        "id": 1,
        "questionId": "IAM-Q-2015-03-17-A8074AA2",
        "replierName": "Alwen Lu",
        "title": "秒答是什么？",
        "replier": {
            "name": "Alwen Lu",
            "avatarUrl": "http://www.8dianhou.com/api/avatar/avatar-38d5f641-9198-4df7-a7ba-c75309018519.png",
            "headline": "8点后产品经理"
        }
    }, {
        "id": 2,
        "questionId": "Q-2015-04-02-86101397-35E",
        "title": "大学生如何在未进入professional service industry之前积累优质资源进行成功的科技创业?",
        "replier": {
            "name": "Kelly Lu",
            "avatarUrl": "http://www.8dianhou.com/api/avatar/avatar-1e5c1ef9-d8fe-4876-8465-23d9db424822.png",
            "headline": "Managing Director at Kelly Placement, CEO at CareerFrog"
        }
    }];


});
