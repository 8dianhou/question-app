(function() {
    'use strict';

    angular
        .module('app.question')
        .directive('cfQuestionCard', cfQuestionCard);


    /* @ngInject */
    function cfQuestionCard() {
        var directive = {
            restrict: 'EA',
            templateUrl: 'app/question/question-card.html',
            scope: {
                question: '=',
                index: '='
            },
            controller: QuestionCardController,
            controllerAs: 'vm',
            bindToController: true // because the scope is isolated
        }

        return directive;


    }

    QuestionCardController.$inject = ['$scope', '$ionicActionSheet', 'routerHelper', '$timeout', '$messageLoading', 'questionService', 'loginModal', 'dateFormatter'];

    function QuestionCardController($scope, $ionicActionSheet, routerHelper, $timeout, $messageLoading, questionService, loginModal, dateFormatter) {
        var vm = this;

        vm.addLike = addLike;
        vm.isLiked = isLiked;
        vm.viewComments = viewComments;
        vm.showActionSheet = showActionSheet;
        vm.getAnswerContent = getAnswerContent;
        vm.showMore = showMore;
        vm.isShowMore = isShowMore;
        vm.formatChinaTime = dateFormatter.formatChinaTime;


        function addLike(index, answerId) {
            loginModal.show($scope, '注册登录后才可点赞', function() {
                questionService.addLike(answerId).then(function(result) {
                    // Emit event
                    $scope.$emit("question-ranked", index, result ? 1 : -1);
                }, function() {

                });
            })
        }

        function isLiked(answerId) {
            return questionService.isLikedAnswer(answerId);
        }

        function viewComments(questionId, answerId, totalComments) {

            if (totalComments > 0) {
                routerHelper.go('app.question.detail', {
                    questionID: questionId
                });
            } else {
                loginModal.show($scope, '注册登录后可评论秒答', function() {
                    routerHelper.go('new-comment', {
                        answerId: answerId
                    });
                })
            }
        }

        // Open the new question modal
        function newQuestion() {
            loginModal.show($scope, '注册登录后可提交问题', function() {
                routerHelper.go('new-question');
            })
        };

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
        };



        function formatText(text, len) {
            return text.length >= len ? text.substring(0, len) + "..." : text;
        }

        function showActionSheet(questionID) {
            // Show the action sheet
            var hideSheet = $ionicActionSheet.show({
                buttons: [{
                    text: '收藏'
                }, {
                    text: '查看导师'
                }],
                cancelText: '取消',
                buttonClicked: function(index) {
                    if (index == 0) {
                        addFavorivateQuestion(questionID);
                    } else if (index == 1) {
                        vewAdvisorDetail(questionID);
                    }
                    return true;
                }
            });

            function addFavorivateQuestion(questionID) {
                loginModal.show($scope, '注册登录后才可收藏', function() {
                    $messageLoading.show(questionID + '已收藏', 1000);
                });
            };

            function vewAdvisorDetail(questionID) {

            }

            // For example's sake, hide the sheet after two seconds
            $timeout(function() {
                hideSheet();
            }, 2000);

        };

        function getAnswerContent(question) {
            var showMore = question.showMore || false;
            var textlen = question.answerContent.length;
            var isTruncate = textlen > 0 ? 100 / textlen >= 0.8 : true;
            if (isTruncate) {
                return question.answerContent;
            }
            return showMore ? question.answerContent : formatText(question.answerContent, 100);
        };

        function showMore(question) {
            question.showMore = true;
        };

        function isShowMore(question) {
            var textlen = question.answerContent.length;
            var isTruncate = textlen > 0 ? 100 / textlen >= 0.8 : true;
            return !isTruncate && question.answerContent.length >= 100 && !question.showMore;
        };
    }
})();
