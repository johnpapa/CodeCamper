(function () {

    // 2 Phases to loading libraries and boot app using require
    configureRequire();
    loadCoreLibraries();

    /*** Phase 1 ***/
    
    function configureRequire() {

        requirejs.config({

            // script default location
            baseUrl: 'scripts/app',

            // shim in the libs that don't know define.amd (excluding extensions)
            shim: {
                'amplify': { deps: [], exports: 'amplify' },
                // jquery 1.7.x understands define; no shim needed.
                'jquery.ui': ['jquery'],
                'jquery.wijmo': ['jquery.ui'],
                'json2': { exports: 'JSON' },
                'knockout.wijmo': ['ko', 'jquery.wijmo'],
                //'ko': { deps: ['jquery'], exports: 'ko' }, //ko 2.1 understands define; no shim needed
                // moment understands define; no shim needed.
                'sammy': { deps: ['jquery'], exports: 'Sammy' },
                'toastr': { deps: ['jquery'], exports: 'toastr' },
                'underscore': { deps: [], exports: '_' }
            },

            // List paths to js files that are not in the baseUrl.
            // Could simplify for libraries that are conventionally named
            // (which is all of them except jquery which identifies the version).
            paths: {
                'activity-indicator': '../lib/activity-indicator',
                'amplify': '../lib/amplify.core',
                'amplify.request': '../lib/amplify.request',
                'amplify.store': '../lib/amplify.store',
                'jquery': '../lib/jquery-1.7.2.min',
                'jquery.mockjson': '../lib/jquery.mockjson',
                'jquery.ui': '../lib/jquery-ui.min',
                'jquery.wijmo': '../lib/jquery.wijmo-open.all.2.1.2.min',
                'json2': '../lib/json2.min',
                'infuser': '../lib/infuser-amd',
                'knockout.changetracker': '../lib/knockout.changetracker-amd',
                'knockout.wijmo': '../lib/knockout.wijmo',
                'ko.validation': '../lib/knockout.validation',
                'ko': '../lib/knockout-2.1.0',
                'koExternalTemplateEngine': '../lib/koExternalTemplateEngine-amd',
                'moment': '../lib/moment',
                'sammy': '../lib/sammy',
                'sammy.title': '../lib/sammy.title',
                'toastr': '../lib/toastr',
                'trafficcop': '../lib/TrafficCop-amd',
                'underscore': '../lib/underscore.min'
            }
        });
    }


    /*** Phase 2 ***
     *
     *   Loading libraries and bootstrap app in three nested steps
     *   1. loadCoreLibraries - Load the core 3rd party libraries
     *   2. loadDependencies - Load the libraries and extensions that depend upon the core libs
     *   3. boot - Boot the app
     */

    function loadCoreLibraries() {
        // Require that pre-requisites be loaded immediately, before anything else
        // ToDo: Pare back the ones that don't have plugins?
        requirejs([
            // 3rd party libraries
            'ko',
            'json2',
            'jquery',
            'underscore',
            'moment',
            'sammy',
            'amplify',
            'toastr'
        ], loadDependencies);
    }

    // use the parameterized signature if you want to confirm that dependencies are loaded with the debugger
    // function loadKnockoutDependencies(ko, json2, $, _, moment, Sammy, amplify, toastr) {
    //    debugger; 
    function loadDependencies(ko) {

        // ensure KO is in the global namespace ('this') 
        if (!this.ko) {
            this.ko = ko;
        };

        // Require that plugins be loaded, after the prerequisite libraries
        //       We load the plugins here and now so that we don't have to 
        //       name them specifically in the modules that use them because
        //       we don't want those modules to know that they use plugins.
        requirejs([
                'activity-indicator', // jquery plugin
                'sammy.title', // sammy plugin
                'amplify.request', // amplify plugin
                'amplify.store', // amplify plugin
                'jquery.mockjson', // jquery plugin
                'jquery.activity-ex', // jquery plugin
                'jquery.ui', // jquery plugin
                'jquery.wijmo', // jquery plugin
                'ko.utils', // Knockout custom utilities
                'ko.bindingHandlers', // Knockout custom binding handlers
                'ko.bindingHandlers.activity', // Knockout custom binding handlers
                'ko.bindingHandlers.command', // Knockout custom binding handlers
                'ko.asyncCommand', // Knockout custom asyncCommand
                'knockout.changetracker',
                'knockout.wijmo', // Knockout wijmo binding handlers
                'koExternalTemplateEngine',
                'ko.validation', // Knockout validation
                'debug.helpers'             // our app's ko debugging plugin
        ], boot);
    }
    
    function boot() {
        // Start-up the app, now that all prerequisites are in place.
        require(['bootstrapper'],
            function (bs) {
                bs.run();
            });
    }
    
})();