define(['ko', 'datacontext', 'config'],
    function (ko, datacontext, config) {
        var
            logger = config.logger,
            session = ko.observable(),

            activate = function (routeData) {
                logger.info('activated session view model');
                var sessionId = routeData.id;
                //var result = datacontext.sessions.getLocalById(sessionId);
                var result = datacontext.sessions.getFullSessionById(
                    sessionId, { success: function (s) { session(s); } });
                session(result);
            },

            saveFavorite = function () {
                var s = session();
                if (s.isBusy()) {
                    return; // Already in the middle of a save on this session
                }
                s.isBusy(true);
                var cudMethod = s.isFavorite()
                    ? datacontext.attendanceCud.deleteAttendance
                    : datacontext.attendanceCud.addAttendance;
                if (s.isFavorite()) {
                    cudMethod(s,
                        { success: function () { s.isBusy(false); }, error: function () { s.isBusy(false); } });
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
