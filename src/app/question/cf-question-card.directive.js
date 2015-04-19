(function() {
    'use strict';

    angular
        .module('app.question')
        .directive('cfQuestionCard', cfQuestionCard);


    /* @ngInject */
    function cfQuestionCard() {
        return {
            templateUrl: 'app/question/question-card.html'
        };
    }

})();
