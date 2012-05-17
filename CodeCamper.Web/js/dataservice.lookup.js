// Depends on 
//	Amplify.js
//	my.mock
// ----------------------------------------------
var my = my || {};

my.dataservice = my.dataservice || {}

my.dataservice.lookup = (function (amplify, mock) {
    var
        init = function () {
            amplify.request.define('lookups', 'ajax', {
                url: '/api/lookups',
                dataType: 'json',
                type: 'GET'
                //cache:
            })
        },
        getLookups = function (callbacks) {
            return amplify.request({
                resourceId: "lookups",
                success: callbacks.success,
                error: callbacks.error
            })
        }
    return {
        init: init,
        getLookups: getLookups
    }
})(amplify, my.mock);
