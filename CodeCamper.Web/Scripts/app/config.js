define(['toastr', 'mock/mock'],
    function (toastr, mock) {

        var// properties
            useMocks = false, // Set this to toggle mocks
            logger = toastr, // use toastr for the logger
            throttle = 400,
            title = 'CodeCamper > ',
            toastrTimeout = 2000,
            messages = {
                viewModelActivated: 'viewmodel-activation'
            },
            // methods
            dataserviceInit = function () { };

        if (useMocks) {
            dataserviceInit = mock.dataserviceInit;
        }

        toastr.options.timeOut = toastrTimeout;

        return {
            dataserviceInit: dataserviceInit,
            logger: logger,
            messages: messages,
            throttle: throttle,
            title: title,
            window: window
        };
    });
