(function () {
    
    // Establish the root object, `window` in the browser, or `global` on the server.
    var root = this;
    requirejs.config(
        {
            baseUrl: 'scripts/app', /* script default location */
         
            // List paths to js files that are not in the baseUrl.
            /*** TEMPORARY ***/
            // ToDo: use the non-amd versions of these libs so we can bundle them in with others 
            //       then we wouldn't need paths.
            paths: {

                'infuser': '../lib/infuser-amd',
                'knockout.changetracker': '../lib/knockout.changetracker-amd',
                'koExternalTemplateEngine': '../lib/koExternalTemplateEngine-amd',
                'trafficcop': '../lib/TrafficCop-amd',
            }

        }
    );
    registerNonAmdLibs();
    loadExtensionsAndBoot();

    // supporting fncs
    
    function registerNonAmdLibs() {
        define('jquery', [], function () { return root.jQuery; });
        define('ko', [], function () { return root.ko; });
        define('amplify', [], function () { return root.amplify; });
        define('moment', [], function () { return root.moment; });
        define('sammy', [], function () { return root.Sammy; });
        define('toastr', [], function () { return root.toastr; });
        define('underscore', [], function () { return root._; });
    }
    
    function loadExtensionsAndBoot() {
        // Require that these AMD plugins be loaded now
        // so that we don't have to name them specifically in 
        // the modules that make use of them because
        // we don't want those modules to know that they use plugins.
        requirejs([
                'debug.helpers', // the app's ko debugging plugin 
                'jquery.activity-ex', // jquery plugin
                'ko.asyncCommand', // Knockout custom asyncCommand
                'ko.bindingHandlers', // Knockout custom binding handlers
                'ko.bindingHandlers.activity', // Knockout custom binding handlers
                'ko.bindingHandlers.command', // Knockout custom binding handlers
                'ko.utils', // Knockout custom utilities
                'knockout.changetracker', // TODO: move into app?
                'koExternalTemplateEngine' // TODO: move out when not using '-amd' scripts
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