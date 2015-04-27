(function() {
    'use strict';

    angular
        .module('app.question')
        .controller('QuestionCommentController', QuestionCommentController);


    QuestionCommentController.$inject = ['$stateParams', '$ionicHistory', '$messageLoading', 'questionService'];


    function QuestionCommentController($stateParams, $ionicHistory, $messageLoading, questionService) {
        var vm = this;
        vm.comment = {
            data: ''
        };
        vm.closeAddComment = closeAddComment;
        vm.doAddComment = doAddComment;

        function closeAddComment() {
            vm.comment = {};
            $ionicHistory.goBack();
        };

        function doAddComment() {
            if (vm.comment.data.length > 240) {
                $messageLoading.show('不能超过240个字', 2000)
                return;
            } else {
                questionService.addNewComment($stateParams.answerId, vm.comment.data).then(function(result) {
                    if (result) {
                        vm.comment = {};
                        $ionicHistory.goBack();
                        $messageLoading.show('评论已添加', 1000)
                    } else {
                        $messageLoading.show('评论添加失败，请稍候重试！', 1000)
                    }
                }, function() {

                });
            }
        }
    }
})();
