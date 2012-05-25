// Depends on
//  app.mocks (only if mocks are intended to be used)
//
// Conventions
// ----------------------------------------------
app.config = (function () {
    var
        // properties
        useMocks = true, // Set this to toggle mocks
        throttle = 400,
        // methods
        dataserviceInit = function () {
            // because of shortcircuiting, i am fine here 
            // by checking first for the existance of app.mock
            if(!!app.mock && useMocks) { 
                app.mock.dataservice.lookup.defineApi()
                app.mock.dataservice.person.defineApi()
                app.mock.dataservice.session.defineApi()
                app.mock.dataservice.attendance.defineApi()
            }
        }

    return {
        dataserviceInit: dataserviceInit,
        throttle: throttle
    }
})()
