define(['ko', 'datacontext', 'config', 'messenger'],
    function (ko, datacontext, config, messenger) {
        var
            self = this,
            logger = config.logger,
            session = ko.observable(),

            canLeave = function () {
                return true;
            },

            activate = function (routeData) {
                messenger.publish.viewModelActivated({ viewmodel: self, canleaveCallback: canLeave });
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
            activate: activate,
            canLeave: canLeave,
            session: session,
            saveFavorite: saveFavorite
        };
    });
