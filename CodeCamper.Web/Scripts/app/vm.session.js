define(['ko', 'datacontext', 'config', 'messenger', 'sort'],
    function (ko, datacontext, config, messenger, sort) {

        var
            logger = config.logger,
            currentSessionId = ko.observable(),
            session = ko.observable(),
            rooms = ko.observableArray(),
            tracks = ko.observableArray(),
            timeslots = ko.observableArray(),
            
            tmplName = function() {
                return canEditSession() ? 'session.edit' : 'session.view';
            },
            
            canEditSession = ko.computed(function () {
                return session() && config.currentUser().id() === session().speakerId();
            }),
            
            canEditEval = ko.computed(function () {
                return session() && config.currentUser().id() !== session().speakerId();
            }),
            
            cancel = ko.asyncCommand({
                execute: function (complete) {
                    //getSession(complete, true);
                    getAttendance(complete, true);
                },
                canExecute: function (isExecuting) {
                    return true;
                }
            }),

            save = ko.asyncCommand({
                execute: function (complete) {
                    var s = session();
                    if (s.isBusy()) {
                        complete();
                        return; // Already in the middle of a save on this session
                    }
                    s.isBusy(true);
                    $.when(
//                        datacontext.sessionCud.updateSession(
//                            session,
                        datacontext.attendanceCud.updateAttendance(
                            s, {
                                success: function () { s.isBusy(false); },
                                error: function () { s.isBusy(false); }
                            }
                        )
                    ).always(complete);
                },
                canExecute: function (isExecuting) {
                    return true;
                }
            }),
            
            canLeave = function () {
                return true;
            },

            activate = function (routeData) {
                messenger.publish.viewModelActivated({ canleaveCallback: canLeave });
                //logger.info('activated session view model');

                currentSessionId(routeData.id);
                getSession();
                getRooms();
                getTimeslots();
                getTracks();
                session().isBusy(false);
            },
            
            getSession = function (completeCallback, forceRefresh) {
                var
                    callback = completeCallback || function () { },
                    result = datacontext.sessions.getFullSessionById(
                            currentSessionId(), {
                                success: function (s) {
                                    session(s);
                                    callback();
                                },
                                error: function () {
                                    callback();
                                }
                            },
                        forceRefresh
                        );
                session(result);
            },

            getAttendance = function (completeCallback, forceRefresh) {
                //TODO : need to refactor this to handle attendance or session
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
                cudMethod(s,
                    { success: function () { s.isBusy(false); }, error: function () { s.isBusy(false); } });
            },
            
            init = function () {
                
            };

        // Initialization
        init();

        return {
            activate: activate,
            cancel: cancel,
            canEditSession: canEditSession,
            canEditEval: canEditEval,
            canLeave: canLeave,
            rooms: rooms,
            session: session,
            save: save,
            saveFavorite: saveFavorite,
            timeslots: timeslots,
            tmplName: tmplName,
            tracks: tracks
        };
    });
