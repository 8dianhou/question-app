(function() {
    'use strict';

    angular
        .module('app.question')
        .controller('QuestionDetailController', QuestionDetailController);


    QuestionDetailController.$inject = ['$scope', '$stateParams', '$ionicHistory', '$ionicActionSheet', 'routerHelper', '$ionicPopup', '$ionicLoading', '$messageLoading', 'questionService', 'loginModal', '$cordovaCamera'];

    function QuestionDetailController($scope, $stateParams, $ionicHistory, $ionicActionSheet, routerHelper, $ionicPopup, $ionicLoading, $messageLoading, questionService, loginModal, $cordovaCamera) {
        var vm = this;
        var questionId = $stateParams.questionID;
        vm.addComment = addComment;
        vm.goBack = goBack;
        vm.addFavorite = addFavorite;
        vm.addLike = addLike;
        vm.isLiked = isLiked;
        vm.shareAnywhere = shareAnywhere;

        activate();

        function activate() {
            $ionicLoading.show({
                template: 'Loading question...'
            });


            questionService.questionOf(questionId).then(function(data) {
                vm.question = data;

                $ionicLoading.hide();
            });

            questionService.listQuestionComments(questionId).then(function(data) {
                vm.comments = data;
            });
        }


        function shareAnywhere() {
            var options = {
                quality: 75,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.CAMERA,
                allowEdit: true,
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: 300,
                targetHeight: 300,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: false
            };

            $cordovaCamera.getPicture(options).then(function(imageData) {
                $messageLoading.show('照片获取成功', 1000)
            }, function(err) {
                // An error occured. Show a message to the user
            });
        }

        function addComment(answerId) {
            loginModal.show($scope, '注册登录后可评论秒答', function() {
                routerHelper.go('new-comment', {
                    answerId: answerId
                });
            })
        }


        function goBack() {
            $ionicHistory.goBack();
        }



        function addFavorite(questionId) {
            loginModal.show($scope, '注册登录后才可收藏', function() {
                $messageLoading.show(questionId + '已收藏', 2000)
            })
        };


        function addLike(answerId) {
            loginModal.show($scope, '注册登录后才可点赞', function() {
                questionService.addLike(answerId).then(function(result) {

                }, function() {

                });
            })
        }

        function isLiked(answerId) {
            return questionService.isLikedAnswer(answerId);
        }
    }
})();
