// Depends on 
//	Amplify.js
// ----------------------------------------------
app.dataservice = app.dataservice || {}

app.dataservice.session = (function (amplify) {
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
            amplify.request.define('session-briefs', 'ajax', {
                url: '/api/sessions/briefs',
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
        },
        getMySessions = function(userId, callbacks) {
            return amplify.request({
                resourceId: "mysessions",
                data: { userId: userId }, 
                success: callbacks.success,
                error: callbacks.error
            })
        },
        getSessions = function (callbacks) { //sessionType, callbacks) {
            return amplify.request({
                resourceId: "sessions",
                //data: { sessionType: sessionType }, //TODO: dont need it ?
                success: callbacks.success,
                error: callbacks.error
            })
        },
        getSessionBriefs = function (callbacks) {
            return amplify.request({
                resourceId: "session-briefs",
                //data: { sessionType: sessionType }, //TODO: dont need it ?
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
        getSessionBriefs: getSessionBriefs,
        getSession: getSession
    }
})(amplify);

app.dataservice.session.init();
