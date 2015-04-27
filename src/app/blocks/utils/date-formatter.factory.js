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
