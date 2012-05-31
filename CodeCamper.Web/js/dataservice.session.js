// Depends on 
//	Amplify.js
// ----------------------------------------------
define(['amplify'],
    function (amplify) {
    var
        init = function() {
            amplify.request.define('sessions', 'ajax', {
                url: '/api/sessions',
                dataType: 'json',
                type: 'GET'
                //cache:
            });
            amplify.request.define('session-briefs', 'ajax', {
                url: '/api/sessions/briefs',
                dataType: 'json',
                type: 'GET'
                //cache:
            });
            amplify.request.define('session', 'ajax', {
                url: '/api/sessions/{id}',
                dataType: 'json',
                type: 'GET'
                //cache:
            });
        },
        getSessions = function (callbacks) {
            return amplify.request({
                resourceId: "sessions",
                success: callbacks.success,
                error: callbacks.error
            });
        },
        getSessionBriefs = function (callbacks) {
            return amplify.request({
                resourceId: "session-briefs",
                success: callbacks.success,
                error: callbacks.error
            });
        },
        getSession = function (id, callbacks) {
            return amplify.request({
                resourceId: "session",
                data: { id: id },
                success: callbacks.success,
                error: callbacks.error
            });
        };

    init();

    return {
        getSessions: getSessions,
        getSessionBriefs: getSessionBriefs,
        getSession: getSession
    };
});
