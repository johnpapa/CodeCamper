define('config',
    ['toastr', 'mock/mock', 'infuser', 'ko'],
    function (toastr, mock, infuser, ko) {

        var
            // properties
            //-----------------
            
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
            stateKeys = {
                lastView: 'state.active-hash'
            },
            storeExpirationMs = (1000 * 60 * 60 * 24), // 1 day
            throttle = 400,
            title = 'CodeCamper > ',
            toastrTimeout = 2000,

            _useMocks = false, // Set this to toggle mocks
            useMocks = function (val) {
                if(val) {
                    _useMocks = val;
                    init();
                }
                return _useMocks;
            },
            
            viewIds = {
                favorites: '#favorites-view',
                session: '#session-view',
                sessions: '#sessions-view',
                shellTop: '#shellTop-view',
                speaker: '#speaker-view',
                speakers: '#speakers-view'
            },

            // methods
            //-----------------

            dataserviceInit = function () { },

            validationInit = function () {
                ko.validation.configure({
                    registerExtenders: true,    //default is true
                    messagesOnModified: true,   //default is true
                    insertMessages: true,       //default is true
                    parseInputAttributes: true, //default is false
                    writeInputAttributes: true, //default is false
                    messageTemplate: null,      //default is null
                    decorateElement: true       //default is false. Applies the .validationElement CSS class
                });
            },

            configureExternalTemplates = function () {
                infuser.defaults.templatePrefix = "_";
                infuser.defaults.templateSuffix = ".tmpl.html";
                infuser.defaults.templateUrl = "/Tmpl";
            },

            init = function () {
                if (_useMocks) {
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
            stateKeys: stateKeys,
            storeExpirationMs: storeExpirationMs,
            throttle: throttle,
            title: title,
            useMocks: useMocks,
            viewIds: viewIds,
            window: window
        };
    });
