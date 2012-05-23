// Depends on 
//
// ----------------------------------------------
var my = my || {};

my.utils = (function () {
    var
        hasProperties = function (obj) {
            for (var prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    return true
                }
            }
            return false;
        };

    return {
        hasProperties: hasProperties
    }
})();

