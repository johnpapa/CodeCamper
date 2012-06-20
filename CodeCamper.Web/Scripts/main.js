requirejs.config({

    // script default location
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
        //'knockout.validation': { deps: ['ko'] }, // ko.val is now AMD aware (JP edited it)
        'sammy': { deps: ['jquery'], exports: 'Sammy' },
        'sammy.title': { deps: ['jquery', 'sammy'] },
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
        'jquery': '../lib/jquery-1.7.2',//'.min',
        'jquery.mockjson': '../lib/jquery.mockjson',
        'json2': '../lib/json2',
        'infuser': '../lib/infuser-amd',
        'knockout.changetracker': '../lib/knockout.changetracker-amd',
        'ko.validation' : '../lib/knockout.validation-amd',
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
//       Probably not necessary but not sure how to get the plugins
//       loaded without naming them specifically in the modules that use
//       them and we don't want those modules to know that they use plugins
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
    
        // 3rd party plugins - they don't return module objects
        'activity-indicator', // jquery plugin
        'sammy.title', // sammy plugin
        'amplify.request', // amplify plugin
        'amplify.store', // amplify plugin
        'jquery.mockjson', // jquery plugin
        'jquery.activity-ex', // jquery plugin
        'ko.utils', // Knockout custom utilities
        'ko.bindingHandlers', // Knockout custom binding handlers
        'ko.bindingHandlers.activity', // Knockout custom binding handlers
        'ko.bindingHandlers.command', // Knockout custom binding handlers
        'ko.asyncCommand', // Knockout custom asyncCommand
        'knockout.changetracker',
        'koExternalTemplateEngine',
        'ko.validation', // Knockout validation
        'debug.helpers'         // our app's ko debugging plugin
],
    function (json2, $, _, moment, sammy, amplify, ko, toastr)
    /* 
     * WARD: 
     * We only use the 'bootstrapper' parameter within this function.
     * the other listed parameters are present only for exploratory purposes
     * (see the 'debugger;' line below).
     * Did not bother to provide params for the plugin modules as these never
     * return a result and therefore their corresponding params would always be undefined
     */
{
    //debugger; //TODO: uncomment to confirm that dependencies are loaded.
    require(['bootstrapper'], function (bs) { bs.run(); });
    //bootstrapper.run();
});
