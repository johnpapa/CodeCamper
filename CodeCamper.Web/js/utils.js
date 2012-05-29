// Description
//  Defines namespace and common utilities
//
// Depends on
//  moment
// ----------------------------------------------
var app = window["app"] = {};

app.utils = (function (moment) {
    var
        endOfDay = function (day) {
            return moment(new Date(day))
                    .add('days', 1)
                    .add('seconds', -1)
                    .toDate();
        },

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
        endOfDay: endOfDay,
        hasProperties: hasProperties,
        regExEscape: regExEscape
    };
})(moment);

