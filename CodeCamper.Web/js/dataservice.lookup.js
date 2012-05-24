// Depends on 
//	Amplify.js
// ----------------------------------------------
var app = app || {};

app.dataservice = app.dataservice || {}

app.dataservice.lookup = (function (amplify) {
    var
        init = function () {
            amplify.request.define('lookups', 'ajax', {
                url: '/api/lookups',
                dataType: 'json',
                type: 'GET'
                //cache:
            }),
            amplify.request.define('rooms', 'ajax', {
                url: '/api/lookups/rooms',
                dataType: 'json',
                type: 'GET'
                //cache:
            }),
            amplify.request.define('timeslots', 'ajax', {
                url: '/api/lookups/timeslots',
                dataType: 'json',
                type: 'GET'
                //cache:
            }),
            amplify.request.define('tracks', 'ajax', {
                url: '/api/lookups/tracks',
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
        },
        getRooms= function (callbacks) {
            return amplify.request({
                resourceId: "rooms",
                success: callbacks.success,
                error: callbacks.error
            })
        },
        getTimeslots = function (callbacks) {
            return amplify.request({
                resourceId: "timeslots",
                success: callbacks.success,
                error: callbacks.error
            })
        },
        getTracks = function (callbacks) {
            return amplify.request({
                resourceId: "tracks",
                success: callbacks.success,
                error: callbacks.error
            })
        }
    return {
        init: init,
        getLookups: getLookups,
        getRooms: getRooms,
        getTimeslots: getTimeslots,
        getTracks: getTracks
    }
})(amplify);

app.dataservice.lookup.init()