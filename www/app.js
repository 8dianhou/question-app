// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
(function() {
    'use strict';

    angular.module('question-app', [
        'ionic',
        'app.core',
        'app.security',
        'app.question',
        'app.user',
        'app.settings',
        'ngCordova'
    ])


    .run(['$ionicPlatform', 'authService', '$rootScope', '$state', function($ionicPlatform, authService, $rootScope, $state) {
        $ionicPlatform.ready(function() {
            authService.userIsLoggedIn().then(function(response) {
                //update user info and go on
                if (response === true) {
                    console.log('user is logged in, update the user info');

                    authService.updateUserInfo();
                } else {
                    console.log('user is logged out, remove the user info');

                    authService.logOut();
                }

                $state.go('app.question.home');
            }, function() {
                alert('error');
            });

            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }

            //pushNotificationsService.register();
        });

        // $ionicPlatform.on("resume", function() {
        //     authService.userIsLoggedIn().then(function(response) {
        //         //update user info and go on
        //         if (response === true) {
        //             console.log('user is logged in, update the user info');

        //             authService.updateUserInfo();
        //         } else {
        //             console.log('user is logged out, remove the user info');

        //             authService.logOut();
        //         }

        //         $state.go('app.question.home');
        //     }, function() {
        //         alert('error');
        //     });

        //     pushNotificationsService.register();
        // });


        // UI Router Authentication Check
        $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
            if (toState.data.authenticate) {
                authService.userIsLoggedIn().then(function(response) {
                    if (response === false) {
                        event.preventDefault();
                        authService.saveActiveState(toState.name);
                        $state.go('walkthrough');
                    }
                });
            }
        });
    }]);
})();

(function(){
	'use strict'

	angular.module('blocks.restful', [
	]);

})();
(function(){
	'use strict'

	angular.module('blocks.router', [
		'ui.router'
	]);

})();
(function(){
	'use strict'

	angular.module('blocks.utils', []);

})();
(function() {
    'use strict';

    angular
        .module('app.core', [
            'blocks.router', 'blocks.restful', 'blocks.utils',
            'ui.router'
        ]);
})();

(function() {
    'use strict';

    angular.module('app.layout', ['app.core']);
})();

(function() {
    'use strict';

    angular
        .module('app.question', [
            'app.core', 'app.layout',
            'ngCordova'
        ]);

})();

(function(){
	'use strict';

	angular
        .module('app.security', [
        	'app.core'
        ]);
})();

(function() {
	'use strict';

	angular.module('app.settings',[
		])
})();

(function() {
    'use strict'

    angular
        .module('app.user', [
            'app.core', 'app.question'
        ]);
})();

(function() {
    'use strict'

    angular
        .module('blocks.restful')
        .factory('restfulHelper', restfulHelperFactory);


    restfulHelperFactory.$inject = ['$http', '$q', '$timeout'];

    function restfulHelperFactory($http, $q, $timeout) {

        var service = {
            get: get,
            post: post,
            put: put,
            delete: del,
            jsonp: jsonp
        };

        return service;


        function get(url, params, cached) {
            var isCached = cached || false;

            var req = {
                method: 'GET',
                url: url,
                params: params || {},
                cache: isCached
            };

            return _callHttpAPI(req);
        };

        function post(url, data, params, options) {
            data = data || {};

            var req = {
                method: 'POST',
                url: url,
                data: data,
                params: params
            };

            req = angular.extend(req, options || {});

            return _callHttpAPI(req);
        };

        function put(url, data) {
            data = data || {};
            var req = {
                method: 'POST',
                url: url,
                data: data
            };

            return _callHttpAPI(req);
        };

        function del(url) {
            var req = {
                method: 'DELETE',
                url: url
            };

            return _callHttpAPI(req);
        };

        function jsonp(url, params) {
            var reqParams = {
                'callback': 'JSON_CALLBACK'
            };

            reqParams = angular.extend(reqParams, params || {});

            var req = {
                method: 'JSONP',
                url: url,
                params: reqParams
            };

            return _callHttpAPI(req);
        };

        function _callHttpAPI(req) {
            var deferred = $q.defer();

            var responseSuccessed = false;

            $http(req).success(function(data) {
                    console.log(data);
                    responseSuccessed = true;
                    if (data.status == 'SUCCESS') {
                        deferred.resolve(data.result);
                    } else {
                        deferred.reject(formatMessage(data.result.code, data.result.arguments));
                    }
                })
                .error(function(e, status) {
                    responseSuccessed = true;
                    deferred.reject('远程服务故障，请稍后再试！' + JSON.stringify(status) + JSON.stringify(req));
                });

            $timeout(function() {
                if(!responseSuccessed) {
                    deferred.reject('网络连接超时，请稍候再试！')
                }
            }, 5000);

            return deferred.promise;
        };


        function substitute(str, data) {
            var output = str.replace(/%[^%]+%/g, function(match) {
                if (match in data) {
                    return (data[match]);
                } else {
                    return ("");
                }
            });
            return (output);
        };

        function formatMessage(code, args) {
            args = args || [];

            var res = code;
            for (var i = 0; i < args.length; i++) {
                res = res.replace('${' + i + '}', args[i]);
            }

            return res;

        };
    }

})();

(function() {
    'use strict'

    angular
        .module('blocks.router')
        .provider('routerHelper', routerHelperProvider);

    routerHelperProvider.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];

    /* @ngInject */
    function routerHelperProvider($locationProvider, $stateProvider, $urlRouterProvider) {
        var config = {
            docType: undefined,
            resolveAlways: {}
        };

        $locationProvider.html5Mode(false);

        this.configure = function(cfg) {
            angular.extend(config, cfg);
        };

        this.$get = RouterHelper;
        RouterHelper.$inject = ['$location', '$rootScope', '$state']

        function RouterHelper($location, $rootScope, $state) {
            var handlingStateChangeError = false;
            var hasOtherwise = false;
            var stateCounts = {
                errors: 0,
                changes: 0
            };

            var service = {
                configureStates: configureStates,
                getState: getState,
                go: go,
                stateCounts: stateCounts
            };

            init();

            return service;

            function configureStates(states, otherwisePath) {
                states.forEach(function(state) {
                    state.config.resolve =
                        angular.extend(state.config.resolve || {}, config.resolveAlways);
                    $stateProvider.state(state.state, state.config);
                });

                if (otherwisePath && !hasOtherwise) {
                    hasOtherwise = true;
                    $urlRouterProvider.otherwise(otherwisePath);
                }
            }

            function go(stateName, options) {
                $state.go(stateName, options || {});
            }

            function getState() {
                return $state.get();
            }

            function init() {
                handleRoutingErrors();
                updateDocTitle();
            }


            function handleRoutingErrors() {
                // Route cancellation:
                // Provide an exit clause if it tries to do it twice.
                $rootScope.$on('$stateChangeError',
                    function(event, toState, toParams, fromState, fromParams, error) {
                        if (handlingStateChangeError) {
                            return;
                        }
                        stateCounts.errors++;
                        handlingStateChangeError = true;
                        var destination = (toState &&
                                (toState.title || toState.name || toState.loadedTemplateUrl)) ||
                            'unknown target';
                        var msg = 'Error routing to ' + destination + '. ' +
                            (error.data || '') + '. <br/>' + (error.statusText || '') +
                            ': ' + (error.status || '');

                        console.log(msg)
                        $location.path('/');
                    }
                );
            }

            function updateDocTitle() {
                $rootScope.$on('$stateChangeSuccess',
                    function(event, toState, toParams, fromState, fromParams) {
                        stateCounts.changes++;
                        handlingStateChangeError = false;
                        var title = config.docTitle + ' ' + (toState.title || '');
                        $rootScope.title = title + 'd'; // data bind to <title>
                    }
                );
            }
        }
    }

})();

(function() {
    'use strict'

    angular
        .module('blocks.utils')
        .factory('dateFormatter', dateFormatterFactory);

    dateFormatterFactory.$inject = ['$filter'];

    function dateFormatterFactory($filter) {

        var service = {
            formatChinaTime: formatChinaTime,
        };

        return service;

        function formatChinaTime(date) {
            var current = new Date();

            var times = current - date;
            var hours = Math.floor(times / (3600 * 1000));

            var currentHour = current.getHours();
            var currentDate = current.getDate();
            var currentMonth = current.getMonth();

            if (hours == 0) {
                return Math.floor(times / (60 * 1000)) + "分钟前";
            } else if (hours < currentHour) {
                return hours + "小时前";
            } else if (hours < currentHour + 24) {
                return "昨天 " + $filter('date')(date, 'HH-mm');
            } else if (hours < (currentHour + 24 * (currentDate + 7 * currentMonth))) {
                return $filter('date')(date, 'MM-dd');
            } else {
                return $filter('date')(date, 'y-MM-dd');
            }
        }
    }

})();

(function() {
    'use strict'

    angular
        .module('blocks.utils')
        .factory('localStorage', localStorageFactory);

    localStorageFactory.$inject = ['$window'];

    function localStorageFactory($window) {
        return {
            set: function(key, value) {
                $window.localStorage[key] = value;
            },
            get: function(key, defaultValue) {
                return $window.localStorage[key] || defaultValue;
            },
            setObject: function(key, value) {
                $window.localStorage[key] = angular.toJson(value);
            },
            getObject: function(key) {
                return JSON.parse($window.localStorage[key] || '[]');
            },
            destroy: function(key) {
                $window.localStorage.removeItem(key);
            },
            log: function(key, defaultValue) {
                console.log($window.localStorage[key] || defaultValue);
            },
            logObject: function(key) {
                console.log(JSON.parse($window.localStorage[key] || '{}'));
            }
        }
    }

})();

(function() {
    'use strict'

    angular
        .module('blocks.utils')
        .factory('$messageLoading', messageLoadingFactory);

    messageLoadingFactory.$inject = ['$ionicLoading', '$timeout'];

    function messageLoadingFactory($ionicLoading, $timeout) {
        return {
            show: function(text, delayMils) {
                $ionicLoading.show({
                    template: text
                });

                $timeout(function() {
                    $ionicLoading.hide();
                }, delayMils);
            }
        };
    }
})();

(function() {
    'use strict'

    angular
        .module('blocks.utils')
        .filter('rawHtml', rawHtmlFilter);

    rawHtmlFilter.$inject = ['$sce'];

    function rawHtmlFilter($sce) {
        return function(val) {
            if (!val) {
                return $sce.trustAsHtml('');
            }

            var output = val
                // replace possible line breaks.
                .replace(/(\r\n|\r|\n)/g, '<br/>')
                // replace tabs
                .replace(/\t/g, '&nbsp;&nbsp;&nbsp;')
                // replace spaces.
                .replace(/ /g, '&nbsp;');
            return $sce.trustAsHtml(output);
        };
    }

})();

(function() {
	'use strict';

    angular
        .module('app.core')
        .constant('SERVER_API_URL', 'http://www.8dianhou.com/');
        //.constant('SERVER_API_URL', 'http://localhost:8080/8dianhou/');

})();
(function() {
    'use strict';

    angular
        .module('app.core')
        .run(appRun);

    /* @ngInject */
    function appRun(routerHelper) {
        
    }
    appRun.$inject = ["routerHelper"];

    
})();

(function() {
        'use strict';

        angular
            .module('app.core')
            .factory('pushNotificationsService', pushNotificationsServiceFactory);


        //pushNotificationsServiceFactory.$inject = ['$rootScope', '$state', '$cordovaPush', '$ionicHistory'];


        /* @ngInject */
        function pushNotificationsServiceFactory(rootScope, $state, $cordovaPush, $ionicHistory) {
            
           
        }
        pushNotificationsServiceFactory.$inject = ["rootScope", "$state", "$cordovaPush", "$ionicHistory"];
})();

(function() {
    'use strict';

    angular
        .module('app.layout')
        .controller('AppController', AppController);


    AppController.$inject = ['$scope', '$state', '$ionicSlideBoxDelegate', 'authService'];


    function AppController($scope, $state, $ionicSlideBoxDelegate, authService) {
        $scope.$on('$ionicView.enter', function() {
            $scope.user = authService.getUser();
        });
    }
})();

(function() {
    'use strict';

    angular
        .module('app.layout')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [{
            state: 'app',
            config: {
                url: "/app",
                abstract: true,
                templateUrl: "app/layout/main.html",
                controller: 'AppController'
            }
        }, {
            state: 'walkthrough',
            config: {
                url: "/walkthrough",
                templateUrl: "app/layout/walkthrough.html",
                controller: 'WalkthroughConroller',
                data: {
                    authenticate: false
                }
            }
        }];
    }



})();

(function() {
    'use strict';

    angular.module('app.layout')
        .controller('WalkthroughConroller', WalkthroughConroller);


    WalkthroughConroller.$inject = ['$scope', '$state', '$ionicSlideBoxDelegate'];

    function WalkthroughConroller($scope, $state, $ionicSlideBoxDelegate) {

        $scope.$on('$ionicView.enter', function() {
            //this is to fix ng-repeat slider width:0px;
            $ionicSlideBoxDelegate.$getByHandle('walkthrough-slider').update();
        });

    };
})();

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

(function() {
    'use strict';

    angular
        .module('app.question')
        .directive('cfSearchInput', cfSearchInput);


    /* @ngInject */
    function cfSearchInput() {
        return {
            restrict: 'E',
            require: 'ngModel',
            replace: true,
            scope: {},
            controller: ["$scope", function($scope) {}],
            link: function(scope, element, attrs, ctrls) {
                attrs.minLength = attrs.minLength || 0;
                scope.placeholder = attrs.placeholder || '';
                scope.searchText = {
                    value: ctrls.$viewValue
                };

                if (attrs.class)
                    element.addClass(attrs.class);


                scope.clearSearch = function() {
                    scope.searchText.value = '';
                };

                scope.$watch('searchText.value', function(value) {
                    if (ctrls.$viewValue != value) {
                        ctrls.$setViewValue(value);
                    }
                });
            },
            template: '<div class="item-input-wrapper">' +
                '<i class="icon ion-android-search"></i>' +
                '<input type="search" placeholder="{{placeholder}}" ng-model="searchText.value" autofocus>' +
                '<i ng-if="searchText.value.length > 0" ng-click="clearSearch()" class="icon ion-close"></i>' +
                '</div>'
        };
    }

})();

(function() {
    'use strict';

    angular
        .module('app.question')
        .controller('QuestionCommentController', QuestionCommentController);


    QuestionCommentController.$inject = ['$stateParams', '$ionicHistory', '$messageLoading', 'questionService'];


    function QuestionCommentController($stateParams, $ionicHistory, $messageLoading, questionService) {
        var vm = this;
        vm.comment = {
            data: ''
        };
        vm.closeAddComment = closeAddComment;
        vm.doAddComment = doAddComment;

        function closeAddComment() {
            vm.comment = {};
            $ionicHistory.goBack();
        };

        function doAddComment() {
            if (vm.comment.data.length > 240) {
                $messageLoading.show('不能超过240个字', 2000)
                return;
            } else {
                questionService.addNewComment($stateParams.answerId, vm.comment.data).then(function(result) {
                    if (result) {
                        vm.comment = {};
                        $ionicHistory.goBack();
                        $messageLoading.show('评论已添加', 1000)
                    } else {
                        $messageLoading.show('评论添加失败，请稍候重试！', 1000)
                    }
                }, function() {

                });
            }
        }
    }
})();

(function() {
    'use strict';

    angular
        .module('app.question')
        .controller('QuestionDetailController', QuestionDetailController);


    QuestionDetailController.$inject = ['$scope', '$stateParams', '$ionicHistory', '$ionicActionSheet', 'routerHelper', '$ionicPopup', '$ionicLoading', '$messageLoading', 'questionService', 'loginModal', '$cordovaCamera'];

    function QuestionDetailController($scope, $stateParams, $ionicHistory, $ionicActionSheet, routerHelper, $ionicPopup, $ionicLoading, $messageLoading, questionService, loginModal, $cordovaCamera) {
        var vm = this;
        var questionId = $stateParams.questionID;
        vm.addComment = addComment;
        vm.goBack = goBack;
        vm.addFavorite = addFavorite;
        vm.addLike = addLike;
        vm.isLiked = isLiked;
        vm.shareAnywhere = shareAnywhere;

        activate();

        function activate() {
            $ionicLoading.show({
                template: 'Loading question...'
            });


            questionService.questionOf(questionId).then(function(data) {
                vm.question = data;

                $ionicLoading.hide();
            });

            questionService.listQuestionComments(questionId).then(function(data) {
                vm.comments = data;
            });
        }


        function shareAnywhere() {
            var options = {
                quality: 75,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.CAMERA,
                allowEdit: true,
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: 300,
                targetHeight: 300,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: false
            };

            $cordovaCamera.getPicture(options).then(function(imageData) {
                $messageLoading.show('照片获取成功', 1000)
            }, function(err) {
                // An error occured. Show a message to the user
            });
        }

        function addComment(answerId) {
            loginModal.show($scope, '注册登录后可评论秒答', function() {
                routerHelper.go('new-comment', {
                    answerId: answerId
                });
            })
        }


        function goBack() {
            $ionicHistory.goBack();
        }



        function addFavorite(questionId) {
            loginModal.show($scope, '注册登录后才可收藏', function() {
                $messageLoading.show(questionId + '已收藏', 2000)
            })
        };


        function addLike(answerId) {
            loginModal.show($scope, '注册登录后才可点赞', function() {
                questionService.addLike(answerId).then(function(result) {

                }, function() {

                });
            })
        }

        function isLiked(answerId) {
            return questionService.isLikedAnswer(answerId);
        }
    }
})();

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

(function() {
    'use strict';

    angular
        .module('app.question')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        var otherwise = '/app/question/home';
        routerHelper.configureStates(getStates(), otherwise);
    }

    function getStates() {
        return [{
            state: 'app.question',
            config: {
                url: '/question',
                abstract: true,
                views: {
                    'menuContent': {
                        templateUrl: 'app/question/question-main.html',
                        //  controller: 'AppCtrl'
                    }
                }

            }
        }, {
            state: 'app.question.home',
            config: {
                url: "/home",
                views: {
                    'question-home': {
                        templateUrl: 'app/question/question-home.html',
                        controller: 'QuestionHomeController as vm'
                    }
                },
                data: {
                    authenticate: false
                }
            }
        }, {
            state: 'app.question.detail',
            config: {
                url: "/:questionID",
                views: {
                    'question-home': {
                        templateUrl: 'app/question/question-detail.html',
                        controller: 'QuestionDetailController as vm'
                    }
                },
                data: {
                    authenticate: false
                }
            }
        }, {
            state: 'app.question.search',
            config: {
                url: "/search",
                views: {
                    'question-home': {
                        templateUrl: 'app/question/search-home.html',
                        controller: 'QuestionSearchHomeController as vm'
                    }
                },
                data: {
                    authenticate: false
                }
            }
        }, {
            state: 'new-question',
            config: {
                url: "/new-question",
                templateUrl: 'app/question/new-question.html',
                controller: 'QuestionNewController as vm',
                data: {
                    authenticate: true
                }
            }

        }, {
            state: 'new-comment',
            config: {
                url: "/new-comment/:answerId",
                templateUrl: "app/question/new-comment.html",
                controller: 'QuestionCommentController as vm',
                data: {
                    authenticate: true
                }
            }
        }, {
            state: 'app.finding',
            config: {
                url: "/finding",
                views: {
                    'menuContent': {
                        templateUrl: "app/question/finding.html"
                    }
                },
                data: {
                    authenticate: false
                }
            }
        }, {
            state: 'app.topic',
            config: {
                url: "/topic",
                views: {
                    'menuContent': {
                        templateUrl: "app/question/topic.html"
                    }
                },
                data: {
                    authenticate: false
                }
            }
        }];
    }

})();

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

(function() {
    'use strict';

    angular
        .module('app.security')
        .provider('authService', AuthServiceProvider);

    AuthServiceProvider.$inject = [];

    function AuthServiceProvider() {
        this.$get = AuthService;

        AuthService.$inject = ['$rootScope', '$http', '$q', 'localStorage', 'restfulHelper', 'SERVER_API_URL'];

        function AuthService($rootScope, $http, $q, localStorage, restfulHelper, SERVER_API_URL) {

            var USER_KEY = '_user_';
            var ACTIVE_STATE = '_active_state';


            var service = {
                saveActiveState: saveActiveState,
                retrieveAncClearActiveState: retrieveAncClearActiveState,
                verifyPhone: verifyPhone,
                userIsLoggedIn: userIsLoggedIn,
                doLogin: doLogin,
                doRegister: doRegister,
                doForgotPassword: doForgotPassword,
                logOut: logOut,
                updateUserInfo: updateUserInfo,
                saveUser: saveUser,
                getUser: getUser
            };

            return service;

            function saveActiveState(activeState) {
                localStorage.setObject(ACTIVE_STATE, activeState)
            };


            function retrieveAncClearActiveState() {
                var activeState = localStorage.getObject(ACTIVE_STATE);
                localStorage.destroy(ACTIVE_STATE);

                return activeState
            };


            // validate the user phone
            function verifyPhone(phoneNumber) {
                return restfulHelper.jsonp(SERVER_API_URL + 'api/user/verify_phone', {
                    phone: phoneNumber
                });
            };

            function userIsLoggedIn() {
                var deferred = $q.defer();

                var user = localStorage.getObject(USER_KEY);
                if (user.length !== 0) {
                    restfulHelper.jsonp(SERVER_API_URL + 'api/user/validate_auth')
                        .then(function(result) {
                            deferred.resolve(result);
                        }, function() {
                            deferred.resolve(false);
                        });

                } else {
                    deferred.resolve(false);
                }
                return deferred.promise;
            };

            function doLogin(user) {
                var deferred = $q.defer(),
                    authService = this;

                restfulHelper.jsonp(SERVER_API_URL + 'api/user/auth/v2', user)
                    .then(function(data) {
                        //recieve and store the user's cookie in the local storage
                        var userInfo = {
                            data: data,
                            user_id: data.accountId
                        };
                        authService.saveUser(userInfo);

                        deferred.resolve(userInfo);
                    }, function(reason) {
                        deferred.reject(reason);
                    });


                return deferred.promise;
            };

            function doRegister(user) {
                var deferred = $q.defer(),
                    authService = this;

                restfulHelper.jsonp(SERVER_API_URL + 'api/user/regisiter', {
                    phone: user.phone,
                    verify_code: user.verifyCode,
                    email: user.email,
                    fullname: user.fullName,
                    password: user.password
                }).then(function(data) {
                    //recieve and store the user's cookie in the local storage
                    var user = {
                        data: data,
                        user_id: data.accountId
                    };

                    authService.saveUser(user);

                    deferred.resolve(data);
                }, function(error) {
                    deferred.reject(error);
                });

                return deferred.promise;
            };


            function doForgotPassword(username) {
                var deferred = $q.defer();
                $http.jsonp(SERVER_API_URL + 'user/retrieve_password/' +
                        '?user_login=' + username +
                        '&callback=JSON_CALLBACK')
                    .success(function(data) {
                        deferred.resolve(data);
                    })
                    .error(function(data) {
                        deferred.reject(data);
                    });
                return deferred.promise;
            };

            function logOut() {
                //empty user data
                localStorage.destroy(USER_KEY);
            };

            //update user avatar from WP
            function updateUserInfo() {
                var deferred = $q.defer(),
                    authService = this,
                    user = localStorage.getObject(USER_KEY).data;

                restfulHelper.jsonp(SERVER_API_URL + 'api/user/info', {
                    accountId: user.accountId
                }).then(function(result) {
                    var userInfo = {
                        data: result,
                        user_id: result.accountId
                    };

                    authService.saveUser(userInfo);

                    deferred.resolve(result);
                }, function(err) {
                    console.log('更新用户数据错误' +
                        err);
                });

                return deferred.promise;
            };

            function saveUser(user) {
                localStorage.setObject(USER_KEY, user);
            };

            function getUser() {
                var user = localStorage.getObject(USER_KEY);

                if (user['data']) {
                    return {
                        avatar: localStorage.getObject(USER_KEY).data.avatarUrl,
                        fullname: localStorage.getObject(USER_KEY).data.fullname,
                        logined: true
                    }
                } else {
                    return {
                        avatar: 'img/avatars/avatar.jpg',
                        fullname: '您尚未登录',
                        logined: false
                    };
                }
            };
        };

    }

})();

(function() {
    'use strict';

    angular
        .module('app.security')
        .factory('loginModal', loginModalFactory);

    loginModalFactory.$inject = ['$ionicPopup', '$state', '$messageLoading', 'authService'];

    function loginModalFactory($ionicPopup, $state, $messageLoading, authService) {
        var service = {
            show: show
        };

        return service;

        function show(vm, title, callback) {

            var loginSuccessed = false;

            authService.userIsLoggedIn().then(function(response) {
                if (response === true) {
                    callback();
                } else {
                    vm.loginUser = {};
                    vm.errorMessage = '';
                    vm.gotoRegister = function() {
                        confirmPopup.close()
                        $state.go('register');
                    }

                    var confirmPopup = $ionicPopup.confirm({
                        title: title,
                        subTitle: '请输入用户名和密码',
                        template: '<div><label class="item item-input"><input type="text" name="user_name" placeholder="用户名/手机号" ng-model="loginUser.userName" autofocus></label><label class="item item-input"><input type="password" name="password" ng-model="loginUser.password" placeholder="密码" ></label></div> <p ng-show="errorMessage" class="message error">{{errorMessage}}</p><div class="alternative-actions"> <a class="forgot-password button button-small button-clear" ui-sref="forgot_password">忘记密码?</a><a class="sign-up button button-small button-clear" ng-click="gotoRegister()">注册</a></div>',
                        scope: vm,
                        buttons: [{
                            text: '取消'
                        }, {
                            text: '<b>确定</b>',
                            type: 'button-positive',
                            onTap: function(e) {
                                if (!vm.loginUser.userName || !vm.loginUser.password) {
                                    vm.errorMessage = '用户名和密码不能为空'
                                        //don't allow the user to close unless he enters wifi password
                                    e.preventDefault();
                                } else {
                                    var user = {
                                        username: vm.loginUser.userName,
                                        password: vm.loginUser.password
                                    }

                                    authService.doLogin(user)
                                        .then(function(user) {
                                            loginSuccessed = true;
                                            confirmPopup.close();
                                        }, function(err) {
                                            //err
                                            vm.errorMessage = err;
                                        });

                                    e.preventDefault();
                                }
                            }
                        }]
                    });

                    confirmPopup.then(function() {
                        if (loginSuccessed) {
                            callback();
                        }
                    });
                }


            }, function(error) {
                $messageLoading.show('远程服务器故障，请稍后再试', 1000);
            });
        };
    }
})();

(function() {
    'use strict';

    angular
        .module('app.security')
        .controller('LoginController', LoginController);


    LoginController.$inject = ['$state', '$ionicHistory', '$ionicLoading', 'authService'];


    function LoginController($state, $ionicHistory, $ionicLoading, authService) {
        var vm = this;
        vm.user = {};
        vm.error = false;
        vm.closeLogin = closeLogin;
        vm.doLogin = doLogin;
        vm.title = '欢迎回来'

        function closeLogin() {
            vm.user = {}
            $ionicHistory.goBack();
        }

        function doLogin() {

            $ionicLoading.show({
                template: '登录中...'
            });

            var user = {
                username: vm.user.userName,
                password: vm.user.password
            };

            authService.doLogin(user)
                .then(function(user) {

                    var activeState = authService.retrieveAncClearActiveState()
                        //success
                    if (activeState.length !== 0) {
                        $state.go(activeState);
                    } else {
                        $state.go('app.question.home');
                    }

                    $ionicLoading.hide();
                }, function(err) {
                    //err
                    vm.error = err;
                    $ionicLoading.hide();
                });
        };
    }
})();

(function() {
    'use strict';

    angular
        .module('app.security')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['$state', '$ionicHistory', '$ionicLoading', '$messageLoading', 'authService'];

    function RegisterController($state, $ionicHistory, $ionicLoading, $messageLoading, authService) {
        var vm = this;
        vm.user = {};
        vm.doVerifyPhone = doVerifyPhone;
        vm.closeRegister = closeRegister;
        vm.doRegister = doRegister;

        function doVerifyPhone(){
            var phoneNumber = vm.user.telephone || '';

            if (phoneNumber.length == 0) {
                $messageLoading.show('请输入有效号码...', 1000);
                return;
            }

            authService.verifyPhone(phoneNumber)
                .then(function(data) {
                    $messageLoading.show('验证码已发送...', 1000);

                }, function(err) {
                    $messageLoading.show(err, 1000);
                });
        }

        function closeRegister() {
            vm.user = {}
            $ionicHistory.goBack();
        }

        function doRegister() {
            $ionicLoading.show({
                template: '用户注册中...'
            });

            var user = {
                phone: vm.user.telephone,
                verifyCode: vm.user.verifyCode,
                email: vm.user.email,
                fullName: vm.user.fullName,
                password: vm.user.password
            };

            authService.doRegister(user)
                .then(function(user) {
                    //success
                    $state.go('app.home');
                    $ionicLoading.hide();
                }, function(err) {
                    //err
                    vm.error = err;
                    $ionicLoading.hide();
                });
        };
    };
})();

(function() {
    'use strict';

    angular
        .module('app.security')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }


    function getStates() {
        return [{
            state: 'login',
            config: {
                url: "/login",
                templateUrl: "app/security/login.html",
                controller: 'LoginController as vm',
		        title: 'Login',
                data: {
                    authenticate: false
                }
            }
        }, {
            state: 'register',
            config: {
                url: "/register",
                templateUrl: "app/security/register.html",
                controller: 'RegisterController as vm',
                data: {
                    authenticate: false
                }
            }
        }];

    }
})();

(function() {
    'use strict';

    angular
        .module('app.security')
        .directive('cfShowHideContainer', cfshowHideContainer)
        .directive('cfShowHideInput', cfShowHideInput);


    /* @ngInject */
    function cfshowHideContainer() {
        return {
            scope: {

            },
            controller: ["$scope", "$element", "$attrs", function($scope, $element, $attrs) {
                $scope.show = false;

                $scope.toggleType = function($event) {
                    $event.stopPropagation();
                    $event.preventDefault();

                    $scope.show = !$scope.show;

                    // Emit event
                    $scope.$broadcast("toggle-type", $scope.show);
                };
            }],
            templateUrl: 'app/security/show-hide-password.html',
            restrict: 'A',
            replace: false,
            transclude: true
        };
    }

    function cfShowHideInput() {
         return {
        scope: {

        },
        link: function(scope, element, attrs) {
            // listen to event
            scope.$on("toggle-type", function(event, show) {
                var password_input = element[0],
                    input_type = password_input.getAttribute('type');

                if (!show) {
                    password_input.setAttribute('type', 'password');
                }

                if (show) {
                    password_input.setAttribute('type', 'text');
                }
            });
        },
        require: '^cfShowHideContainer',
        restrict: 'A',
        replace: false,
        transclude: false
    };
    }

})();
(function() {
    'use strict';

    angular
        .module('app.settings')
        .controller('SettingsController', SettingsController);

    SettingsController.$inject = ['$scope', '$ionicActionSheet', '$ionicModal', '$state', 'authService'];


    function SettingsController($scope, $ionicActionSheet, $ionicModal, $state, authService) {
        var vm = this;
        vm.notifications = true;
        vm.sendLocation = false;
        vm.showTerms = showTerms;
        vm.closeTerms = closeTerms;
        vm.showFAQS = showFAQS;
        vm.closeFAQs = closeFAQs;
        vm.showLogOutMenu = showLogOutMenu;


        var termsModal;
        $ionicModal.fromTemplateUrl('app/settings/terms.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            termsModal = modal;
        });

        var faqsModal;
        $ionicModal.fromTemplateUrl('app/settings/faqs.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            faqsModal = modal;
        });

        function showTerms() {
            termsModal.show();
        };

        function showFAQS() {
            faqsModal.show();
        };

        function closeTerms() {
            termsModal.hide();
        }

        function closeFAQs() {
            faqsModal.hide();
        }

        // Triggered on a the logOut button click
        function showLogOutMenu() {

            // Show the action sheet
            var hideSheet = $ionicActionSheet.show({
                //Here you can add some more buttons
                // buttons: [
                // { text: '<b>Share</b> This' },
                // { text: 'Move' }
                // ],
                destructiveText: '退出',
                titleText: '这么好的应用，确定退出吗?',
                cancelText: '取消',
                cancel: function() {
                    // add cancel code..
                },
                buttonClicked: function(index) {
                    //Called when one of the non-destructive buttons is clicked,
                    //with the index of the button that was clicked and the button object.
                    //Return true to close the action sheet, or false to keep it opened.
                    return true;
                },
                destructiveButtonClicked: function() {
                    //Called when the destructive button is clicked.
                    //Return true to close the action sheet, or false to keep it opened.
                    authService.logOut();
                    $state.go('app.question.home');
                }
            });
        };
    }
})();

(function() {
    'use strict';

    angular
        .module('app.settings')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [{
            state: 'app.settings',
            config: {
                url: "/settings",
                views: {
                    'menuContent': {
                        templateUrl: "app/settings/settings.html",
                        controller: 'SettingsController as vm'
                    }
                },
                data: {
                    authenticate: true
                }
            }
        }];
    }
})();

(function() {
    'use strict';

    angular
        .module('app.user')
        .controller('UserAnswersController', UserAnswersController);

    UserAnswersController.$inject = ['$scope', '$ionicLoading', '$ionicModal', 'routerHelper', '$messageLoading', 'questionService', 'dateFormatter', 'loginModal'];

    function UserAnswersController($scope, $ionicLoading, $ionicModal, routerHelper, $messageLoading, questionService, dateFormatter, loginModal) {
        var vm = this;
        var nextLinkURl = null;
        vm.loadMoreData = loadMoreData;
        vm.doRefresh = doRefresh;
        vm.moreDataCanBeLoaded = moreDataCanBeLoaded;
        vm.viewDetails = viewDetails;
        vm.answerQuestion = answerQuestion;
        vm.closeAnswerModal = closeAnswerModal;
        vm.formatChinaTime = dateFormatter.formatChinaTime;
        vm.doAnswer = doAnswer;
      
        activate();

        function activate() {
            doRefresh();

            $ionicModal.fromTemplateUrl('app/user/answer-question.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function(modal) {
                vm.answerModal = modal;
            });
        }

        function doRefresh() {
            $ionicLoading.show({
                template: '数据读取中...'
            });

            questionService.myAnsweredQuestions().then(function(data) {
                vm.questions = data['data'];

                if (data.linkNext && data['linkNext']['href']) {
                    nextLinkURl = data.linkNext.href;
                } else {
                    nextLinkURl = null;
                }

                $ionicLoading.hide();
                $scope.$broadcast('scroll.refreshComplete');

                var i = 0;

                for (; i < vm.questions.length; i++) {
                    questionService.questionOf(vm.questions[i].questionId);
                }
            }, function(errMsg) {
                $ionicLoading.hide();

                $messageLoading.show(errMsg, 1000);
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


        function moreDataCanBeLoaded() {
            var canLoadedMore = vm.questions && vm.questions.length > 1;

            return canLoadedMore;
        }

        function answerQuestion(index) {
            var question = vm.questions[index];

            vm.answer = {
                questionIndex: index,
                data: ''
            };

            vm.answerModal.show();

        }

        function closeAnswerModal() {
            vm.answerModal.hide();
        }

        function viewDetails(index) {
             var question = vm.questions[index];

            if (question.status == 'FINISHED') {
                routerHelper.go('app.question.detail', {
                    questionID: question.questionId
                });
            } 
            // else {
            //     vm.currentQuestion = question;

            //     console.log(question);
            //     vm.detailModal.show();
            // }
        }

        function doAnswer() {

            var currentQuestion = vm.questions[vm.answer.questionIndex];

            questionService.doAnswer(currentQuestion.questionId, vm.answer.data).then(
                function(answerId) {
                    vm.answerModal.hide();

                    currentQuestion.status = 'FINISHED';

                    $messageLoading.show('回答提交成功', 1000);
                },
                function(error) {
                    vm.answerModal.hide();
                    $messageLoading.show(error, 1000);
                }
            );

        }

     
    }
})();

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

(function() {
    'use strict';

    angular
        .module('app.user')
        .controller('UserQuestionsController', UserQuestionsController);


    UserQuestionsController.$inject = ['$scope', '$ionicLoading', '$ionicModal', 'routerHelper', '$messageLoading', 'questionService', 'dateFormatter', 'loginModal'];

    function UserQuestionsController($scope, $ionicLoading, $ionicModal, routerHelper, $messageLoading, questionService, dateFormatter, loginModal) {
        var vm = this;
        var nextLinkURl = null;
        vm.loadMoreData = loadMoreData;
        vm.doRefresh = doRefresh;
        vm.moreDataCanBeLoaded = moreDataCanBeLoaded;
        vm.viewDetails = viewDetails;
        vm.closeDetailModal = closeDetailModal;
        vm.formatChinaTime = dateFormatter.formatChinaTime;
        vm.newQuestion = newQuestion;


        activate();

        function activate() {
            doRefresh();

            $ionicModal.fromTemplateUrl('app/user/user-question-detail.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function(modal) {
                vm.detailModal = modal;
            });
        }

        function doRefresh() {
            $ionicLoading.show({
                template: '数据读取中...'
            });

            questionService.myQuestions().then(function(data) {
                vm.questions = data['data'];

                if (data.linkNext && data['linkNext']['href']) {
                    nextLinkURl = data.linkNext.href;
                } else {
                    nextLinkURl = null;
                }

                $ionicLoading.hide();
                $scope.$broadcast('scroll.refreshComplete');

                var i = 0;

                for (; i < vm.questions.length; i++) {
                    questionService.questionOf(vm.questions[i].questionId);
                }
            }, function(errMsg) {
                $ionicLoading.hide();

                $messageLoading.show(errMsg, 1000);
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


        function moreDataCanBeLoaded() {
            var canLoadedMore = vm.questions && vm.questions.length > 1;

            return canLoadedMore;
        }

        function viewDetails(index) {
            var question = vm.questions[index];

            if (question.status == 'FINISHED') {
                routerHelper.go('app.question.detail', {
                    questionID: question.questionId
                });
            } else {
                vm.currentQuestion = question;

                console.log(question);
                vm.detailModal.show();
            }
        }

        function closeDetailModal() {
            vm.detailModal.hide();
        }

        // Open the new question modal
        function newQuestion() {
            loginModal.show($scope, '注册登录后可提交问题', function() {
                routerHelper.go('new-question');
            })
        }
    }
})();

(function() {
    'use strict'

    angular
        .module('app.user')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [{
            state: 'app.user',
            config: {
                url: '/user',
                abstract: true,
                views: {
                    'menuContent': {
                        templateUrl: 'app/user/user-main.html',
                        //controller: 'AppCtrl'
                    }
                }
            }
        }, {
            state: 'app.user.questions',
            config: {
                url: '/questions',
                views: {
                    'tab-user-questions': {
                        templateUrl: 'app/user/user-questions.html',
                        controller: 'UserQuestionsController as vm'
                    }
                },
                data: {
                    authenticate: true
                }
            }
        }, {
            state: 'app.user.answers',
            config: {
                url: '/answers',
                views: {
                    'tab-user-answers': {
                        templateUrl: 'app/user/user-answers.html',
                        controller: 'UserAnswersController as vm'
                    }
                },
                data: {
                    authenticate: true
                }

            }
        }, {
            state: 'app.user.favorites',
            config: {
                url: '/favorites',
                views: {
                    'tab-user-favorites': {
                        templateUrl: 'app/user/user-favorites.html',
                        controller: 'UserFavoritesController as vm'
                    }
                },
                data: {
                    authenticate: true
                }
            }
        }];
    }
})();

angular.module("app.core").run(["$templateCache", function($templateCache) {$templateCache.put("app/layout/main.html","<ion-side-menus enable-menu-with-back-views=false><ion-side-menu-content><ion-nav-bar class=\"bar-positive nav-title-slide-ios7\"><ion-nav-buttons side=left></ion-nav-buttons><ion-nav-buttons side=right></ion-nav-buttons></ion-nav-bar><ion-nav-view name=menuContent></ion-nav-view></ion-side-menu-content><ion-side-menu side=left><ion-content><ion-list><ion-item class=\"item item-avatar item-icon-right\" nav-clear=\"\" menu-close=\"\" ui-sref=app.settings><img ng-src={{user.avatar}}><h2>{{user.fullname}}</h2><p>欢迎使用秒答</p><i class=\"icon ion-chevron-right icon-accessory\"></i></ion-item><ion-item class=\"item item-icon-left\" nav-clear=\"\" menu-close=\"\" ui-sref=app.question.home><i class=\"icon ion-ios-home-outline\"></i><h2 class=menu-text>首页</h2></ion-item><ion-item nav-clear=\"\" class=item-divider>我的秒答</ion-item><ion-item class=\"item item-icon-left\" nav-clear=\"\" menu-close=\"\" ui-sref=app.user.questions><i class=\"icon ion-ios-help-outline\"></i><h2 class=menu-text>提出的</h2></ion-item><ion-item class=\"item item-icon-left\" nav-clear=\"\" menu-close=\"\" ui-sref=app.user.answers><i class=\"icon ion-ios-compose-outline\"></i><h2 class=menu-text>回答的</h2></ion-item></ion-list></ion-content></ion-side-menu></ion-side-menus>");
$templateCache.put("app/layout/walkthrough.html","<ion-view class=walkthrough-view cache-view=false><ion-nav-bar class=\"bar-clear nav-title-slide-ios7\"><ion-nav-buttons side=left><button class=\"button button-icon button-positive ion-ios-close-empty\" ui-sref=app.question.home></button></ion-nav-buttons></ion-nav-bar><ion-content scroll=false><div class=\"top-content row\"><ion-slide-box delegate-handle=walkthrough-slider show-pager=true><ion-slide><div class=\"row slide-content\"><div class=col><h3 class=slide-h>8点后 · 秒答</h3><p class=slide-p>获得快速、真实、有效的职场问答</p></div></div></ion-slide><ion-slide><div class=\"row slide-content\"><div class=col><h3 class=slide-h>求职、跳槽有疑惑？就在秒答！</h3><p class=slide-p>对话近千名资深行业精英，免费、快速、真实！</p></div></div></ion-slide></ion-slide-box></div><div class=\"bottom-content row\"><div class=\"col col-center\"><a class=\"login button button-block button-light\" ui-sref=login>登录</a></div><div class=\"col col-center\"><a class=\"sign-up button button-block button-light\" ui-sref=register>注册</a></div></div></ion-content></ion-view>");
$templateCache.put("app/question/comment-question.html","<ion-modal-view title=评论><form name=comment_form novalidate><ion-header-bar><button class=\"button button-clear button-stable\" ng-click=closeAddComment()>取消</button><h1 class=title>发评论</h1><button class=\"button button-clear button-positive\" ng-click=doAddComment() ng-disabled=comment_form.$invalid>发送</button></ion-header-bar><ion-content><div class=list><label class=\"item item-input item-floating-label\"><textarea type=text name=comment ng-model=comment rows=7 placeholder=写评论... required></textarea></label></div></ion-content></form></ion-modal-view>");
$templateCache.put("app/question/finding.html","<ion-view title=发现><ion-nav-buttons side=left><button class=\"button button-icon button-clear ion-navicon\" menu-toggle=left></button></ion-nav-buttons><ion-content><h1>发现</h1></ion-content></ion-view>");
$templateCache.put("app/question/new-comment.html","<ion-view><form name=comment_form novalidate><ion-nav-bar class=nav-title-slide-ios7><ion-nav-title><span>评论</span></ion-nav-title><ion-nav-buttons side=left><button class=\"button button-clear button-stable\" ng-click=vm.closeAddComment()>取消</button></ion-nav-buttons><ion-nav-buttons side=right><button class=\"button button-clear button-positive\" ng-click=vm.doAddComment() ng-disabled=comment_form.$invalid>发送</button></ion-nav-buttons></ion-nav-bar><ion-content><label class=\"item item-input item-floating-label\"><textarea type=text name=comment ng-model=vm.comment.data rows=8 placeholder=写评论... required autofocus></textarea></label></ion-content></form></ion-view>");
$templateCache.put("app/question/new-question.html","<ion-view><form name=new_question_form novalidate><ion-nav-bar class=nav-title-slide-ios7><ion-nav-title><span>提交新问题</span></ion-nav-title><ion-nav-buttons side=left><button class=\"button button-clear button-stable\" ng-click=vm.close()>取消</button></ion-nav-buttons><ion-nav-buttons side=right><button class=\"button button-clear button-positive\" ng-click=vm.doNewQuestion() ng-disabled=new_question_form.$invalid>发送</button></ion-nav-buttons></ion-nav-bar><ion-content><label class=\"item item-input item-floating-label\"><input type=text name=title ng-model=vm.question.title placeholder=标题（不超过50个字） required autofocus></label> <label class=\"item item-input item-floating-label\"><textarea type=text name=content ng-model=vm.question.content rows=7 placeholder=输入你的问题(不超过140个字) required></textarea></label> <label class=\"item item-input item-floating-label\"><input type=text name=tags ng-model=vm.question.tags placeholder=标签></label><div class=\"item item-toggle\">匿名 <label class=\"toggle toggle-assertive\"><input type=checkbox name=anonymous ng-model=vm.question.anonymous><div class=track><div class=handle></div></div></label></div></ion-content></form></ion-view>");
$templateCache.put("app/question/question-card.html","<ion-list><ion-item class=\"item item-avatar item-text-wrap\"><img ng-src=\"{{vm.question.replier.avatarUrl ? vm.question.replier.avatarUrl : \'img/avatars/avatar.jpg\'}}\"><h2>{{vm.question.replier.name}}</h2><button style=\"position:absolute; right:10px; top: 0px\" class=\"button button-clear icon ion-ios-arrow-down\" ng-click=vm.showActionSheet(vm.question.questionId)></button><p class=light>{{vm.question.replier.headline}}</p><p class=light style=\"color: orange;font-size: 10px; padding: 0;line-height: 1rem;\">{{vm.formatChinaTime(vm.question.answerCreatedTS)}} 回答</p></ion-item><div class=\"item item-text-wrap\"><div ui-sref=\"app.question.detail({questionID :vm.question.questionId})\" class=question-content><h2 style=\"color: #3498db;\">{{vm.question.title}}</h2><p class=subdued ng-bind-html=\"vm.getAnswerContent(vm.question) | rawHtml\" style=\"color: rgb(51, 51, 51); font-family: Helvetica, sans-serif;font-size: 16px; line-height: 1.35rem;\"></p></div><p><a ng-if=vm.isShowMore(vm.question) ng-click=vm.showMore(vm.question) class=subdued>显示更多</a></p></div><div class=\"item tabs tabs-secondary tabs-icon-left\"><a class=tab-item ng-click=\"vm.addLike(vm.index, vm.question.answerId)\"><i class=\"icon ion-thumbsup\" ng-class=\"vm.isLiked(vm.question.answerId) ? \'liked-answer\' : \'\'\"></i> {{vm.question.totalRanks > 0 ? vm.question.totalRanks : \'喜欢\'}}</a> <a class=tab-item ng-click=\"vm.viewComments(vm.question.questionId, vm.question.answerId, vm.question.totalComments)\"><i class=\"icon ion-ios-chatboxes-outline\"></i> {{vm.question.totalComments > 0 ? vm.question.totalComments : \'评论\'}}</a> <a class=tab-item><i class=\"icon ion-share\"></i> 分享</a></div></ion-list>");
$templateCache.put("app/question/question-detail.html","<ion-view class=post-view><ion-nav-title><span>秒答正文</span></ion-nav-title><ion-nav-buttons side=left><button class=\"button button-clear\" ng-click=vm.goBack()><i class=\"icon ion-ios-arrow-back\">返回</i></button></ion-nav-buttons><ion-nav-buttons side=right><button class=\"button button-icon button-clear ion-ios-more\" ng-click=vm.shareAnywhere()></button></ion-nav-buttons><ion-content has-header=true padding=false><div class=card1><ion-list><ion-item class=\"item item-body item-text-wrap\"><h2 ng-bind-html=vm.question.title style=\"color: #3498db;\"></h2><p style=\"color: #929292;\">{{vm.question.createdTS | date:\'yyyy.MM.dd hh:ss\'}}</p><p ng-bind-html=\"vm.question.content | rawHtml\"></p><p><a href=# class=subdued>互联网</a> <a href=# class=subdued>职业发展</a></p></ion-item><ion-item class=\"item item-avatar item-text-wrap\"><img ng-src=\"{{vm.question.replier.avatarUrl ? vm.question.replier.avatarUrl : \'img/avatars/avatar.jpg\'}}\"><h2>{{vm.question.replier.name}}</h2><p class=light>{{vm.question.replier.headline}}</p><p class=light>{{vm.question.answerCreatedTS | date:\'yyyy-MM-dd HH:mm\'}} 回答</p></ion-item><div class=\"item item-body item-text-wrap\"><p class=subdued ng-bind-html=\"vm.question.answerContent | rawHtml\"></p><p><a href=# class=subdued>赞 {{vm.question.totalRanks}}</a> <a href=# class=subdued>评论 {{vm.question.totalComments}}</a></p></div><ion-item id=comments class=\"item item-avatar item-text-wrap\" ng-repeat=\"comment in vm.comments\"><img ng-src=\"{{comment.owner.avatarData !== null ? \'data:image/jpeg;base64,\' + comment.owner.avatarData : \'img/avatars/avatar.jpg\'}}\"><div style=\"position: relative;\"><h2>{{comment.owner.name}}</h2><p class=light style=\"font: 12px/1.3 \'Arial\',\'Microsoft YaHei\';color: #808080;position: absolute;top:0px;right:10px\">{{comment.createdTS | date:\'yy-MM-dd hh:ss\'}}</p></div><p class=light>{{comment.content}}</p></ion-item></ion-list></div></ion-content><ion-footer-bar><div class=\"tabs tabs-light tabs-secondary tabs-color-positive tabs-icon-left\"><div class=\"tab-item positive\" ng-click=vm.addFavorite(vm.question.questionId)><i class=\"icon ion-ios-star-outline positive\"></i> <span class=positive>收藏</span></div><div class=\"tab-item positive\" ng-click=vm.addComment(vm.question.answerId)><i class=\"icon ion-ios-chatboxes-outline positive\"></i> <span class=positive>评论</span></div><div class=\"tab-item positive\" ng-click=vm.addLike(vm.question.answerId)><i class=\"icon positive\" ng-class=\"vm.isLiked(vm.question.answerId) ? \'ion-ios-heart\' : \'ion-ios-heart-outline\'\"></i> <span class=positive>赞</span></div></div></ion-footer-bar></ion-view>");
$templateCache.put("app/question/question-home.html","<ion-view><ion-nav-title><span>最新的秒答</span></ion-nav-title><ion-nav-buttons side=left><button class=\"button button-icon button-clear ion-navicon\" menu-toggle=left></button></ion-nav-buttons><ion-nav-buttons side=right><button class=\"button button-icon button-clear ion-ios-search\" menu-toggle=right ui-sref=app.question.search></button></ion-nav-buttons><ion-content><ion-refresher pulling-text=下拉刷新 on-refresh=vm.doRefresh()></ion-refresher><div class=questions><div cf-question-card=\"\" ng-repeat=\"(index, question) in vm.questions\" class=card question=question index=index></div></div><ion-infinite-scroll ng-if=vm.moreDataCanBeLoaded() on-infinite=vm.loadMoreData() distance=1% icon=ion-loading-c></ion-infinite-scroll></ion-content><ion-footer-bar class=bar-light><div class=button-bar><a class=\"button button-clear icon ion-ios-plus-empty\" ng-click=vm.newQuestion()></a></div></ion-footer-bar></ion-view>");
$templateCache.put("app/question/question-main.html","<ion-view title=秒答><ion-nav-view name=question-home></ion-nav-view></ion-view>");
$templateCache.put("app/question/search-home.html","<ion-view><ion-nav-bar class=\"bar-positive nav-title-slide-ios7 search-bar\"><ion-nav-title style=\"width: 100%;width: 100%;display: block;margin-top: -5px;\" class=search-input-panel><form ng-submit=vm.doSearch()><div class=\"bar-positive item-input-inset\"><div class=item-input-wrapper><i class=\"icon ion-android-search\"></i> <input type=search class=search-input placeholder=输入你要搜索的内容 min-length=1 ng-model=vm.searchText.value autofocus style=\"width: 100%;\"> <i ng-if=\"vm.searchText.value.length > 0\" ng-click=vm.clearSearch() class=\"icon ion-close\"></i></div></div></form></ion-nav-title><ion-nav-buttons side=right><button class=\"button button-clear\" ng-click=vm.cancleSearch()>取消</button></ion-nav-buttons></ion-nav-bar><ion-content><div class=questions><div cf-question-card=\"\" ng-repeat=\"(index, question) in vm.questions\" question=question index=index class=card></div></div><ion-infinite-scroll ng-if=vm.moreDataCanBeLoaded() on-infinite=vm.loadMoreData() distance=1% icon=ion-loading-c></ion-infinite-scroll></ion-content></ion-view>");
$templateCache.put("app/question/topic.html","<ion-view title=话题><ion-nav-buttons side=left><button class=\"button button-icon button-clear ion-navicon\" menu-toggle=left></button></ion-nav-buttons><ion-content><h1>话题</h1></ion-content></ion-view>");
$templateCache.put("app/security/login.html","<ion-view class=login-view><ion-nav-bar class=\"bar-clear nav-title-slide-ios7\"><ion-nav-buttons side=left><button class=\"button button-icon button-clear ion-ios-close-empty\" ng-click=vm.closeLogin()></button></ion-nav-buttons></ion-nav-bar><ion-content class=padding><div class=\"row form-heading\"><div class=\"col col-center\"><h1 class=form-title>{{vm.title}}</h1></div></div><div class=\"row form-wrapper\"><div class=col><form name=login_form class novalidate><div class=\"list input-fields\"><label class=\"item item-input\"><i class=\"icon ion-ios-person-outline placeholder-icon\"></i> <input type=text name=user_name placeholder=用户名/手机号 ng-model=vm.user.userName required></label> <label class=\"item item-input\" cf-show-hide-container=\"\"><i class=\"icon ion-ios-locked-outline placeholder-icon\"></i> <input type=password name=password ng-model=vm.user.password placeholder=密码 required cf-show-hide-input=\"\"></label> <button type=submit class=\"login button button-block\" ng-click=vm.doLogin() ng-disabled=login_form.$invalid>登录</button><p ng-show=vm.error class=\"message error\">{{vm.error}}</p></div></form><div class=alternative-actions><a class=\"forgot-password button button-small button-clear\" ui-sref=forgot_password>忘记密码?</a> <a class=\"sign-up button button-small button-clear\" ui-sref=register>注册</a></div></div></div></ion-content></ion-view>");
$templateCache.put("app/security/register.html","<ion-view class=register-view><ion-nav-bar class=\"bar-clear nav-title-slide-ios7\"><ion-nav-buttons side=left><button class=\"button button-icon button-clear ion-ios-close-empty\" ng-click=vm.closeRegister()></button></ion-nav-buttons></ion-nav-bar><ion-content class=padding><div class=\"row form-heading\"><div class=\"col col-center\"><h1 class=form-title>注册账号</h1></div></div><div class=\"row form-wrapper\"><div class=col><form name=signup_form class novalidate><div class=\"list input-fields\"><label class=\"item item-input\"><i class=\"icon ion-ios-telephone-outline placeholder-icon\"></i> <input type=text name=user_telephone placeholder=请输入手机号 ng-model=vm.user.telephone required></label> <label class=\"item item-input\"><i class=\"icon ion-ios-person-outline placeholder-icon\"></i> <input type=text name=verify_code placeholder=请输入验证码 ng-model=vm.user.verifyCode required> <a class=append-view-anchor on-touch=vm.doVerifyPhone()><span>获取验证码</span></a></label> <label class=\"item item-input\"><i class=\"icon ion-ios-email-outline placeholder-icon\"></i> <input type=email name=email placeholder=请输入邮箱 ng-model=vm.user.email required></label> <label class=\"item item-input\"><i class=\"icon ion-ios-person-outline placeholder-icon\"></i> <input type=text name=fullname_name placeholder=请输入姓名 ng-model=vm.user.fullName required></label> <label class=\"item item-input\" cf-show-hide-container=\"\"><i class=\"icon ion-ios-locked-outline placeholder-icon\"></i> <input type=password name=password placeholder=请输入密码 ng-model=vm.user.password required cf-show-hide-input=\"\"></label> <button type=submit class=\"register button button-block\" ng-click=vm.doRegister() ng-disabled=signup_form.$invalid>注册</button><p ng-show=vm.error class=\"message error\">{{vm.error}}</p></div></form></div></div></ion-content></ion-view>");
$templateCache.put("app/security/show-hide-password.html","<div class=show-hide-input ng-transclude=\"\"></div><a class=toggle-view-anchor on-touch=toggleType($event)><span ng-show=show><i class=\"icon ion-eye-disabled\"></i></span> <span ng-show=!show><i class=\"icon ion-eye\"></i></span></a>");
$templateCache.put("app/settings/faqs.html","<ion-modal-view><ion-header-bar><h1 class=title>常见问题</h1><div class=\"button button-clear\" ng-click=vm.closeFAQs()><span class=\"icon ion-ios-close-empty\"></span></div></ion-header-bar><ion-content><div class=faqs><ul class=list><li class=faq-item><h5>什么是妙答?</h5><p>就是你一提问题，duang,答案就来了.</p></li><li class=faq-item><h5>我可以提出什么问题?</h5><p>吃喝拉撒都可以问题，问题没有底线</p></li><li class=faq-item><h5>为何要使用妙答?</h5><p>必须的.</p></li></ul></div></ion-content></ion-modal-view>");
$templateCache.put("app/settings/settings.html","<ion-view class=settings-view title=设置><ion-nav-buttons side=left><button class=\"button button-icon button-clear ion-navicon\" menu-toggle=left></button></ion-nav-buttons><ion-nav-title><span>设置</span></ion-nav-title><ion-content><ul class=list><ion-toggle ng-model=notifications toggle-class=toggle-positive>新消息通知</ion-toggle><div class=\"item item-divider\">服务与法律</div><a class=item href ng-click=vm.showTerms()>服务条款</a> <a class=item href ng-click=vm.showFAQS()>常见问题</a><div class=\"item item-divider\">账号</div><a class=\"item option\" ng-click=vm.showLogOutMenu()><i class=\"icon ion-power\"></i> <span class=title>退出当前登录</span></a></ul></ion-content></ion-view>");
$templateCache.put("app/settings/terms.html","<ion-modal-view><ion-header-bar><h1 class=title>服务条款</h1><div class=\"button button-clear\" ng-click=vm.closeTerms()><span class=\"icon ion-ios-close-empty\"></span></div></ion-header-bar><ion-content><div class=terms-of-service><p>最后更新时间: 2015－4-1</p><h4 class=title>欢迎来到秒答!</h4><p>感谢你使用我们的产品和服务 (服务)。秒答是8点后新推出的一大免费产品。为了使用这个应用，我们需要您的联系信息（如姓名、电子邮件地址等）。我们将使用这些信息与用户联系，用户也能够使用这些信息作为的登录信息。在未经用户许可的情况下，我们不会向第三方提供用户的个人信息。 本应用保留使用汇总统计性信息的权利，在不透露单个用户隐私资料的前提下，本应用有权对整个用户数据库进行分析并对用户数据库进行商业上的利用。</p><h4 class=title>安全</h4><p>您的信息被存储在我们的服务器上。尽管系统采取了预防性保护措施，还是可能会有非法截取或访问传输或进行私人通讯行为及其他人的滥用误用从我们网站搜集的信息的情况。因此，秒答不为个人信息或私人通信记录的不正当发布或滥用承担法律责任。</p><h4 class=title>关于这些条款</h4><p>我们随时可能在没有事先通知您的情况下修改隐私声明，因此，我们强烈建议您经常点击这里更新。我们会将修改后的条款更新在本页，当您在我们修改后访问和使用本应用和服务，表示您同意遵守并接受服务条款和隐私声明限制。</p></div></ion-content></ion-modal-view>");
$templateCache.put("app/user/answer-question.html","<ion-modal-view><form name=answer_form novalidate><ion-header-bar><button class=\"button button-icon button-clear ion-ios-close-empty\" ng-click=vm.closeAnswerModal()></button><h1 class=title>回答</h1><button class=\"button button-clear button-positive\" ng-click=vm.doAnswer() ng-disabled=answer_form.$invalid>发送</button></ion-header-bar><ion-content><label class=\"item item-input item-floating-label\"><textarea type=text name=answer ng-model=vm.answer.data rows=8 placeholder=输入你的回答... required autofocus></textarea></label></ion-content></form></ion-modal-view>");
$templateCache.put("app/user/user-answers.html","<ion-view title=我的回答><ion-nav-buttons side=left><button class=\"button button-icon button-clear ion-navicon\" menu-toggle=left></button></ion-nav-buttons><ion-content><ion-refresher pulling-text=下拉刷新 on-refresh=vm.doRefresh()></ion-refresher><div class=\"row favorites-container\"><div ng-if=\"vm.questions.length == 0\" class=\"col col-center\"><div class=empty-results><i class=\"icon ion-favorite\"></i><h3 class=no-favorites>空空如也，点击这里开始提问吧！</h3></div></div></div><ion-list ng-if=\"vm.questions.length > 0\"><ion-item ng-repeat=\"(index, question) in vm.questions\" class=\"item-icon-left item-icon-right item-button-right\" type=item-text-wrap ng-click=vm.viewDetails(index)><i class=icon ng-class=\"question.status == \'FINISHED\' ? \'ion-ios-checkmark positive\' : \'ion-ios-help assertive\'\"></i><h2 ng-bind-html=\"question.title | rawHtml\"></h2><p ng-class=subdued style=right:-20px;>{{vm.formatChinaTime(question.createdTS)}} 提问</p><p ng-if=\"question.status == \'FINISHED\'\">\'已回答</p><p ng-if=\"question.status !== \'FINISHED\'\">查看详细</p><i class=\"icon ion-chevron-right icon-accessory\" ng-if=\"question.status == \'FINISHED\'\"></i> <button class=\"button button-stable\" ng-if=\"question.status != \'FINISHED\'\" ng-click=vm.answerQuestion(index)>回答</button></ion-item></ion-list><ion-infinite-scroll ng-if=vm.moreDataCanBeLoaded() on-infinite=vm.loadMoreData() distance=1% icon=ion-loading-c></ion-infinite-scroll></ion-content></ion-view>");
$templateCache.put("app/user/user-favorites.html","<ion-view title=收藏的><ion-nav-buttons side=left><button class=\"button button-icon button-clear ion-navicon\" menu-toggle=left></button></ion-nav-buttons><ion-content><div class=\"row favorites-container\"><div ng-if=\"vm.favorites.length == 0\" class=\"col col-center\"><div class=empty-results><i class=\"icon ion-favorite\"></i><h3 class=no-favorites>There\'s nothing here yet. Start exploring!</h3></div></div></div><ion-list ng-if=\"vm.favorites.length > 0\"><ion-item ng-repeat=\"favorite in vm.favorites\" class=\"item-remove-animate item-icon-right\" type=item-text-wrap ui-sref=\"app.question.detail({questionID : favorite.questionId})\"><h2 ng-bind-html=\"favorite.title | rawHtml\"></h2><p>{{favorite.replier.name}} - {{favorite.replier.headline}}</p><i class=\"icon ion-chevron-right icon-accessory\"></i><ion-option-button class=button-assertive ng-click=vm.remove(chat)>取消</ion-option-button></ion-item></ion-list></ion-content></ion-view>");
$templateCache.put("app/user/user-main.html","<ion-view title=我的妙答><div class=\"tabs-striped tabs-background-light tabs-color-positive\"><ion-tabs class=tabs-icon-left animation=slide-left-right-ios7><ion-tab title=提出的 icon=\"icon ion-ios-help-outline\" ui-sref=app.user.questions><ion-nav-view name=tab-user-questions></ion-nav-view></ion-tab><ion-tab title=回答的 icon=\"icon ion-ios-compose-outline\" ui-sref=app.user.answers><ion-nav-view name=tab-user-answers></ion-nav-view></ion-tab></ion-tabs></div></ion-view>");
$templateCache.put("app/user/user-question-detail.html","<ion-modal-view><ion-header-bar><button class=\"button button-icon button-clear ion-ios-close-empty\" ng-click=vm.closeDetailModal()></button><h1 class=title>问题详情</h1></ion-header-bar><ion-content><div class=item type=item-text-wrap><h2 style=\"color: #3498db;\" ng-bind-html=\"vm.currentQuestion.title | rawHtml\"></h2><p class=subdued style=\"font-size: 10px; color: orange;\">{{vm.formatChinaTime(vm.currentQuestion.createdTS)}} 提问</p><p class=stable style=\"font-size: 14px; magin-top: 10px;\" ng-bind-html=\"vm.currentQuestion.content | rawHtml\"></p></div></ion-content></ion-modal-view>");
$templateCache.put("app/user/user-questions.html","<ion-view title=我的提问><ion-nav-buttons side=left><button class=\"button button-icon button-clear ion-navicon\" menu-toggle=left></button></ion-nav-buttons><ion-nav-buttons side=right><a class=\"button button-clear\" ng-click=vm.newQuestion() ng-disabled=answer_form.$invalid>立即提问</a></ion-nav-buttons><ion-content><ion-refresher pulling-text=下拉刷新 on-refresh=vm.doRefresh()></ion-refresher><div class=\"row favorites-container\"><div ng-if=\"vm.questions.length == 0\" class=\"col col-center\"><div class=empty-results><i class=\"icon ion-favorite\"></i><h3 class=no-favorites>空空如也！点击这里参与讨论吧</h3></div></div></div><ion-list ng-if=\"vm.questions.length > 0\"><ion-item ng-repeat=\"(index, question) in vm.questions\" class=\"item-icon-left item-icon-right\" type=item-text-wrap ng-click=vm.viewDetails(index)><i class=icon ng-class=\"question.status == \'FINISHED\' ? \'ion-ios-checkmark positive\' : \'ion-ios-help assertive\'\"></i><div style=\"position: relative;\"><h2 ng-bind-html=\"question.title | rawHtml\"></h2><span ng-class=subdued style=\"position:absolute; right:-20px; top: 0px; font-size: 10px;\">{{vm.formatChinaTime(question.createdTS)}} 提问</span></div><p>{{question.status == \'FINISHED\' ? \'已回答\' : \'等待回答\'}}</p><i class=\"icon ion-chevron-right icon-accessory\" ng-if=\"question.status == \'FINISHED\'\"></i></ion-item></ion-list><ion-infinite-scroll ng-if=vm.moreDataCanBeLoaded() on-infinite=vm.loadMoreData() distance=1% icon=ion-loading-c></ion-infinite-scroll></ion-content></ion-view>");}]);