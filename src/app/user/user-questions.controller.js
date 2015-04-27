(function() {
    'use strict';

    angular
        .module('app.user')
        .controller('UserQuestionsController', UserQuestionsController);


    UserQuestionsController.$inject = ['$scope', '$ionicLoading', '$ionicModal', 'routerHelper', '$messageLoading', 'questionService', 'dateFormatter', 'loginModal'];

    function UserQuestionsController($scope, $ionicLoading, $ionicModal, routerHelper, $messageLoading, questionService, dateFormatter, loginModal) {
        var vm = this;
        var nextLinkURl = null;
        vm.loadMoreData = loadMoreData;
        vm.doRefresh = doRefresh;
        vm.moreDataCanBeLoaded = moreDataCanBeLoaded;
        vm.viewDetails = viewDetails;
        vm.closeDetailModal = closeDetailModal;
        vm.formatChinaTime = dateFormatter.formatChinaTime;
        vm.newQuestion = newQuestion;


        activate();

        function activate() {
            doRefresh();

            $ionicModal.fromTemplateUrl('app/user/user-question-detail.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function(modal) {
                vm.detailModal = modal;
            });
        }

        function doRefresh() {
            $ionicLoading.show({
                template: '数据读取中...'
            });

            questionService.myQuestions().then(function(data) {
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

        function viewDetails(index) {
            var question = vm.questions[index];

            if (question.status == 'FINISHED') {
                routerHelper.go('app.question.detail', {
                    questionID: question.questionId
                });
            } else {
                vm.currentQuestion = question;

                console.log(question);
                vm.detailModal.show();
            }
        }

        function closeDetailModal() {
            vm.detailModal.hide();
        }

        // Open the new question modal
        function newQuestion() {
            loginModal.show($scope, '注册登录后可提交问题', function() {
                routerHelper.go('new-question');
            })
        }
    }
})();
