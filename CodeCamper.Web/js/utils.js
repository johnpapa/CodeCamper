// Description
//  Defines namespace and common utilities
// Depends on
//  None
// ----------------------------------------------
var app = window["app"] = {};

app.utils = (function () {
    var
        hasProperties = function (obj) {
            for (var prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    return true;
                }
            }
            return false;
        },

        regExEscape = function(text) {
            return text.replace( /[-[\]{}()*+?.,\\^$|#\s]/g , "\\$&");
        };
    
    return {
        hasProperties: hasProperties,
        regExEscape: regExEscape
    };
})();

