// Description
//  vm.sessions is the ViewModel for a view displaying all sessions.
//  The user can further filter this subset of Sessions by additional criteria.
//
// ----------------------------------------------
define(['ko', 'router', 'datacontext', 'filter', 'sort', 'events', 'utils'],
    function(ko, router, datacontext, filter, sort, events, utils) {
        var
            pauseRefresh = false,
            sessionsFilter = new filter.SessionsFilter(),
            sessions = ko.observableArray(),
            speakers = ko.observableArray(),
            timeslots = ko.observableArray(),
            tracks = ko.observableArray(),

            getSpeakers = function () {
                if (!speakers().length) {
                    datacontext.sessionSpeakers.getData({
                        results: speakers,
                        sortFunction: sort.speakerSort
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

            activate = function () {
                getSpeakers();
                getTimeslots();
                getTracks();
                refresh();
            },

            refresh = function () {
                if (!pauseRefresh) {
                    datacontext.sessions.getData({
                        results: sessions,
                        filter: sessionsFilter,
                        sortFunction: sort.sessionSort
                    });
                }
            },

            gotoDetails = function (selectedSession) {
                if (selectedSession && selectedSession.id()) {
                    events.navToSession(selectedSession.id());
                }
            },

            saveFavorite = function (selectedSession) {
                debugger; //TODO:
                if (selectedSession.isFavorite()) {
                    datacontext.attendanceCud.deleteAttendance(selectedSession);
                } else {
                    datacontext.attendanceCud.addAttendance(selectedSession);
                }
            },

            clearFilter = function () {
                sessionsFilter.searchText('');
            },

            clearSideFilters = function () {
                pauseRefresh = true;
                sessionsFilter.favoriteOnly(false).speaker(null)
                    .timeslot(null).track(null);
                pauseRefresh = false;
                refresh();
            },

            keyCaptureFilter = function (data, event) {
                if (event.keyCode == utils.keys.escape) {
                    clearFilter();
                }
            },
            
            addFilterSubscriptions = function () {
                sessionsFilter.searchText.subscribe(refresh);
                sessionsFilter.speaker.subscribe(refresh);
                sessionsFilter.timeslot.subscribe(refresh);
                sessionsFilter.track.subscribe(refresh);
                sessionsFilter.favoriteOnly.subscribe(refresh);
            },

            init = function () {
                events.sessionBriefBinding(gotoDetails);
                events.sessionFavoriteBinding(saveFavorite);
                addFilterSubscriptions();
            };

            // Initialization
            init();

        return {
            activate: activate,
            clearFilter: clearFilter,
            clearSideFilters: clearSideFilters,
            keyCaptureFilter: keyCaptureFilter,
            refresh: refresh,
            sessionsFilter: sessionsFilter,
            sessions: sessions,
            speakers: speakers,
            timeslots: timeslots,
            tracks: tracks
        };
    });