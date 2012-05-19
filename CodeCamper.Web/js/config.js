// Depends on
//  my.mocks (only if mocks are intended to be used)
//
// Conventions
// ----------------------------------------------
var my = my || {};

my.config = (function () {
    var
        // properties
        useMocks = true, // Set this to toggle mocks

        // methods
        dataserviceInit = function(){
            if(!!my.mock && useMocks) { // because of shortcircuiting, i am fine here by checking first for the existance of my.mock
            //if (useMocks) {
                my.mock.dataservice.session.apply()
                //mock.dataservice.lookup.apply() //TODO: make this
            }
        }

    return {
        useMocks: useMocks, // TODO: consider removing from API
        dataserviceInit : dataserviceInit
    }
})()
