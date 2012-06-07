define(['amplify'],
    function (amplify) {
        var defineApi = function (model) {
            amplify.request.define('favorites', function (settings) {
                settings.success(model.generateAttendance().attendance);
            });
        };
        return {
            defineApi: defineApi
        };
    });
