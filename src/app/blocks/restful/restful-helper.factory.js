(function() {
    'use strict'

    angular
        .module('blocks.restful')
        .factory('restfulHelper', restfulHelperFactory);


    restfulHelperFactory.$inject = ['$http', '$q'];

    function restfulHelperFactory($http, $q) {

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
                params: reqParams,
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

            $http(req).success(function(data) {
                    console.log(data);
                    if (data.status == 'SUCCESS') {
                        deferred.resolve(data.result);
                    } else {
                        deferred.reject(formatMessage(data.result.code, data.result.arguments));
                    }
                })
                .error(function(e, status) {
                    deferred.reject('远程服务故障，请稍后再试！' + JSON.stringify(status) + JSON.stringify(req));
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
