angular.module('question-app.services', [])


.factory('RestfulService', function($rootScope, $http, $q, utility) {

    var _callHttpAPI = function(req) {
        var deferred = $q.defer();
        $http(req).success(function(data) {
                console.log(data);
                if (data.status == 'SUCCESS') {
                    deferred.resolve(data.result);
                } else {
                    deferred.reject(utility.formatMessage(data.result.code, data.result.arguments));
                }
            })
            .error(function() {
                deferred.reject('远程服务故障，请稍后再试！');
            });

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
    }

    return {
        get: function(url, params, cached) {
            var isCached = cached || false;

            var req = {
                method: 'GET',
                url: url,
                cache: isCached
            }

            return _callHttpAPI(req);
        },

        post: function(url, data, params, options) {
            data = data || {};
            var postOptions = options || {};

            var req = {
                method: 'POST',
                url: url,
                data: data,
                params: params
            }

            for (var element in postOptions) {
                if (postOptions.hasOwnProperty(element)) {
                    req[element] = postOptions[element];
                }
            }

            return _callHttpAPI(req);
        },

        put: function(url, data) {
            data = data || {};
            var req = {
                method: 'POST',
                url: url,
                data: data
            }
            return _callHttpAPI(req);
        },

        delete: function(url) {
            var req = {
                method: 'DELETE',
                url: url
            }

            return _callHttpAPI(req)

        },

        jsonp: function(url, params) {
            var reqParams = {
                'callback': 'JSON_CALLBACK'
            };

            for (element in params) {
                if (params.hasOwnProperty(element)) {
                    reqParams[element] = params[element];
                }
            }

            req = {
                method: 'JSONP',
                url: url,
                params: reqParams
            }

            return _callHttpAPI(req);
        }
    };
})


.factory('APIFunctions', ['utility', function(utility) {

    var getPropByString = utility.getPropByString;

    return {
        // 为API调用创建URL
        makeURL: function(settings) {

            var returnData = {};
            returnData.URL = settings.URL.baseURL();
            returnData.params = {};

            for (var element in settings.URL.params) {
                if (settings.URL.params.hasOwnProperty(element)) {
                    returnData.params[element] = settings.URL.params[element]();
                }
            }


            //_params["callback"] = 'JSON_CALLBACK';

            return returnData;
        },

        // prepare the Return Data based on the Settings
        prepareData: function(data, settings) {

            if (settings.Type == 'detail') {

                if (!getPropByString(data, settings.API_DataProperty) || getPropByString(data, settings.API_DataProperty).length == 0) {
                    var originalData = data;
                } else {
                    var originalData = getPropByString(data, settings.API_DataProperty)
                }

                var returnData = {};
                var originalData = getPropByString(data, settings.API_DataProperty)
                var fullData = data

                for (var element in settings.returnElements) {
                    if (settings.returnElements.hasOwnProperty(element)) {
                        returnData[element] = settings.returnElements[element](originalData, fullData);
                    }
                }

            } else {
                var returnData = [];
                var originalData = getPropByString(data, settings.API_DataProperty)
                var fullData = data

                for (var i = 0; i < originalData.length; i++) {
                    returnData[i] = {};
                    for (var element in settings.returnElements) {
                        if (settings.returnElements.hasOwnProperty(element)) {
                            returnData[i][element] = settings.returnElements[element](originalData[i], fullData);
                        }
                    }
                }
            }

            return returnData;
        }
    }
}])

.factory('utility', [function() {

    return {
        readyCheckBoxes: function(checkboxes, cacheStorage) {
            for (var i = 0; i < cacheStorage.length; i++) {
                checkboxes[cacheStorage[i]] = true;
            }
        },
        saveCheckBoxes: function(checkboxes, scopeData, cacheStorage, cacheObjects) {
            var tempData = cacheStorage;
            var tempObjData = cacheObjects;
            var responseObject = {};


            for (var i = 0; i < scopeData.length; i++) {
                if (tempData.indexOf(scopeData[i].API_ID) > -1) {
                    tempObjData.splice(tempData.indexOf(scopeData[i].API_ID), 1);
                    tempData.splice(tempData.indexOf(scopeData[i].API_ID), 1);
                }
                if (checkboxes[scopeData[i].API_ID]) {
                    tempObjData.push(scopeData[i]);
                    tempData.push(scopeData[i].API_ID);
                }
            }

            responseObject.data = tempData;
            responseObject.dataObject = tempObjData;

            return responseObject;
        },
        // 将数组input划分，数组的基于size划分成多个数组
        partition: function(input, size) {
            var newArr = [];
            for (var i = 0; i < input.length; i += size) {
                newArr.push(input.slice(i, i + size));
            }
            return newArr;
        },

        formatMessage: function(code, args) {
            args = args || [];

            var res = code;
            for (var i = 0; i < args.length; i++) {
                res = res.replace('${' + i + '}', args[i]);
            }

            return res;

        },

        getPropByString: function(obj, propString) {
            // function to get a specific part of the return object

            if (!propString)
                return obj;

            var prop, props = propString.split('.');

            for (var i = 0, iLen = props.length - 1; i < iLen; i++) {
                prop = props[i];

                var candidate = obj[prop];
                if (candidate !== undefined) {
                    obj = candidate;
                } else {
                    break;
                }
            }
            return obj[props[i]];
        }
    }
}])

.factory('$localstorage', ['$window', function($window) {
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
}])

.factory('$messageLoading', ['$ionicLoading', '$timeout', function($ionicLoading, $timeout) {
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
}])

.service('AuthService', function($rootScope, $http, $q, $localstorage, RestfulService, SERVER_API_URL) {
    var USER_KEY = '_user_';
    var ACTIVE_STATE = '_active_state';

    this.saveActiveState = function(activeState) {
        $localstorage.setObject(ACTIVE_STATE, activeState)
    };

    this.retrieveAncClearActiveState = function() {
        var activeState = $localstorage.getObject(ACTIVE_STATE);
        $localstorage.destroy(ACTIVE_STATE);

        return activeState
    };


    // validate the user phone
    this.verifyPhone = function(phoneNumber) {
        return RestfulService.jsonp(SERVER_API_URL + 'api/user/verify_phone', {
            phone: phoneNumber
        });
    };

    this.userIsLoggedIn = function() {
        var deferred = $q.defer();

        var user = $localstorage.getObject(USER_KEY);
        if (user.length !== 0) {
            RestfulService.jsonp(SERVER_API_URL + 'api/user/validate_auth')
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

    this.doLogin = function(user) {
        var deferred = $q.defer(),
            authService = this;

        RestfulService.jsonp(SERVER_API_URL + 'api/user/auth/v2', user)
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

    this.doRegister = function(user) {
        var deferred = $q.defer(),
            authService = this;

        RestfulService.jsonp(SERVER_API_URL + 'api/user/regisiter', {
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


    this.doForgotPassword = function(username) {
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

    this.logOut = function() {
        //empty user data
        $localstorage.destroy(USER_KEY);
    };

    //update user avatar from WP
    this.updateUserInfo = function() {
        var deferred = $q.defer(),
            authService = this,
            user = $localstorage.getObject(USER_KEY).data;

        RestfulService.jsonp(SERVER_API_URL + 'api/user/info', {
                accountId: user.user_id
            }).then(function(result) {
                var userInfo = {
                    data: result,
                    user_id: result.accountId
                };

                authService.saveUser(userInfo);

                deferred.resolve(result);
            })
            .error(function(err) {
                console.log('更新用户数据错误' +
                    err);
            });

        return deferred.promise;
    };

    this.saveUser = function(user) {
        $localstorage.setObject(USER_KEY, user);
    };

    this.getUser = function() {
        var user = $localstorage.getObject(USER_KEY);

        if (user['data']) {
            return {
                avatar: $localstorage.getObject(USER_KEY).data.avatarUrl,
                fullname: $localstorage.getObject(USER_KEY).data.fullname,
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
});
