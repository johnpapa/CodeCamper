define('vm.favorites',
    ['jquery', 'ko', 'router', 'datacontext', 'filter', 'sort', 'group', 'utils', 'config', 'event.delegates', 'messenger', 'store'],
    function ($, ko, router, datacontext, filter, sort, group, utils, config, eventDelegates, messenger, store) {
        var
            isBusy = false,
            selectedDate = ko.observable(),
            sessionsFilter = new filter.SessionsFilter(),
            timeslots = ko.observableArray(),
            sessions = ko.observableArray(), //.trackReevaluations(),
            filterTmpl = 'sessions.filterbox',
            stateKey = { searchText: 'vm.favorites.searchText' },
            tmplName = 'sessions.view',
            
            days = ko.computed(function() {
                return group.timeslotsToDays(timeslots());
            }),

            getTimeslots = function () {
                if (!timeslots().length) {
                    datacontext.timeslots.getData({
                        results: timeslots,
                        sortFunction: sort.timeslotSort
                    });
                }
            },

            setFilter = function () {
                var day = new Date(selectedDate());
                sessionsFilter
                    .minDate(day)
                    .maxDate(utils.endOfDay(day))
                    .favoriteOnly(true);
            },

            setSelectedDay = function (data) {
                selectedDate(data && data.date ? data.date : selectedDate());
                if (!selectedDate()) {
                    // Get the first date
                    selectedDate(moment(timeslots()[0].start()).format('MM-DD-YYYY'));
                }else {
                    // force mutation, so subscribers will be notified (for the nav synch)
                    selectedDate.valueHasMutated();
                }
            },
            
            synchSelectedDateWithIsSelected = function () {
                // keeping nav in synch too
                for (var i = 0, len = days().length; i < len; i++) {
                    var day = days()[i];
                    day.isSelected(false);
                    if (day.date === selectedDate()) {
                        day.isSelected(true);
                        return;
                    }
                }
            },

            forceRefresh = ko.asyncCommand({
                execute: function (complete) {
                    setFilter();

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
                setFilter();

                datacontext.sessions.getData({
                    results: sessions,
                    filter: sessionsFilter,
                    sortFunction: sort.sessionSort
                });
            },

            canLeave = function () {
                return true;
            },

            activate = function (data) {
                messenger.publish.viewModelActivated({ canleaveCallback: canLeave });
                getTimeslots();
                setSelectedDay(data);
                restoreFilter();
                refresh();
            },
            
            gotoDetails = function(selectedSession) {
                if (selectedSession && selectedSession.id()) {
                    router.navigateTo(config.hashes.sessions + '/' + selectedSession.id());
                }
            },

            restoreFilter = function () {
                var val = store.fetch(stateKey.searchText);
                if (val !== sessionsFilter.searchText) {
                    sessionsFilter.searchText(store.fetch(stateKey.searchText));
                }
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
                        { success: function () { isBusy = false; }, error: function () { isBusy = false; } }
                    );
            },

            clearFilter = function () {
                sessionsFilter.searchText('');
            },

            onFilterChange= function () {
                store.save(stateKey.searchText, sessionsFilter.searchText());
                activate();
            },

            init = function () {
                // Bind jQuery delegated events
                eventDelegates.favoritesListItem(gotoDetails);
                eventDelegates.favoritesFavorite(saveFavorite);
                
                // Subscribe to specific changes of observables
                sessionsFilter.searchText.subscribe(onFilterChange);
                selectedDate.subscribe(synchSelectedDateWithIsSelected);
            };

            // Initialization
            init();

        return {
            canLeave: canLeave,
            clearFilter: clearFilter,
            days: days,
            //debugInfo: ko.utils.debugInfo,
            filterTmpl: filterTmpl,
            forceRefresh: forceRefresh,
            gotoDetails: gotoDetails,
            activate: activate,
            sessionsFilter: sessionsFilter,
            sessions: sessions,
            timeslots: timeslots,
            tmplName: tmplName
        };
    });