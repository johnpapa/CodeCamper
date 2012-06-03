define(['ko', 'datacontext', 'config'],
    function (ko, datacontext, config) {
        var
            logger = config.logger,
            session = ko.observable(),

            activate = function (routeData) {
                logger.info('activated session view model');
                var sessionId = routeData.id;
                var result = datacontext.sessions.getById(sessionId);
                session(result);
            },

            saveFavorite = function () {
                var s = session();
                if (s.isFavorite()) {
                    datacontext.attendanceCud.deleteAttendance(s);
                } else {
                    datacontext.attendanceCud.addAttendance(s);
                }
            },

            init = function () {
                
            };

        // Initialization
        init();

        return {
            session: session,
            activate: activate,
            saveFavorite: saveFavorite
        };
    });
