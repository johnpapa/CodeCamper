define('vm.sessions',
    ['ko', 'router', 'datacontext', 'filter', 'sort', 'event.delegates', 'utils', 'messenger', 'jquery', 'config', 'store', 'model.mapper'],
    function (ko, router, datacontext, filter, sort, eventDelegates, utils, messenger, $, config, store, modelMapper) {
        var
            isBusy = false,
            isRefreshing = false,
            sessionsFilter = new filter.SessionsFilter(),
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
                    isRefreshing = true;
                    restoreFilter();
                    datacontext.sessions.getData({
                        results: sessions,
                        filter: sessionsFilter,
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
                    sessionsFilter.favoriteOnly);
                restoreFilterProperty(
                    localFilter.searchText,
                    sessionsFilter.searchText);
                restoreFilterProperty(
                    localFilter.speaker,
                    sessionsFilter.speaker,
                    datacontext.persons.getLocalById);
                restoreFilterProperty(
                    localFilter.timeslot,
                    sessionsFilter.timeslot,
                    datacontext.timeslots.getLocalById);
                restoreFilterProperty(
                    localFilter.track,
                    sessionsFilter.track,
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
                sessionsFilter.searchText('');
            },

            clearAllFilters = function () {
                sessionsFilter
                    .favoriteOnly(false)
                    .speaker(null)
                    .timeslot(null)
                    .track(null)
                    .searchText('');
                refresh();
            },
            
            addFilterSubscriptions = function () {
                sessionsFilter.searchText.subscribe(onFilterChange);
                sessionsFilter.speaker.subscribe(onFilterChange);
                sessionsFilter.timeslot.subscribe(onFilterChange);
                sessionsFilter.track.subscribe(onFilterChange);
                sessionsFilter.favoriteOnly.subscribe(onFilterChange);
            },

            onFilterChange = function () {
                if (!isRefreshing) {
                    var o = ko.toJS(sessionsFilter);
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

                //TODO: Workaround til they fix their bug
                //$(function () {
                //    $(':wijmo-wijcheckbox').wijcheckbox('refresh');
                //});
            };

            init();

        return {
            activate: activate,
            canLeave: canLeave,
            clearFilter: clearFilter,
            clearAllFilters: clearAllFilters,
            filterTmpl: filterTmpl,
            forceRefresh: forceRefresh,
            sessionsFilter: sessionsFilter,
            sessions: sessions,
            speakers: speakers,
            timeslots: timeslots,
            tracks: tracks,
            tmplName: tmplName
        };
    });