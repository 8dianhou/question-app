(function() {
    'use strict';

    angular
        .module('app.question')
        .factory('questionService', QuestionServiceFactory);

    QuestionServiceFactory.$inject = ['$q', 'restfulHelper', 'localStorage', 'SERVER_API_URL'];

    function QuestionServiceFactory($q, restfulHelper, localStorage, SERVER_API_URL) {
        var service = {
            questionOf: questionOf,
            listQuestionComments: listQuestionComments,
            getRecentQuestions: getRecentQuestions,
            loadMoreQuestions: loadMoreQuestions,
            addNewComment: addNewComment,
            isLikedAnswer: isLikedAnswer,
            addLike: addLike,
            newQuestion: newQuestion,
            searchQuestions: searchQuestions,
            myQuestions: myQuestions,
            myAnsweredQuestions: myAnsweredQuestions,
            doAnswer: doAnswer
        };

        return service;

        function questionOf(questionID) {
            var deferred = $q.defer();

            restfulHelper.jsonp(SERVER_API_URL + 'api/question/' + questionID + '.jsonp').then(function(data) {
                deferred.resolve(data);
            });

            return deferred.promise;
        }

        function searchQuestions(searchText) {
            var deferred = $q.defer();

            restfulHelper.jsonp(SERVER_API_URL + '/api/question/search.jsonp', {
                q: searchText
            }).then(function(data) {
                deferred.resolve(data);
            }, function(error) {
                deferred.reject(error);
            });

            return deferred.promise;
        }


        function listQuestionComments(questionID) {
            var deferred = $q.defer();

            restfulHelper.jsonp(SERVER_API_URL + 'api/question/' + questionID + '/comments.jsonp').then(function(data) {
                deferred.resolve(data);
            });

            return deferred.promise;
        }

        function getRecentQuestions(sid, pSize) {
            var deferred = $q.defer();


            restfulHelper.jsonp(SERVER_API_URL + 'api/questions.jsonp').then(function(data) {
                deferred.resolve(data);
            }, function(error) {
                deferred.reject(error);
            });

            return deferred.promise;
        }

        function loadMoreQuestions(url) {
            var deferred = $q.defer();

            restfulHelper.jsonp(url).then(function(data) {
                deferred.resolve(data);
            });

            return deferred.promise;
        }


        function addNewComment(answerId, content) {
            var deferred = $q.defer();

            restfulHelper.jsonp(SERVER_API_URL + 'api/question/comment.jsonp', {
                answer_id: answerId,
                content: content
            }).then(function(data) {
                deferred.resolve(data);
            });

            return deferred.promise;
        }

        function isLikedAnswer(answerId) {
            var likes = localStorage.getObject('Likes');

            if (likes.length != 0 && likes[answerId]) {
                return true;
            } else {
                return false;
            }
        }


        function addLike(answerId) {
            var deferred = $q.defer();

            restfulHelper.jsonp(SERVER_API_URL + 'api/question/rank.jsonp', {
                answer_id: answerId
            }).then(function(data) {
                if (data) {
                    var likes = localStorage.getObject('Likes');

                    if (likes.length === 0) {
                        likes = {};
                        likes[answerId] = true;
                    } else {
                        likes[answerId] = true;
                    }

                    localStorage.setObject('Likes', likes)
                } else {
                    var likes = localStorage.getObject('Likes');

                    if (likes.length != 0 && likes[answerId]) {
                        likes[answerId] = undefined;
                        localStorage.setObject('Likes', likes)
                    }
                }
                deferred.resolve(data);
            }, function(reason) {
                deferred.reject(reason);
            });

            return deferred.promise;
        }

        function newQuestion(question) {
            var deferred = $q.defer();

            restfulHelper.jsonp(SERVER_API_URL + 'api/question/new.jsonp', {
                title: question.title,
                content: question.content,
                tags: question.tags,
                anonymous: question.anonymous,
            }).then(function() {
                deferred.resolve();
            }, function(msg) {
                deferred.reject(msg);
            });

            return deferred.promise;
        }


        function myQuestions() {
            var deferred = $q.defer();

            restfulHelper.jsonp(SERVER_API_URL + '/api/my-questions.jsonp').then(function(questions) {
                deferred.resolve(questions);
            }, function(error) {
                deferred.reject(error);
            });

            return deferred.promise;
        }

        function myAnsweredQuestions() {
            var deferred = $q.defer();

            restfulHelper.jsonp(SERVER_API_URL + '/api/my-answers.jsonp').then(function(questions) {
                deferred.resolve(questions);
            }, function(error) {
                deferred.reject(error);
            });

            return deferred.promise;
        }

        function doAnswer(questionId, answer) {
            var deferred = $q.defer();


            restfulHelper.jsonp(SERVER_API_URL + '/api/answer.jsonp', {
                question_id: questionId,
                content: answer
            }).then(function(answerId) {
                deferred.resolve(answerId);
            }, function(error) {
                deferred.reject(error);
            });

            return deferred.promise;
        }
    }


})();
