// Description
//  vm.sessions is the ViewModel for a view displaying all sessions.
//  The user can further filter this subset of Sessions by additional criteria.
//
// ----------------------------------------------
define(['ko', 'router', 'datacontext', 'filter', 'sort', 'event.delegates', 'utils', 'messenger'],
    function (ko, router, datacontext, filter, sort, eventDelegates, utils, messenger) {
        var
            isBusy = false,
            isRefreshing = false,
            sessionsFilter = new filter.SessionsFilter(),
            test = ko.observable(),
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
                return true; 
            },

            activate = function () {
                messenger.publish.viewModelActivated({ canleaveCallback: canLeave });
                getSpeakers();
                getTimeslots();
                getTracks();
                refresh();
            },

            forceRefresh = ko.asyncCommand({
                execute: function (complete) {
                    $.when(
                        datacontext.sessions.getData({
                            results: sessions,
                            filter: sessionsFilter,
                            sortFunction: sort.sessionSort,
                            forceRefresh: true
                        })
                    ).always(complete);
                },
                canExecute: function (isExecuting) {
                    return true;
                }
            }),

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
                    router.navigateTo('#/sessions/' + selectedSession.id());
                }
            },

            saveFavorite = function (selectedSession) {
                if (isBusy) {
                    return; // Already in the middle of a save on this session
                }
                isBusy = true;
                var cudMethod = selectedSession.isFavorite()
                    ? datacontext.attendance.deleteModel
                    : datacontext.attendance.addModel;
                cudMethod(
                        selectedSession,
                        { success: function () { isBusy = false; }, error: function () { isBusy = false; } }
                    );
            },

            clearFilter = function () {
                sessionsFilter.searchText('');
            },

            clearSideFilters = function () {
                isRefreshing = true;
                sessionsFilter
                    .favoriteOnly(false)
                    .speaker(null)
                    .timeslot(null)
                    .track(null);
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
                eventDelegates.sessionsListItem(gotoDetails);
                eventDelegates.sessionsFavorite(saveFavorite);
                addFilterSubscriptions();
            };

            // Initialization
            init();

        return {
            activate: activate,
            canLeave: canLeave,
            clearFilter: clearFilter,
            clearSideFilters: clearSideFilters,
            forceRefresh: forceRefresh,
            sessionsFilter: sessionsFilter,
            sessions: sessions,
            speakers: speakers,
            timeslots: timeslots,
            tracks: tracks
            
            ,test:test
        };
    });