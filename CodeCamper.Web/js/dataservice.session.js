// Depends on 
//	Amplify.js
//	my.mock
// ----------------------------------------------
var my = my || {};

my.dataservice = my.dataservice || {}

my.dataservice.session = (function (amplify, mock) {
    var
        init = function() {
            amplify.request.define('mysessions', 'ajax', {
                url: '/api/sessions/?$filter=id%20eq%203', // /api/lookups/timeslots/?$filter=id%20eq%203
                dataType: 'json',
                type: 'GET'
                //cache:
            })
            amplify.request.define('sessions', 'ajax', {
                url: '/api/sessions',
                dataType: 'json',
                type: 'GET'
                //cache:
            })
            amplify.request.define('session', 'ajax', {
                url: '/api/sessions/{id}',
                dataType: 'json',
                type: 'GET'
                //cache:
            })
            if (mock.useMocks) {
                mock.dataservice.session.apply()
            }
        },
        getMySessions = function(userId, callbacks) {
            return amplify.request({
                resourceId: "mysessions",
                data: { userId: userId }, 
                success: callbacks.success,
                error: callbacks.error
            })
        },
        getSessions = function (sessionType, callbacks) {
            return amplify.request({
                resourceId: "sessions",
                data: { sessionType: sessionType }, //TODO: dont need it ?
                success: callbacks.success,
                error: callbacks.error
            })
        },
        getSession = function (id, callbacks) {
            return amplify.request({
                resourceId: "session",
                data: { id: id },
                success: callbacks.success,
                error: callbacks.error
            })
        }
    return {
        init: init,
        getSessions: getSessions,
        getSession: getSession
    }
})(amplify, my.mock);
