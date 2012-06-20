requirejs.config({

    // by default load
    baseUrl: 'scripts/app',

    // shim in the libs that don't know define.amd
    shim: {
        // jquery 1.7.x understands define; no shim needed.
        'activity-indicator': { deps: ['jquery'] },
        'amplify': {deps: [], exports: 'amplify'},
        'amplify.request': { deps: ['jquery', 'amplify'] },
        'amplify.store': { deps: ['amplify'] },
        'jquery.activity-ex': { deps: ['jquery'] },
        'jquery.mockjson': { deps: ['jquery'] },
        'json2': { exports: 'JSON' }, // not really a module
        //'ko': { deps: ['jquery'], exports: 'ko' }, ko 2.1 understands define; no shim needed
        // koExternalTemplateEngine is amd aware, now
        // moment understands define; no shim needed.
        'knockout.validation': { deps: ['ko'] },
        'sammy': { deps: ['jquery'], exports: 'Sammy' },
        'sammy.title': { deps: ['jquery', 'sammy'] },
        'toastr': { deps: ['jquery'], exports: 'toastr' },
        'underscore': { deps: [], exports: '_' }
    },

    // Could simplify for libraries that are conventionally named
    // which is all of them except jquery which identifies the version.
    // List paths to js files not in the baseUrl.
    paths: {
        'activity-indicator': '../lib/activity-indicator',
        'amplify': '../lib/amplify.core',
        'amplify.request': '../lib/amplify.request',
        'amplify.store': '../lib/amplify.store',
        'jquery': '../lib/jquery-1.7.2',//'.min',
        'jquery.mockjson': '../lib/jquery.mockjson',
        'json2': '../lib/json2',
        'infuser': '../lib/infuser-amd',
        'knockout.changetracker': '../lib/knockout.changetracker-amd',
        'knockout.validation' : '../lib/knockout.validation.v0.9-amd',
        'ko': '../lib/knockout-2.1.0',
        'koExternalTemplateEngine': '../lib/koExternalTemplateEngine-amd',
        'moment': '../lib/moment',
        'sammy': '../lib/sammy',
        'sammy.title': '../lib/sammy.title',
        'toastr': '../lib/toastr',
        'trafficcop': '../lib/TrafficCop-amd',
        'underscore': '../lib/underscore'
    }       
});

// Force immediate load of 3rd party libs and their plugins
// ToDo: Pair back the ones that don't have plugins?
// Probably not necessary but not sure how to get the plugins
// loaded without naming them specifically in the modules that use
// them and don't want those modules to know that they use plugins
requirejs([
        // 3rd party libraries
        'json2', 
        'jquery',
        'underscore',
        'moment',
        'sammy',
        'amplify',
        'ko',
        'toastr',
        'knockout.changetracker',

        'bootstrapper', 
    
        // 3rd party plugins - they don't return modules
        'activity-indicator',   // jquery plugin
        'sammy.title',          // sammy plugin
        'amplify.request',      // amplify plugin
        'amplify.store',        // amplify plugin
        'jquery.mockjson',      // jquery plugin
        'jquery.activity-ex',   // jquery plugin
        'ko.utils',             // Knockout custom utilities
        'ko.bindingHandlers',   // Knockout custom binding handlers
        'ko.bindingHandlers.activity', // Knockout custom binding handlers
        'ko.bindingHandlers.command', // Knockout custom binding handlers
        'ko.asyncCommand',      // Knockout custom asyncCommand
        'knockout.validation', // Knockout validation
        'koExternalTemplateEngine',
        'debug.helpers'         // our app's ko debugging plugin

], function (json2, $, _, moment, sammy, amplify, ko, toastr) //, knockoutChangeTracker) //, bootstrapper)
    //activityIndicator, sammyTitle, amplifyRequest, amplifyStore,
    //jqueryMockJson, jqueryActivityEx, koUtils, koBindingHandlers,
    //koBindingHandlersActivity, koBindingHandlersCommand, koAsyncCommand,
    //koExternalTemplateEngine, knockoutChangeTracker, debugHelpers)
    
    //WARD: no need for plugin params as they are always undefined
    //PAPA: When I added the plugin parametes, I stopped getting load 
    //      errors on some of the plugins (like koChangeTracker's ko.DirtyFlag)

{
        //debugger; //TODO: uncomment to confirm that these dependencies are loaded.

        // PAPA: Will this force all bootstrapper dedpendencies to load first? I hope so!
        require('bootstrapper').run();

        //bootstrapper.run();
    })
