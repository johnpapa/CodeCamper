// Depends on 
//	Amplify.js
//	my.mock
// ----------------------------------------------
my.sessionHttpService = (function (amplify, mock) {
    var
        init = function() {
            amplify.request.define('getSessions', 'ajax', {
                url: '/mail',
                dataType: 'json',
                type: 'GET'
                //cache: 
            })
            if(mock.useMocks) {
                my.sessionHttpServiceMock().apply()
            }
        },
        getSessions = function(sessionType, callbacks) {
            return amplify.request({
                resourceId: "getSessions",
                data: { sessionType: sessionType }, //TODO: dont need it ?
                success: callbacks.success,
                error: callbacks.error
            })
        },
        getSession = function(sessionId, callbacks) {
            return amplify.request({
                resourceId: "getSession",
                data: { sessionId: sessionId },
                success: callbacks.success,
                error: callbacks.error
            })
        }
    return {
        init: init,
        getSessions: getSessions,
        getSession: getSession
    }
})(amplify, mock);
