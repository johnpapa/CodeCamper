(function () {
    // Establish the root object, `window` in the browser, or `global` on the server.
    var root = this;
    
    requirejs.config(
        {
            // Let require.js load all app/custom modules asynchronously as needed.
            // They are all in this folder.
            // If we bundle this folder, this is not needed. But if we don't bundle, we need this.
            baseUrl: '../scripts/app' /* script default location */
        }
    );

    // Load the 3rd party libraries
    registerNonAmdLibs();
    // Load our app/custom plug-ins and bootstrap the app
    loadExtensionsAndBoot();

    function registerNonAmdLibs() {
        // Load the 3rd party libraries that the app needs.
        // These are in the bundle (BundleConfig.cs).
        // These are the core libraries that many others depend on.
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
                // These plugins use "define" and we need to load them, so we kick them off here.
                'ko.bindingHandlers',
                'ko.debug.helpers'
        ], boot);
    }
    
    function boot() {
        // no op
    }
    
})();