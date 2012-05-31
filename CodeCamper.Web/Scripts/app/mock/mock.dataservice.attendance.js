// Depends on
//	Amplify.js
// ----------------------------------------------
define(['amplify'],
    function (amplify) {
        var defineApi = function (model) {
            amplify.request.define('attendance', function (settings) {
                settings.success(model.generateAttendance().attendance);
            });
        };
        return {
            defineApi: defineApi
        };
    });
