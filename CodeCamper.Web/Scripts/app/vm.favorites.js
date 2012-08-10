define('vm.favorites',
    ['jquery', 'ko', 'datacontext', 'router', 'filter.sessions', 'sort', 'group', 'utils', 'config', 'event.delegates', 'messenger', 'store'],
    function ($, ko, datacontext, router, SessionFilter, sort, group, utils, config, eventDelegates, messenger, store) {
        var
            filterTmpl = 'sessions.filterbox',
            isBusy = false,
            selectedDate = ko.observable(),
            sessionFilter = new SessionFilter(),
            sessions = ko.observableArray(), //.trackReevaluations(),
            stateKey = { searchText: 'vm.favorites.searchText' },
            timeslots = ko.observableArray(),
            tmplName = 'sessions.view',
            
            activate = function (routeData) {
                messenger.publish.viewModelActivated({ canleaveCallback: canLeave });
                getTimeslots();
                setSelectedDay(routeData);
                restoreFilter();
                refresh();
            },

            canLeave = function () {
                return true;
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

            days = ko.computed(function () {
                return group.timeslotsToDays(timeslots());
            }),

            forceRefresh = ko.asyncCommand({
                execute: function (complete) {
                    setFilter();

                    $.when(
                        datacontext.sessions.getData(dataOptions(true))
                    ).always(complete);
                },
                canExecute: function (isExecuting) {
                    return true;
                }
            }),

            getTimeslots = function () {
                if (!timeslots().length) {
                    datacontext.timeslots.getData({
                        results: timeslots,
                        sortFunction: sort.timeslotSort
                    });
                }
            },

            gotoDetails = function (selectedSession) {
                if (selectedSession && selectedSession.id()) {
                    router.navigateTo(config.hashes.sessions + '/' + selectedSession.id());
                }
            },

            onFilterChange = function (val) {
                store.save(stateKey.searchText, val);
                refresh();
            },

            refresh = function () {
                setFilter();
                datacontext.sessions.getData(dataOptions(false));
            },

            restoreFilter = function () {
                var val = store.fetch(stateKey.searchText);
                if (val !== sessionFilter.searchText()) {
                    sessionFilter.searchText(store.fetch(stateKey.searchText));
                }
            },

            saveFavorite = function (selectedSession) {
                if (isBusy) {
                    return; // Already in the middle of a save 
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

            setFilter = function () {
                var day = new Date(selectedDate());
                sessionFilter
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
            
            synchSelectedDateWithIsSelected = function (val) {
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

            init = function () {
                // Bind jQuery delegated events
                eventDelegates.favoritesListItem(gotoDetails);
                eventDelegates.favoritesFavorite(saveFavorite);
                
                // Subscribe to specific changes of observables
                sessionFilter.searchText.subscribe(onFilterChange);
                selectedDate.subscribe(synchSelectedDateWithIsSelected);
            };

            init();

        return {
            canLeave: canLeave,
            clearFilter: clearFilter,
            days: days,
            debugInfo: ko.utils.debugInfo(sessions),
            filterTmpl: filterTmpl,
            forceRefresh: forceRefresh,
            gotoDetails: gotoDetails,
            activate: activate,
            sessionFilter: sessionFilter,
            sessions: sessions,
            timeslots: timeslots,
            tmplName: tmplName
        };
    });