define('vm.sessions',
    ['jquery', 'ko', 'datacontext', 'router', 'filter.sessions', 'sort', 'event.delegates', 'utils', 'messenger', 'config', 'store'],
    function ($, ko, datacontext, router, SessionFilter, sort, eventDelegates, utils, messenger, config, store) {
        var
            isBusy = false,
            isRefreshing = false,
            sessionFilter = new SessionFilter(),
            sessions = ko.observableArray(),
            speakers = ko.observableArray(),
            stateKey = { filter: 'vm.sessions.filter' },
            timeslots = ko.observableArray(),
            tracks = ko.observableArray(),
            tmplName = 'sessions.view',
            filterTmpl = 'sessions.filterbox',

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

            canLeave = function () {
                return true; 
            },

            activate = function (routeData) {
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
                            filter: sessionFilter,
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
                    isRefreshing = true;
                    restoreFilter();
                    datacontext.sessions.getData({
                        results: sessions,
                        filter: sessionFilter,
                        sortFunction: sort.sessionSort
                    });
                    isRefreshing = false;
                }
            },

            gotoDetails = function (selectedSession) {
                if (selectedSession && selectedSession.id()) {
                    router.navigateTo(config.hashes.sessions + '/' + selectedSession.id());
                }
            },

            restoreFilterProperty = function (rawProperty, filterProperty, fetchMethod) {
                if (rawProperty && filterProperty() !== rawProperty) {
                    if(fetchMethod) {
                        var obj = fetchMethod(rawProperty.id);
                        if (obj) { filterProperty(obj); }
                    }else {
                        filterProperty(rawProperty);
                    }
                }
            },

            restoreFilter = function () {
                var localFilter = store.fetch(stateKey.filter);
                if (!localFilter) { return; }
                restoreFilterProperty(
                    localFilter.favoriteOnly,
                    sessionFilter.favoriteOnly);
                restoreFilterProperty(
                    localFilter.searchText,
                    sessionFilter.searchText);
                restoreFilterProperty(
                    localFilter.speaker,
                    sessionFilter.speaker,
                    datacontext.persons.getLocalById);
                restoreFilterProperty(
                    localFilter.timeslot,
                    sessionFilter.timeslot,
                    datacontext.timeslots.getLocalById);
                restoreFilterProperty(
                    localFilter.track,
                    sessionFilter.track,
                    datacontext.tracks.getLocalById);
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

            clearFilter = function () {
                sessionFilter.searchText('');
            },

            clearAllFilters = function () {
                sessionFilter
                    .favoriteOnly(false)
                    .speaker(null)
                    .timeslot(null)
                    .track(null)
                    .searchText('');
                refresh();
            },
            
            addFilterSubscriptions = function () {
                sessionFilter.searchText.subscribe(onFilterChange);
                sessionFilter.speaker.subscribe(onFilterChange);
                sessionFilter.timeslot.subscribe(onFilterChange);
                sessionFilter.track.subscribe(onFilterChange);
                sessionFilter.favoriteOnly.subscribe(onFilterChange);
            },

            onFilterChange = function () {
                if (!isRefreshing) {
                    var o = ko.toJS(sessionFilter);
                    store.save(stateKey.filter, o);
                    refresh();
                }
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
            tracks: tracks,
            tmplName: tmplName
        };
    });