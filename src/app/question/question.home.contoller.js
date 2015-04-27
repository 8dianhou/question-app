(function() {
    'use strict';

    angular
        .module('app.question')
        .controller('QuestionHomeController', QuestionHomeController);


    QuestionHomeController.$inject = ['$scope', 'routerHelper', '$ionicLoading', '$messageLoading', 'questionService', 'loginModal'];

    function QuestionHomeController($scope, routerHelper, $ionicLoading, $messageLoading, questionService, loginModal) {
        var vm = this;
        var nextLinkURl = null;
        vm.loadMoreData = loadMoreData;
        vm.doRefresh = doRefresh;
        vm.moreDataCanBeLoaded = moreDataCanBeLoaded;
        vm.newQuestion = newQuestion;
        vm.doNewQuestion = doNewQuestion;

        activate();


        function activate() {

            doRefresh();

            // listen to event
            $scope.$on("question-ranked", function(event, index, rank) {
                vm.questions[index].totalRanks = vm.questions[index].totalRanks + rank;
            })
        }



        function doRefresh() {
            $ionicLoading.show({
                template: '数据读取中...'
            });

            questionService.getRecentQuestions().then(function(data) {
                vm.questions = data['data'];

                if (data.linkNext && data['linkNext']['href']) {
                    nextLinkURl = data.linkNext.href;
                } else {
                    nextLinkURl = null;
                }

                $ionicLoading.hide();
                $scope.$broadcast('scroll.refreshComplete');
            }, function(error) {
                $ionicLoading.hide();

                $messageLoading.show(error, 1000);

                $scope.$broadcast('scroll.refreshComplete');
            });
        };


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

        // Open the new question modal
        function newQuestion() {
            loginModal.show($scope, '注册登录后可提交问题', function() {
                routerHelper.go('new-question');
            })
        }

        function doNewQuestion() {
            if (vm.question.title.length > 50) {
                $messageLoading.show('标题不能超过50个字', 1000)
                return;
            } else if (vm.question.title.length > 140) {
                $messageLoading.show('描述不能超过140个字', 1000)
                return;
            } else {
                vm.newQuestionModal.hide();
                $messageLoading.show('问题已发送')
            }
        }
    }

})();
