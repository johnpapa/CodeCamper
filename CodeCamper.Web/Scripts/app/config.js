define(['toastr', 'mock/mock', 'infuser', 'ko'],
    function (toastr, mock, infuser, ko) {

        var// properties
            //currentUserId = 1, // Default user - has favorites
            currentUserId = 3, // John Papa - no favorites      
            currentUser = ko.observable(),
            hashes = {
                favorites: '#/favorites',
                favoritesByDate: '#/favorites/date',
                sessions: '#/sessions',
                speakers: '#/speakers'
            },
            logger = toastr, // use toastr for the logger
            messages = {
                viewModelActivated: 'viewmodel-activation'
            },
            throttle = 400,
            title = 'CodeCamper > ',
            toastrTimeout = 2000,
            useMocks = false, // Set this to toggle mocks
            viewIds = {
                favorites: '#favorites-view',
                session: '#session-view',
                sessions: '#sessions-view',
                shellTop: '#shellTop-view',
                speaker: '#speaker-view',
                speakers: '#speakers-view'
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
            hashes: hashes,
            logger: logger,
            messages: messages,
            throttle: throttle,
            title: title,
            viewIds: viewIds,
            window: window
        };
    });
