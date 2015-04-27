(function() {
    'use strict';

    angular
        .module('app.user')
        .controller('UserAnswersController', UserAnswersController);

    UserAnswersController.$inject = ['$scope', '$ionicLoading', '$ionicModal', 'routerHelper', '$messageLoading', 'questionService', 'dateFormatter', 'loginModal'];

    function UserAnswersController($scope, $ionicLoading, $ionicModal, routerHelper, $messageLoading, questionService, dateFormatter, loginModal) {
        var vm = this;
        var nextLinkURl = null;
        vm.loadMoreData = loadMoreData;
        vm.doRefresh = doRefresh;
        vm.moreDataCanBeLoaded = moreDataCanBeLoaded;
        vm.viewDetails = viewDetails;
        vm.answerQuestion = answerQuestion;
        vm.closeAnswerModal = closeAnswerModal;
        vm.formatChinaTime = dateFormatter.formatChinaTime;
        vm.doAnswer = doAnswer;
      
        activate();

        function activate() {
            doRefresh();

            $ionicModal.fromTemplateUrl('app/user/answer-question.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function(modal) {
                vm.answerModal = modal;
            });
        }

        function doRefresh() {
            $ionicLoading.show({
                template: '数据读取中...'
            });

            questionService.myAnsweredQuestions().then(function(data) {
                vm.questions = data['data'];

                if (data.linkNext && data['linkNext']['href']) {
                    nextLinkURl = data.linkNext.href;
                } else {
                    nextLinkURl = null;
                }

                $ionicLoading.hide();
                $scope.$broadcast('scroll.refreshComplete');

                var i = 0;

                for (; i < vm.questions.length; i++) {
                    questionService.questionOf(vm.questions[i].questionId);
                }
            }, function(errMsg) {
                $ionicLoading.hide();

                $messageLoading.show(errMsg, 1000);
            });
        }


        function loadMoreData() {
            if (nextLinkURl != null) {
                questionService.loadMoreQuestions(nextLinkURl)
                    .then(function(data) {
                        vm.questions = vm.questions.concat(data['data']);

                        if (data.linkNext && data['linkNext']['href']) {
                            nextLinkURl = data.linkNext.href;
                        } else {
                            nextLinkURl = null;
                        }

                        $scope.$broadcast('scroll.infiniteScrollComplete');
                    });
            }
        };


        function moreDataCanBeLoaded() {
            var canLoadedMore = vm.questions && vm.questions.length > 1;

            return canLoadedMore;
        }

        function answerQuestion(index) {
            var question = vm.questions[index];

            vm.answer = {
                questionIndex: index,
                data: ''
            };

            vm.answerModal.show();

        }

        function closeAnswerModal() {
            vm.answerModal.hide();
        }

        function viewDetails(index) {
             var question = vm.questions[index];

            if (question.status == 'FINISHED') {
                routerHelper.go('app.question.detail', {
                    questionID: question.questionId
                });
            } 
            // else {
            //     vm.currentQuestion = question;

            //     console.log(question);
            //     vm.detailModal.show();
            // }
        }

        function doAnswer() {

            var currentQuestion = vm.questions[vm.answer.questionIndex];

            questionService.doAnswer(currentQuestion.questionId, vm.answer.data).then(
                function(answerId) {
                    vm.answerModal.hide();

                    currentQuestion.status = 'FINISHED';

                    $messageLoading.show('回答提交成功', 1000);
                },
                function(error) {
                    vm.answerModal.hide();
                    $messageLoading.show(error, 1000);
                }
            );

        }

     
    }
})();
