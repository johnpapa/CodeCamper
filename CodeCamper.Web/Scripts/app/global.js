/*
 * Put objects in the global namespace as needed.
 * Returns the global object (the 'window' object when run in the browser)
 */
define('global', ['ko'], function(ko) {

    var global = this; // 'this' is the global namespace
    
    // ensure KO is in the global namespace 
    if (!global.ko) {
        global.ko = ko;
    };

    return {
        global: global
    };

});
