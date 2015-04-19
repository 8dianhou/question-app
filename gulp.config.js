module.exports = function() {
    var source = './src/';
    var app = source + 'app/';
    var root = './';
    var temp = './.tmp/';
    var bower = {
        json: require('./bower.json'),
        directory: './bower_components/',
        ignorePath: '../..'
    };


    var config = {

        build: './build/',
        source: source,
        css: temp + 'ionic.app.min.css',

        html: source + '**/*.html',
        htmltemplates: app + '**/*.html',
        index: source + 'index.html',

        // app js, with no specs
        js: [
            app + '**/*.module.js',
            app + '**/*.js',
            '!' + app + '**/*.spec.js'
        ],

        jsOrder: [
            '**/app.module.js',
            '**/*.module.js',
            '**/*.js'
        ],

        sass: './scss/ionic.app.scss',

        temp: temp,

        /**
         * template cache
         */
        templateCache: {
            file: 'templates.js',
            options: {
                module: 'app.core',
                root: 'app/',
                standAlone: false
            }
        },

        bower: bower,

        /**
         * optimized files
         */
        optimized: {
            app: 'app.js',
            lib: 'lib.js'
        },
    };

    /**
     * wiredep and bower settings
     */
    config.getWiredepDefaultOptions = function() {
        var options = {
            bowerJson: config.bower.json,
            directory: config.bower.directory,
            ignorePath: config.bower.ignorePath
        };
        return options;
    };

    return config;
}
