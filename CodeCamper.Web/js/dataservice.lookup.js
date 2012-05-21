// Depends on 
//	Amplify.js
// ----------------------------------------------
var my = my || {};

my.dataservice = my.dataservice || {}

my.dataservice.lookup = (function (amplify) {
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
})(amplify);

my.dataservice.lookup.init()