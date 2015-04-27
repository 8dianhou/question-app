(function() {
    'use strict';

    angular
        .module('app.core', [
            'blocks.router', 'blocks.restful', 'blocks.utils',
            'ui.router', 'ngCordova'
        ]);
})();
