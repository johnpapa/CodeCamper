// Depends on
//  app.mocks (only if mocks are intended to be used)
//  toastr
//
// Conventions
// ----------------------------------------------
app.config = (function (toastr) {    
    var
        // properties
        useMocks = false, // Set this to toggle mocks
        logger = toastr, // use toastr for the logger
        throttle = 400,
        toastrTimeout = 2000,
        
        // methods
        dataserviceInit = function () {
            // because of shortcircuiting, i am fine here 
            // by checking first for the existance of app.mock
            if(!!app.mock && useMocks) { 
                app.mock.dataservice.lookup.defineApi();
                app.mock.dataservice.person.defineApi();
                app.mock.dataservice.session.defineApi();
                app.mock.dataservice.attendance.defineApi();
            }
        };

    toastr.options.timeOut = toastrTimeout;
    
    return {
        logger: logger,
        dataserviceInit: dataserviceInit,
        throttle: throttle
    };
})(toastr)
