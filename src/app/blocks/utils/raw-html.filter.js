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
