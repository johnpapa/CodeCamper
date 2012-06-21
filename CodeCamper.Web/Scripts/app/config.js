define(['toastr', 'mock/mock', 'infuser', 'ko'],
    function (toastr, mock, infuser, ko) {

        var// properties
            useMocks = false, // Set this to toggle mocks
            logger = toastr, // use toastr for the logger
            throttle = 400,
            
            //currentUserId = 1, // Default user - has favorites
            currentUserId = 3, // John Papa - no favorites      
            currentUser = ko.observable(),
            demoUserIds = [1, 3, 5],
            
            title = 'CodeCamper > ',
            toastrTimeout = 2000,
            messages = {
                viewModelActivated: 'viewmodel-activation'
            },
            // methods
            dataserviceInit = function () { },

            validationInit = function () {
                ko.validation.configure({
                    registerExtenders: true,
                    messagesOnModified: true,
                    insertMessages: true,
                    parseInputAttributes: true,
                    messageTemplate: null,
                    decorateElement: true // applies the .validationElement CSS class
                });
            },

            configureExternalTemplates = function () {
                infuser.defaults.templatePrefix = "_";
                infuser.defaults.templateSuffix = ".tmpl.html";
                infuser.defaults.templateUrl = "/Tmpl";
            },

            init = function () {
                if (useMocks) {
                    dataserviceInit = mock.dataserviceInit;
                }

                toastr.options.timeOut = toastrTimeout;
                configureExternalTemplates();
                validationInit();
            };

        init();

        return {
            currentUserId: currentUserId,
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
