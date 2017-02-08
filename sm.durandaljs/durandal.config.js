var lib = '../../../../hyway/durandal/lib';

module.exports = {
    baseDir: 'durandal/app/siteManagement',   //same as default, so not really required.
    main: 'main.js',  //same as default, so not really required.
    output: 'main.js', //same as default, so not really required.
    almond: true,
    minify: true,
    verbose: true,
    // extraModules: [{
    // 	'bootstrap': lib + '/bootstrap/js/bootstrap'
    // }],
    rjsConfigAdapter: function (config) {
        //Tell requirejs to load the "main" module
        //console.log(config);
        config.paths = {
            'text': lib + '/require/text',
            'durandal': lib + '/durandal/js',
            'plugins': lib + '/durandal/js/plugins',
            'transitions': lib + '/durandal/js/transitions',
            'knockout': lib + '/knockout/knockout-2.3.0',
            'knockout.mapping': lib + '/knockout/knockout.mapping-latest.debug',
            'knockout.ext': lib + '/knockout/knockout-extension',
            'kg': lib + '/knockout/koGrid-2.1.1.debug',
            //        'knockout.mapping': '../../GroupedGrid/knockout.mapping-latest',
            'bootstrap': lib + '/bootstrap/js/bootstrap',
            'jquery': lib + '/jquery/jquery-1.9.1',
            'jquery.datepicker': lib + '/jquery/jquery-ui-1.10.4.datepicker',
            'highcharts': lib + '/jquery/highcharts.src',
            'exporting': lib + '/jquery/exporting',
            'moment': lib + '/moment.min'
        };
        //config.exclude = ['jquery'],
        config.optimize = "uglify2";
        config.uglify2 = {
            output: {
                // "beautify": false,
                // https://github.com/mishoo/UglifyJS2#beautifier-options
                // properties like for, class keep to "for", "class"
                "keep_quoted_props": true,
                //"quote-keys": true
            },
            compress: {
                sequences: true,
                // d.if -> d["if"]
                properties: false,
                global_defs: {
                    DEBUG: false
                }
            },
            warnings: true,
            mangle: false,
            verbose: true
        };
        /*
        config.map = {
            '*': {
                'css': node_modules + '/require-css/css' // or whatever the path to require-css is 
            }
        };
        */

        //config.stubModules = ['css'],
        //config.optimizeCss = "none";
        //config.logLevel= 0;
        config.insertRequire = ["main"];
        return config;
    },
    durandalDynamicModules: true,

    // https://github.com/welldone-software/gulp-durandal/blob/4eacd22fcc567a372e04e6de443b0228572d6400/index.js#L27 - remove css
    pluginMap: {
        '.html': 'text',
        '.json': 'text',
        '.txt': 'text',
        '.xml': 'text'
    },
    /*
    moduleFilter: function(m){
        console.log(m);
        if (/css!/.test(m)){
            console.log(arguments);
            console.log("ignore" +m);
            return false;
        }
        return true;
    },
    */
    logLevel: 0
};