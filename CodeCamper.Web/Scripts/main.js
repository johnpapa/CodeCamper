(function () {
    
    // Establish the root object, `window` in the browser, or `global` on the server.
    var root = this;
    
    requirejs.config(
        {
            // Let require.js load all app/custom modules asynchronously as needed.
            // They are all in this folder.
            baseUrl: 'scripts/app' /* script default location */
         
            // List paths to js files that are not in the baseUrl and not in bundles.
            // If we use the non-amd versions of 3rd libs we can bundle them instead.
            // In which case we don;t need the paths.
            // Example:
            //paths: {
            //    'knockout.changetracker': '../lib/knockout.changetracker-amd',
            //}
        }
    );

    // Load the 3rd party libraries
    registerNonAmdLibs();
    // Load our app/custom plug-ins and bootstrap the app
    loadExtensionsAndBoot();

    function registerNonAmdLibs() {
        // Load the 3rd party libraries that the app needs.
        // These are in the bundle (BundleConfig.cs).
        define('jquery', [], function () { return root.jQuery; });
        define('ko', [], function () { return root.ko; });
        define('amplify', [], function () { return root.amplify; });
        define('infuser', [], function () { return root.infuser; });
        define('moment', [], function () { return root.moment; });
        define('sammy', [], function () { return root.Sammy; });
        define('toastr', [], function () { return root.toastr; });
        define('underscore', [], function () { return root._; });
    }
    
    // Load our app/custom plug-ins and bootstrap the app
    function loadExtensionsAndBoot() {
        // Require that these custom plugins be loaded now
        // so that we don't have to name them specifically in 
        // the modules that make use of them because
        // we don't want those modules to know that they use plugins.
        requirejs([
                'jquery.activity-ex',           // jquery plugin
                'ko.asyncCommand',              // Knockout custom asyncCommand
                'ko.bindingHandlers',           // Knockout custom binding handlers
                'ko.bindingHandlers.activity',  // Knockout custom binding handlers
                'ko.bindingHandlers.command',   // Knockout custom binding handlers
                'ko.debug.helpers',             // Knockout debugging plugin for the app
                'ko.dirtyFlag',                 // Knockout dirtyFlag
                'ko.utils',                      // Knockout custom utilities
                'wijmo-gauge-defaults'
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