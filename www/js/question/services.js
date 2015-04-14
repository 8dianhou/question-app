angular.module('question-app.question.services', ['question-app.services'])

// This Factory provides API Calls
.factory('QuestionService', ['$http', '$q', 'RestfulService', '$localstorage', 'SERVER_API_URL', function($http, $q, RestfulService, $localstorage, SERVER_API_URL) {

    return {
        questionOf: function(questionID) {
            var deferred = $q.defer();


            RestfulService.jsonp(SERVER_API_URL + 'api/question/' + questionID + '.jsonp').then(function(data) {
                deferred.resolve(data);
            });

            return deferred.promise;
        },


        listQuestionComments: function(questionID) {
            var deferred = $q.defer();

            RestfulService.jsonp(SERVER_API_URL + 'api/question/' + questionID + '/comments.jsonp').then(function(data) {
                deferred.resolve(data);
            });

            return deferred.promise;

        },

        getRecentQuestions: function(sid, pSize) {
            var deferred = $q.defer();


            RestfulService.jsonp(SERVER_API_URL + 'api/questions.jsonp').then(function(data) {
                deferred.resolve(data);
            });

            return deferred.promise;
        },

        loadMoreQuestions: function(url) {
            var deferred = $q.defer();

            RestfulService.jsonp(url).then(function(data) {
                deferred.resolve(data);
            });

            return deferred.promise;
        },


        addNewComment: function(answerId, content) {
            var deferred = $q.defer();

            RestfulService.jsonp(SERVER_API_URL + 'api/question/comment.jsonp', {
                answer_id: answerId,
                content: content
            }).then(function(data) {
                deferred.resolve(data);
            });

            return deferred.promise;
        },

        isLikedAnswer: function(answerId) {
            var likes = $localstorage.getObject('Likes');

            if (likes.length != 0 && likes[answerId]) {
                return true;
            } else {
                return false;
            }
        },


        addLike: function(answerId) {
            var deferred = $q.defer();

            RestfulService.jsonp(SERVER_API_URL + 'api/question/rank.jsonp', {
                answer_id: answerId
            }).then(function(data) {
                if (data) {
                    var likes = $localstorage.getObject('Likes');

                    if (likes.length === 0) {
                        likes = {};
                        likes[answerId] = true;
                    } else {
                        likes[answerId] = true;
                    }

                    $localstorage.setObject('Likes', likes)
                } else {
                    var likes = $localstorage.getObject('Likes');

                    if (likes.length != 0 && likes[answerId]) {
                        likes[answerId] = undefined;
                        $localstorage.setObject('Likes', likes)
                    }
                }
                deferred.resolve(data);
            }, function(reason) {
                deferred.reject(reason);
            });

            return deferred.promise;
        },

        newQuestion: function(question) {
            var deferred = $q.defer();

            deferred.resolve();

            return deferred.promise;
        },




    };
}]);
