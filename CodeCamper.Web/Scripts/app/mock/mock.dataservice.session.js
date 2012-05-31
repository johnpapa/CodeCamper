define(['amplify'],
    function (amplify) {
        var defineApi = function (model) {
            amplify.request.define('sessions', function (settings) {
                settings.success(model.generateSessions().sessions);
            });

            amplify.request.define('session-briefs', function (settings) {
                settings.success(model.generateSessions().sessions);
            });

            amplify.request.define('session', function (settings) {
                settings.success(model.generateSessions().sessions[0]);
            });
        };
        return {
            defineApi: defineApi
        };
    });
