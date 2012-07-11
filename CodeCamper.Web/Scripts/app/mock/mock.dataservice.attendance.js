define('mock/mock.dataservice.attendance',
    ['amplify'],
    function (amplify) {
        var
            defineApi = function (model) {

            amplify.request.define('favorites', function (settings) {
                settings.success(model.generateAttendance().attendance);
            });
            
            amplify.request.define('favorite', function (settings) {
                settings.success(model.generateAttendance().attendance[0]);
            });

        };

        return {
            defineApi: defineApi
        };
    });
