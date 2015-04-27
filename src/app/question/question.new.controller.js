(function() {
    'use strict';

    angular
        .module('app.question')
        .controller('QuestionNewController', QuestionNewController);


    QuestionNewController.$inject = ['$ionicHistory', '$messageLoading', 'questionService'];

    function QuestionNewController($ionicHistory, $messageLoading, questionService) {

        var vm = this;
        vm.question = {
            title: '',
            content: '',
            tags: '',
            anonymous: false
        };
        vm.close = close;
        vm.doNewQuestion = doNewQuestion;

        function close() {
            vm.question = {
                title: '',
                content: '',
                tags: '',
                anonymous: false
            }
            $ionicHistory.goBack();
        }

        function doNewQuestion() {
            if (vm.question.title.length > 50) {
                $messageLoading.show('标题不能超过50个字', 1000)
                return;
            } else if (vm.question.content.length > 140) {
                $messageLoading.show('描述不能超过140个字', 1000)
                return;
            } else {
                var question = {
                    title: vm.question.title,
                    content: vm.question.content,
                    tags: vm.question.tags,
                    anonymous: vm.question.anonymous
                }

                questionService.newQuestion(question).then(
                    function() {
                        vm.question = {
                            title: '',
                            content: '',
                            tags: '',
                            anonymous: false
                        };
                        $ionicHistory.goBack();
                        $messageLoading.show('问题已发送', 1000);
                    },
                    function(msg) {
                        $messageLoading.show(msg, 1000);
                    });
            }
        }
    }
})();
