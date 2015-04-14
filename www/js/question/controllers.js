angular.module('question-app.question.controllers', ['question-app.services', 'question-app.question.services', 'question-app.services'])

// Controller for the Home Page
.controller('QuestionHomeCtrl', function($scope, $ionicActionSheet, $state, $ionicPopup, $ionicLoading, $timeout, $ionicModal, $messageLoading, QuestionService, LoginModal, AuthService, utility) {
    var nextLinkURl = null;


    $scope.doRefresh = function() {
        $ionicLoading.show({
            template: '数据读取中...'
        });

        QuestionService.getRecentQuestions().then(function(data) {
            $scope.questions = data['data'];

            if (data.linkNext && data['linkNext']['href']) {
                nextLinkURl = data.linkNext.href;
            } else {
                nextLinkURl = null;
            }

            $ionicLoading.hide();
            $scope.$broadcast('scroll.refreshComplete');
        });
    };


    $scope.loadMoreData = function() {
        if (nextLinkURl != null) {
            QuestionService.loadMoreQuestions(nextLinkURl)
                .then(function(data) {
                    $scope.questions = $scope.questions.concat(data['data']);

                    if (data.linkNext && data['linkNext']['href']) {
                        nextLinkURl = data.linkNext.href;
                    } else {
                        nextLinkURl = null;
                    }

                    $scope.$broadcast('scroll.infiniteScrollComplete');
                });
        }
    };


    $scope.moreDataCanBeLoaded = function() {
        var canLoadedMore = $scope.questions && $scope.questions.length > 1;

        return canLoadedMore;
    };


    $scope.addLike = function(index, answerId) {
        LoginModal.show($scope, '注册登录后才可点赞', function() {
            QuestionService.addLike(answerId).then(function(result) {
                if (result) {
                    $scope.questions[index].totalRanks = $scope.questions[index].totalRanks + 1;
                } else {
                    $scope.questions[index].totalRanks = $scope.questions[index].totalRanks - 1;
                }
            }, function() {

            });
        })
    }

    $scope.isLiked = function(answerId) {
        return QuestionService.isLikedAnswer(answerId);
    }

    $scope.viewComments = function(answerId) {
        LoginModal.show($scope, '注册登录后可评论秒答', function() {
            $state.go('new-comment', {
                answerId: answerId
            });
        })
    }

    // Open the new question modal
    $scope.newQuestion = function() {
        LoginModal.show($scope, '注册登录后可提交问题', function() {
            $state.go('new-question');
        })
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



    var formatText = function(text, len) {
        return text.length >= len ? text.substring(0, len) + "..." : text;
    }

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

    $scope.doRefresh();
})



// Controller for Detail Page
.controller('QuestionDetailCtrl', function($scope, $ionicHistory, $state, $ionicModal, $ionicLoading, $stateParams, $messageLoading, $cordovaInAppBrowser, LoginModal, QuestionService) {
    // $ionicModal.fromTemplateUrl('templates/question/comment-question.html', {
    //     scope: $scope
    // }).then(function(modal) {
    //     $scope.commentModal = modal;
    // });

    var questionId = $stateParams.questionID;


    $scope.shareAnywhere = function() {
        var options = {
            location: 'yes',
            clearcache: 'yes',
            toolbar: 'no'
        };

        $cordovaInAppBrowser.open('http://ngcordova.com', '_blank', options)
            .then(function(event) {
                // success
            })
            .catch(function(event) {
                // error
            });


        //$cordovaInAppBrowser.close();
    }

    $scope.addComment = function(answerId) {
        LoginModal.show($scope, '注册登录后可评论秒答', function() {
            $state.go('new-comment', {
                 answerId: answerId
            });
        })
    }


    $scope.goBack = function() {
        $ionicHistory.goBack();
    }



    $scope.addFavorite = function() {
        $messageLoading.show('已收藏', 2000)

    };


     $scope.addLike = function(answerId) {
        LoginModal.show($scope, '注册登录后才可点赞', function() {
            QuestionService.addLike(answerId).then(function(result) {
                
            }, function() {

            });
        })
    }

    $scope.isLiked = function(answerId) {
        return QuestionService.isLikedAnswer(answerId);
    }


    $ionicLoading.show({
        template: 'Loading question...'
    });


    QuestionService.questionOf(questionId).then(function(data) {
        $scope.question = data;

        $ionicLoading.hide();
    });

    QuestionService.listQuestionComments(questionId).then(function(data) {
        $scope.comments = data;
    });

})

// Controller for Detail Page
.controller('QuestionCommentCtrl', function($scope, $stateParams, $ionicHistory, $messageLoading, QuestionService) {

    $scope.comment = {
        data: ''
    }

    $scope.closeAddComment = function() {
        $scope.comment = {};
        $ionicHistory.goBack();
    };

    $scope.doAddComment = function() {
        if ($scope.comment.data.length > 240) {
            $messageLoading.show('不能超过240个字', 2000)
            return;
        } else {
            QuestionService.addNewComment($stateParams.answerId, $scope.comment.data).then(function(result) {
                if (result) {
                    $scope.comment = {};
                    $ionicHistory.goBack();
                    $messageLoading.show('评论已添加', 1000)
                } else {
                    $messageLoading.show('评论添加失败，请稍候重试！', 1000)
                }
            }, function() {

            });
        }
    };
})

// Controller for Detail Page
.controller('NewQuestionCtrl', function($scope, $stateParams, $ionicHistory, $ionicLoading, $messageLoading, QuestionService) {
    $scope.question = {
        title: '',
        content: '',
        tags: ''
    }

    $scope.close = function() {
        $scope.question = {
            title: '',
            content: '',
            tags: ''
        }
        $ionicHistory.goBack();
    };

    $scope.doNewQuestion = function() {
        if ($scope.question.title.length > 50) {
            $messageLoading.show('标题不能超过50个字', 1000)
            return;
        } else if ($scope.question.content.length > 140) {
            $messageLoading.show('描述不能超过140个字', 1000)
            return;
        } else {
            var question = {
                title: $scope.question.title,
                content: $scope.question.content,
                tags: $scope.question.tags
            }

            QuestionService.newQuestion(question).then(
                function() {
                    $scope.question = {}
                    $ionicHistory.goBack();
                    $messageLoading.show('问题已发送', 1000);
                });
        }

    }

})



// Controller for Detail Page
.controller('QuestionSearchCtrl', function($scope, $http, $localstorage, questionService, utility) {});
