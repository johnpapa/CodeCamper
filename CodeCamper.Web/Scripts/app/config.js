define(['toastr', 'mock/mock', 'infuser', 'ko'],
    function (toastr, mock, infuser, ko) {

        var// properties
            useMocks = false, // Set this to toggle mocks
            logger = toastr, // use toastr for the logger
            throttle = 400,
            demoUserIds = [1, 3, 5],
            currentUser = ko.observable(),
            title = 'CodeCamper > ',
            toastrTimeout = 2000,
            messages = {
                viewModelActivated: 'viewmodel-activation'
            },
            // methods
            dataserviceInit = function () { },

            init = function () {
                if (useMocks) {
                    dataserviceInit = mock.dataserviceInit;
                }

                infuser.defaults.templatePrefix = "_";
                infuser.defaults.templateSuffix = ".tmpl.html";
                infuser.defaults.templateUrl = "/Tmpl";

                toastr.options.timeOut = toastrTimeout;
            };

        init();

        return {
            currentUser: currentUser,
            dataserviceInit: dataserviceInit,
            demoUserIds: demoUserIds,
            logger: logger,
            messages: messages,
            throttle: throttle,
            title: title,
            window: window
        };
    });
