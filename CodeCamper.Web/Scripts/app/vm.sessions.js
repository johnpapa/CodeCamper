define('vm.sessions',
    ['jquery', 'ko', 'datacontext', 'router', 'filter.sessions', 'sort', 'event.delegates', 'utils', 'messenger', 'config', 'store'],
    function ($, ko, datacontext, router, SessionFilter, sort, eventDelegates, utils, messenger, config, store) {
        var
            filterTmpl = 'sessions.filterbox',
            isBusy = false,
            isRefreshing = false,
            sessionFilter = new SessionFilter(),
            sessions = ko.observableArray(),
            speakers = ko.observableArray(),
            stateKey = { filter: 'vm.sessions.filter' },
            timeslots = ko.observableArray(),
            tmplName = 'sessions.view',
            tracks = ko.observableArray(),

            activate = function (routeData) {
                messenger.publish.viewModelActivated({ canleaveCallback: canLeave });
                getSpeakers();
                getTimeslots();
                getTracks();
                refresh();
            },

            addFilterSubscriptions = function () {
                sessionFilter.searchText.subscribe(onFilterChange);
                sessionFilter.speaker.subscribe(onFilterChange);
                sessionFilter.timeslot.subscribe(onFilterChange);
                sessionFilter.track.subscribe(onFilterChange);
                sessionFilter.favoriteOnly.subscribe(onFilterChange);
            },

            canLeave = function () {
                return true;
            },

            clearAllFilters = function () {
                sessionFilter.favoriteOnly(false).speaker(null)
                    .timeslot(null).track(null).searchText('');
                refresh();
            },

            clearFilter = function () {
                sessionFilter.searchText('');
            },
            
            dataOptions = function (force) {
                return {
                    results: sessions,
                    filter: sessionFilter,
                    sortFunction: sort.sessionSort,
                    forceRefresh: force
                };
            },

            forceRefresh = ko.asyncCommand({
                execute: function (complete) {
                    $.when(
                        datacontext.sessions.getData(dataOptions(true))
                    ).always(complete);
                }
            }),

            getSpeakers = function () {
                if (!speakers().length) {
                    datacontext.speakerSessions.getLocalSpeakers(speakers, {
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

            gotoDetails = function (selectedSession) {
                if (selectedSession && selectedSession.id()) {
                    router.navigateTo(config.hashes.sessions + '/' + selectedSession.id());
                }
            },

            onFilterChange = function () {
                if (!isRefreshing) {
                    store.save(stateKey.filter, ko.toJS(sessionFilter));
                    refresh();
                }
            },

            refresh = function () {
                if (!isRefreshing) {
                    isRefreshing = true;
                    restoreFilter();
                    datacontext.sessions.getData(dataOptions(false));
                    isRefreshing = false;
                }
            },

            restoreFilter = function () {
                var stored = store.fetch(stateKey.filter);
                if (!stored) { return; }
                utils.restoreFilter({
                    stored: stored,
                    filter: sessionFilter,
                    datacontext: datacontext
                });
            },

            saveFavorite = function (selectedSession) {
                if (isBusy) {
                    return; // Already in the middle of a save on this session
                }
                isBusy = true;
                var cudMethod = selectedSession.isFavorite()
                    ? datacontext.attendance.deleteData
                    : datacontext.attendance.addData;
                cudMethod(
                        selectedSession,
                        {
                            success: function () { isBusy = false; },
                            error: function () { isBusy = false; }
                        }
                    );
            },

            init = function () {
                // Bind jQuery delegated events
                eventDelegates.sessionsListItem(gotoDetails);
                eventDelegates.sessionsFavorite(saveFavorite);

                // Subscribe to specific changes of observables
                addFilterSubscriptions();
            };

            init();

        return {
            activate: activate,
            canLeave: canLeave,
            clearFilter: clearFilter,
            clearAllFilters: clearAllFilters,
            filterTmpl: filterTmpl,
            forceRefresh: forceRefresh,
            sessionFilter: sessionFilter,
            sessions: sessions,
            speakers: speakers,
            timeslots: timeslots,
            tmplName: tmplName,
            tracks: tracks
        };
    });