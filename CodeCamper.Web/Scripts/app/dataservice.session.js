define('dataservice.session',
    ['amplify'],
    function (amplify) {
        var
            init = function () {
                amplify.request.define('sessions', 'ajax', {
                    url: '/api/sessions',
                    dataType: 'json',
                    type: 'GET'
                    //cache:
                });

                amplify.request.define('session-briefs', 'ajax', {
                    url: '/api/sessionbriefs',
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

                amplify.request.define('sessionUpdate', 'ajax', {
                    url: '/api/sessions',
                    dataType: 'json',
                    type: 'PUT',
                    contentType: 'application/json; charset=utf-8'
                });
            },

            getSessions = function (callbacks) {
                return amplify.request({
                    resourceId: 'sessions',
                    success: callbacks.success,
                    error: callbacks.error
                });
            },

            getSessionBriefs = function (callbacks) {
                return amplify.request({
                    resourceId: 'session-briefs',
                    success: callbacks.success,
                    error: callbacks.error
                });
            },

            getSession = function (callbacks, id) {
                return amplify.request({
                    resourceId: 'session',
                    data: { id: id },
                    success: callbacks.success,
                    error: callbacks.error
                });
            },

            updateSession = function (callbacks, data) {
                return amplify.request({
                    resourceId: 'sessionUpdate',
                    data: data,
                    success: callbacks.success,
                    error: callbacks.error
                });
            };

        init();

    return {
        getSessions: getSessions,
        getSessionBriefs: getSessionBriefs,
        getSession: getSession,
        updateSession: updateSession
    };
});
