// Depends on 
//	Amplify.js
// ----------------------------------------------
app.dataservice = app.dataservice || {};

app.dataservice.attendance = (function (amplify) {
    var
        init = function() {
            amplify.request.define('attendance', 'ajax', {
                url: '/api/persons/{personId}/attendance',
                dataType: 'json',
                type: 'GET'
                //cache:
            });
        },
        getAttendance = function (callbacks, personId) {
            return amplify.request({
                resourceId: "attendance",
                data: { personId: personId },
                success: callbacks.success,
                error: callbacks.error
            });
        };

    init();
    
    return {
        getAttendance: getAttendance
    };
})(amplify);