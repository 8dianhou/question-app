(function() {
    'use strict';

    angular
        .module('app.user')
        .controller('UserFavoritesController', UserFavoritesController);

    UserFavoritesController.$inject = [];

    function UserFavoritesController() {
        var vm = this;
        vm.favorites = [{
            "id": 1,
            "questionId": "IAM-Q-2015-03-17-A8074AA2",
            "replierName": "Alwen Lu",
            "title": "秒答是什么？",
            "replier": {
                "name": "Alwen Lu",
                "avatarUrl": "http://www.8dianhou.com/api/avatar/avatar-38d5f641-9198-4df7-a7ba-c75309018519.png",
                "headline": "8点后产品经理"
            }
        }, {
            "id": 2,
            "questionId": "Q-2015-04-02-86101397-35E",
            "title": "大学生如何在未进入professional service industry之前积累优质资源进行成功的科技创业?",
            "replier": {
                "name": "Kelly Lu",
                "avatarUrl": "http://www.8dianhou.com/api/avatar/avatar-1e5c1ef9-d8fe-4876-8465-23d9db424822.png",
                "headline": "Managing Director at Kelly Placement, CEO at CareerFrog"
            }
        }];

    }
})();
