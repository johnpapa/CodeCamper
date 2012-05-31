define(['toastr', 'mock/mock'],
    function (toastr, mock) {

        var// properties
            useMocks = false, // Set this to toggle mocks
            logger = toastr, // use toastr for the logger
            throttle = 400,
            title = 'CodeCamper > ',
            toastrTimeout = 2000,
            // methods
            dataserviceInit = function () { };

        if (useMocks) {
            dataserviceInit = mock.dataserviceInit;
        }

        toastr.options.timeOut = toastrTimeout;

        return {
            window: window,
            logger: logger,
            dataserviceInit: dataserviceInit,
            throttle: throttle,
            title: title
        };
    });
