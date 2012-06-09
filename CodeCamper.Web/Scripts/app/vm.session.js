define(['ko', 'datacontext', 'config', 'messenger', 'sort'],
    function (ko, datacontext, config, messenger, sort) {

        var
            logger = config.logger,
            session = ko.observable(),
            rooms = ko.observableArray(),
            tracks = ko.observableArray(),
            timeslots = ko.observableArray(),
            
            //TODO: refactor the template name to be dynamic
            tmplName = function() {
                return canEditSession() ? 'session.edit' : 'session.view';
            },
            
            canEditSession = ko.computed(function () {
                return session() && config.currentUser().id() === session().speakerId();
            }),
            
            canEditEval = ko.computed(function () {
                return session() && config.currentUser().id() !== session().speakerId();
            }),
            
            canLeave = function () {
                return true;
            },

            activate = function (routeData) {
                messenger.publish.viewModelActivated({ canleaveCallback: canLeave });
                //logger.info('activated session view model');

                var
                    sessionId = routeData.id,
                    result = datacontext.sessions.getFullSessionById(
                        sessionId, { success: function (s) { session(s); } }
                    );
                session(result);
                getRooms();
                getTimeslots();
                getTracks();
            },

            getRooms = function () {
                if (!rooms().length) {
                    datacontext.rooms.getData({
                        results: rooms,
                        sortFunction: sort.roomSort
                    });
                }
            },

            getTimeslots = function () {
                if (!timeslots().length) {
                    datacontext.timeslots.getData({
                        results: timeslots,
                        sortFunction: sort.timeslotSort
                    });
                }
            },

            getTracks = function () {
                if (!tracks().length) {
                    datacontext.tracks.getData({
                        results: tracks,
                        sortFunction: sort.trackSort
                    });
                }
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
            canEditSession: canEditSession,
            canEditEval: canEditEval,
            canLeave: canLeave,
            rooms: rooms,
            session: session,
            saveFavorite: saveFavorite,
            timeslots: timeslots,
            tmplName: tmplName,
            tracks: tracks
        };
    });
