define(['ko', 'datacontext', 'config', 'messenger', 'sort', 'router'],
    function (ko, datacontext, config, messenger, sort, router) {

        var
            logger = config.logger,
            currentSessionId = ko.observable(),
            isDirtyRefresh = ko.observable(),
            rooms = ko.observableArray(),
            session = ko.observable(),
            tracks = ko.observableArray(),
            timeslots = ko.observableArray(),
            
            tmplName = function() {
                return canEditSession() ? 'session.edit' : 'session.view';
            },
            
            isDirty = ko.computed(function () {
                isDirtyRefresh(); // to notify the computed
                if (session() && session().attendance && session().attendance()) {
                    return session().attendance().dirtyFlag().isDirty();
                }
                return false;
            }),

            canEditSession = ko.computed(function () {
                return session() && config.currentUser().id() === session().speakerId();
            }),
            
            canEditEval = ko.computed(function () {
                return session() && config.currentUser().id() !== session().speakerId();
            }),
            
            goBack = ko.asyncCommand({
                execute: function (complete) {
                    router.navigateBack();
                    complete();
                },
                canExecute: function (isExecuting) {
                    return !isDirty();
                }
            }),

            cancel = ko.asyncCommand({
                execute: function (complete) {
                    var callback = function () {
                        complete();
                        logger.success('Refreshed attendance');
                    };
                    getAttendance(callback, true);
                },
                canExecute: function (isExecuting) {
                    return isDirty()
                }
            }),

            save = ko.asyncCommand({
                execute: function (complete) {
                    $.when(
//                        datacontext.sessionCud.updateSession(
//                            session,
                        datacontext.attendance.updateModel(
                            session(), {
                                success: function () { },
                                error: function () { }
                            }
                        )
                    ).always(function () {
                        complete()
                    });
                },
                canExecute: function (isExecuting) {
                    return isDirty();
                }
            }),
            
            canLeave = function () {
                return !isDirty();
            },

            activate = function (routeData) {
                messenger.publish.viewModelActivated({ canleaveCallback: canLeave });

                currentSessionId(routeData.id);
                getSession();
                getRooms();
                getTimeslots();
                getTracks();
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
                // Refresh the attendance in teh datacontext
                var
                    callback = completeCallback || function () { },
                    result = datacontext.attendance.getSessionFavorite(
                            session().attendance().sessionId(),
                            {
                                success: function (a) {
                                    callback();
                                },
                                error: function () {
                                    callback();
                                }
                            },
                        forceRefresh
                        );
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

            saveFavorite = ko.asyncCommand({
                execute: function (complete) {
                    var cudMethod = session().isFavorite()
                        ? datacontext.attendance.deleteModel
                        : datacontext.attendance.addModel;
                    cudMethod(session(),
                        { success: saveFavoriteDone(complete), error: saveFavoriteDone(complete) });
                    complete();
                },
                canExecute: function (isExecuting) {
                    return session() && session().isUnlocked;
                }
            }),

            saveFavoriteDone = function (complete) {
                isDirtyRefresh.notifySubscribers(); // Trigger re-evaluation of isDirty
                complete();
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
            goBack: goBack,
            rooms: rooms,
            session: session,
            save: save,
            saveFavorite: saveFavorite,
            timeslots: timeslots,
            tmplName: tmplName,
            isDirty: isDirty,
            tracks: tracks
        };
    });