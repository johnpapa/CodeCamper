// Depends on
//  app.mocks (only if mocks are intended to be used)
//
// Conventions
// ----------------------------------------------
var app = app || {};

app.config = (function () {
    var
        // properties
        useMocks = false, // Set this to toggle mocks

        // methods
        dataserviceInit = function () {
            // because of shortcircuiting, i am fine here 
            // by checking first for the existance of app.mock
            if(!!app.mock && useMocks) { 
                app.mock.dataservice.lookup.apply()
                app.mock.dataservice.person.apply()
                app.mock.dataservice.session.apply()
            }
        }

    return {
        dataserviceInit : dataserviceInit
    }
})()
