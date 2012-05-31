// Filename: main.js

requirejs.config({
    // by default load
    baseUrl: 'js',
    // shim in the libs that don't know define.amd
    shim: {
        // jquery 1.7.x understands define; no shim needed.
        'activity-indicator': ['jquery'],
        'amplify': {deps: [], exports: 'amplify'},
        'amplify.request': ['amplify'],
        'amplify.store': ['amplify'],
        'jquery.mockjson': ['jquery'],
        'json2': { exports: 'JSON' }, // not really a module
        //'ko': { deps: ['jquery'], exports: 'ko' },
        // moment understands define; no shim needed.
        'sammy': { deps: ['jquery'], exports: 'Sammy' },
        'sammy.title': ['jquery', 'sammy'],
        'toastr': { deps: ['jquery'], exports: 'toastr' },
        'underscore': { deps: [], exports: '_' }
    },
    // Could simplify for libraries that are conventionally named
    // which is all of them except jquery which identifies the version
    paths: {
        'activity-indicator': '../Scripts/activity-indicator',
        'amplify': '../Scripts/amplify.core',    
        'amplify.request': '../Scripts/amplify.request', 
        'amplify.store': '../Scripts/amplify.store',
        'jquery': '../Scripts/jquery-1.7.2',//'.min',
        'jquery.mockjson': '../Scripts/jquery.mockjson',
        'json2': '../Scripts/json2',
        //'ko': '../Scripts/knockout',
        'ko': '../Scripts/knockout-2.1.0',
        'moment': '../Scripts/moment',
        'sammy': '../Scripts/sammy',
        'sammy.title': '../Scripts/sammy.title',        
        'toastr': '../Scripts/toastr',         
        'underscore': '../Scripts/underscore'
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
    
        'bootstrapper', 
    
        // 3rd party plugins - they don't return modules
        'activity-indicator', // jquery plugin
        'sammy.title',        // sammy plugin
        'amplify.request',    // amplify plugin
        'amplify.store',      // amplify plugin
        'jquery.mockjson'    // jquery plugin
        // 'debug.helpers'       // our app's ko debugging plugin
    ], function (json2, $, _, moment, sammy, amplify, ko, toastr, bootstrapper)
                 // no need for plugin params as they are always undefined
{
        //debugger; // uncomment to confirm that these dependencies are loaded.
        bootstrapper.run();
})