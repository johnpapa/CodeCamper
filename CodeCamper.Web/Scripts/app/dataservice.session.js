define('dataservice.session',
    ['amplify'],
    function (amplify) {
        var
            init = function () {

                amplify.request.define('sessions', 'ajax', {
                    url: '/api/sessions',
                    dataType: 'json',
                    type: 'GET'
                });

                amplify.request.define('session-briefs', 'ajax', {
                    url: '/api/sessionbriefs',
                    dataType: 'json',
                    type: 'GET'
                    //cache: true
                });

                amplify.request.define('session', 'ajax', {
                    url: '/api/sessions/{id}',
                    dataType: 'json',
                    type: 'GET'
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

//define('dataservice.session',
//    ['jquery'],
//    function ($) {
//        var
//            root = '/api/',
            
//            getSessionBriefsRaw = function (callbacks) {
//                // Using $.ajax and callbacks
//                var url = root + 'sessionbriefs';
//                $.ajax({
//                    url: url,
//                    dataType: 'json',
//                    success: function(result) {
//                        callbacks.success(result);
//                    },
//                    error: function(result) {
//                        debugger;
//                        callbacks.error(result);
//                    }
//                });
//            },
            
//            getSessionBriefsRawJson = function(callbacks) {
//                // Using $.getJSON and deferreds
//                var url = root + 'sessionbriefs';
//                $.getJSON(url)
//                    .done(function(result, status) {
//                        callbacks.success(result);
//                    })
//                    .fail(function(result, status) {
//                        debugger;
//                        callbacks.error(result);
//                    });
//            },
//            getSessions = function(callbacks) {
//                // Using $.getJSON and deferreds
//                var url = root + 'sessions';
//                $.getJSON(url)
//                    .done(function(result, status) {
//                        callbacks.success(result);
//                    })
//                    .fail(function(result, status) {
//                        callbacks.error(result);
//                    });
//            },
//            getSession = function(callbacks, id) {
//                // Using $.getJSON and deferreds
//                var url = root + 'sessions/' + id;
//                $.getJSON(url)
//                    .done(function(result, status) {
//                        callbacks.success(result);
//                    })
//                    .fail(function(result, status) {
//                        callbacks.error(result);
//                    });
//            };

//    return {
//        getSessions: getSessions,
//        getSessionBriefs: getSessionBriefsRaw,
//        getSession: getSession
//    };
//});
