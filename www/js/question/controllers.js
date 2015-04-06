angular.module('question-app.question.controllers', ['question-app.services', 'question-app.question.services', 'question-app.services'])

// Controller for the Home Page
.controller('QuestionHomeCtrl', function($scope, $ionicActionSheet, $ionicLoading, $timeout, $ionicModal, $messageLoading, questionService, utility) {

    $ionicModal.fromTemplateUrl('templates/question/new-question.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.newQuestionModal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeNewQuestion = function() {
        $scope.newQuestionModal.hide();
    };

    // Open the new question modal
    $scope.newQuestion = function() {
        $scope.question = {
            'title' : '',
            'contet' : '',
            'tags' : ''
        }
        $scope.newQuestionModal.show();
    };

    $scope.doNewQuestion = function() {
        if ($scope.question.title.length > 50) {
            $messageLoading.show('标题不能超过50个字', 1000)
            return;
        } else if ($scope.question.title.length > 140) {
            $messageLoading.show('描述不能超过140个字', 1000)
            return;
        } else {
            $scope.newQuestionModal.hide();
            $messageLoading.show('问题已发送')
        }
    };

    $scope.questions = questionService.getRecentQuestions();

    var formatText = function(text, len) {
        return text.length >= len ? text.substring(0, len) + "..." : text;
    }

    $scope.doRefresh = function() {
        $ionicLoading.show({
            template: '数据读取中...'
        });

        $timeout(function() {
            $ionicLoading.hide();
            $scope.$broadcast('scroll.refreshComplete');
        }, 1000);
    };

    $scope.showActionSheet = function(questionID) {
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

        var addFavorivateQuestion = function(questionID) {
            $ionicLoading.show({
                template: '已收藏'
            });
            $timeout(function() {
                $ionicLoading.hide();
            }, 1000);

        };

        var vewAdvisorDetail = function(questionID) {

        }

        // For example's sake, hide the sheet after two seconds
        $timeout(function() {
            hideSheet();
        }, 2000);

    };

    $scope.getAnswerContent = function(question) {
        var showMore = question.showMore || false;
        var textlen = question.answerContent.length;
        var isTruncate = textlen > 0 ? 100 / textlen >= 0.8 : true;
        if (isTruncate) {
            return question.answerContent;
        }
        return showMore ? question.answerContent : formatText(question.answerContent, 100);
    };

    $scope.showMore = function(question) {
        question.showMore = true;
    };

    $scope.isShowMore = function(question) {
        var textlen = question.answerContent.length;
        var isTruncate = textlen > 0 ? 100 / textlen >= 0.8 : true;
        return !isTruncate && question.answerContent.length >= 100 && !question.showMore;
    };

    $scope.loadMoreData = function() {

    };
})

// Controller for Detail Page
.controller('QuestionDetailCtrl', function($scope, $ionicModal, $ionicLoading, $stateParams, $messageLoading,  questionService) {
    $ionicModal.fromTemplateUrl('templates/question/comment-question.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.commentModal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeAddComment = function() {
        $scope.commentModal.hide();
    };

    // Open the new question modal
    $scope.addComment = function() {
        $scope.comment = '';
        $scope.commentModal.show();
    };

    $scope.doAddComment = function() {
        if ($scope.comment.length > 240) {
            $messageLoading.show('不能超过240个字', 2000)
            return;
        } else {
            $scope.commentModal.hide();
            $messageLoading.show('评论已发送')
        }
    };

    $scope.addFavorite = function() {
        $messageLoading.show('已收藏', 2000)

    };


     $scope.addLike = function() {
         $messageLoading.show('已喜欢', 2000)
    };


    $ionicLoading.show({
        template: 'Loading question...'
    });

    var questionId = $stateParams.questionID;

    $scope.question = questionService.questionOf(questionId);


    $ionicLoading.hide();
})



// Controller for Detail Page
.controller('QuestionSearchCtrl', function($scope, $http, $localstorage, questionService, utility) {});
