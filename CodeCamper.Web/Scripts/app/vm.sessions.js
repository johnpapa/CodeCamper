// Description
//  vm.sessions is the ViewModel for a view displaying all sessions.
//  The user can further filter this subset of Sessions by additional criteria.
//
// ----------------------------------------------
define(['ko', 'router', 'datacontext', 'filter', 'sort', 'events', 'utils', 'messenger'],
    function (ko, router, datacontext, filter, sort, events, utils, messenger) {
        var
            self = this,
            isRefreshing = false,
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

            canLeave = function () {
                return sessions().length % 2 === 1;
            },

            activate = function () {
                messenger.publish.viewModelActivated({ viewmodel: self, canleaveCallback: canLeave });
                getSpeakers();
                getTimeslots();
                getTracks();
                refresh();
            },

            refresh = function () {
                if (!isRefreshing) {
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
                if (selectedSession.isBusy()) {
                    return; // Already in the middle of a save on this session
                }
                selectedSession.isBusy(true);
                var cudMethod = selectedSession.isFavorite()
                    ? datacontext.attendanceCud.deleteAttendance
                    : datacontext.attendanceCud.addAttendance;
                cudMethod(
                        selectedSession,
                        { success: function () { selectedSession.isBusy(false); }, error: function () { selectedSession.isBusy(false); } }
                    );
            },

            clearFilter = function () {
                sessionsFilter.searchText('');
            },

            clearSideFilters = function () {
                isRefreshing = true;
                sessionsFilter.favoriteOnly(false).speaker(null)
                    .timeslot(null).track(null);
                isRefreshing = false;
                refresh();
            },
            
            addFilterSubscriptions = function () {
                sessionsFilter.searchText.subscribe(refresh);
                sessionsFilter.speaker.subscribe(refresh);
                sessionsFilter.timeslot.subscribe(refresh);
                sessionsFilter.track.subscribe(refresh);
                sessionsFilter.favoriteOnly.subscribe(refresh);
            },

            init = function () {
                events.sessionsListItem(gotoDetails);
                events.sessionsFavorite(saveFavorite);
                addFilterSubscriptions();
            };

            // Initialization
            init();

        return {
            activate: activate,
            canLeave: canLeave,
            clearFilter: clearFilter,
            clearSideFilters: clearSideFilters,
            refresh: refresh,
            sessionsFilter: sessionsFilter,
            sessions: sessions,
            speakers: speakers,
            timeslots: timeslots,
            tracks: tracks
        };
    });