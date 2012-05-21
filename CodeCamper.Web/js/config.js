// Depends on
//  my.mocks (only if mocks are intended to be used)
//
// Conventions
// ----------------------------------------------
var my = my || {};

my.config = (function () {
    var
        // properties
        useMocks = false, // Set this to toggle mocks

        // methods
        dataserviceInit = function () {
            // because of shortcircuiting, i am fine here 
            // by checking first for the existance of my.mock
            if(!!my.mock && useMocks) { 
                my.mock.dataservice.lookup.apply()
                my.mock.dataservice.person.apply()
                my.mock.dataservice.session.apply()
            }
        }

    return {
        dataserviceInit : dataserviceInit
    }
})()
