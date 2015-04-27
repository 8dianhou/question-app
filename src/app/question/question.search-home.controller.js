(function() {
    'use strict';

    angular
        .module('app.question')
        .controller('QuestionSearchHomeController', QuestionSearchHomeController);


    QuestionSearchHomeController.$inject = ['$scope', '$stateParams', '$ionicHistory', 'routerHelper', '$messageLoading', '$ionicLoading', 'questionService'];


    function QuestionSearchHomeController($scope, $stateParams, $ionicHistory, routerHelper, $messageLoading, $ionicLoading, questionService) {
        var vm = this;
        var nextLinkURl = null;

        vm.doSearch = doSearch;
        vm.moreDataCanBeLoaded = moreDataCanBeLoaded;
        vm.loadMoreData = loadMoreData;
        vm.cancleSearch = cancleSearch;
        vm.clearSearch = clearSearch;
        vm.searchText = {
            value: ''
        };

        activate();

        function activate() {
            // listen to event
            $scope.$on("question-ranked", function(event, index, rank) {
                vm.questions[index].totalRanks = vm.questions[index].totalRanks + rank;
            });
        }


        function doSearch() {

            $ionicLoading.show({
                template: '搜索中...'
            });

            questionService.searchQuestions(vm.searchText.value).then(function(data) {
                vm.questions = data['data'];

                if (data.linkNext && data['linkNext']['href']) {
                    nextLinkURl = data.linkNext.href;
                } else {
                    nextLinkURl = null;
                }

                $ionicLoading.hide();
            }, function(error) {
                $ionicLoading.hide();

                $messageLoading.show(error, 1000);
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

        function clearSearch() {
            vm.searchText = {
                value: ''
            };
        }


        function moreDataCanBeLoaded() {
            var canLoadedMore = vm.questions && vm.questions.length > 1;

            return canLoadedMore;
        }

        function cancleSearch() {
            vm.searchText = {
                value: ''
            };

            routerHelper.go('app.question.home');
        }

    }
})();
