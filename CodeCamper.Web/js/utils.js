// Depends on 
//
// ----------------------------------------------
var app = app || {};

app.utils = (function () {
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

