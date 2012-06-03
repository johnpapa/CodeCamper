// Description
//  vm.favorites is the ViewModel for a view displaying just the sessions
//  that the current user has marked as favorites.
//  The user can further filter this subset of Sessions by additional criteria,
//  the same filter criteria that can be applied to all sessions.
// ----------------------------------------------
define(['ko', 'router', 'datacontext', 'filter', 'sort', 'group', 'utils', 'config', 'events'],
    function(ko, router, datacontext, filter, sort, group, utils, config, events) {
        var
            selectedDate = ko.observable(),
            sessionsFilter = new filter.SessionsFilter(),
            timeslots = ko.observableArray(),
            sessions = ko.observableArray(), //.trackReevaluations(),
            
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
                sessionsFilter.minDate(day)
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
                for (var i = 0; i < days().length; i++) {
                    var day = days()[i];
                    day.isSelected(false);
                    if (day.date === selectedDate()) {
                        day.isSelected(true);
                        return;
                    }
                }
            },

            refresh = function () {
                setFilter();

                datacontext.sessions.getData({
                    results: sessions,
                    filter: sessionsFilter,
                    sortFunction: sort.sessionSort
                });
            },

            activate = function (data) {
                getTimeslots();
                setSelectedDay(data);
                refresh();
            },
            
            gotoDetails = function(selectedSession) {
                if (selectedSession && selectedSession.id()) {
                    events.navToSession(selectedSession.id());
                }
            },

            saveFavorite = function (selectedSession) {
                if (selectedSession.isFavorite()) {
                    datacontext.attendanceCud.deleteAttendance(selectedSession);
                } else {
                    datacontext.attendanceCud.addAttendance(selectedSession);
                }
            },

            clearFilter = function () {
                sessionsFilter.searchText('');
            },

            keyCaptureFilter = function (data, event) {
                if (event.keyCode == utils.keys.escape) {
                    clearFilter();
                }
            },

            init = function () {
                events.favoritesListItem(gotoDetails);
                events.favoritesFavorite(saveFavorite);
                sessionsFilter.searchText.subscribe(activate);
                selectedDate.subscribe(synchSelectedDateWithIsSelected);
            };

            // Initialization
            init();

        return {
            clearFilter: clearFilter,
            days: days,
            //debugInfo: debugInfo,
            gotoDetails: gotoDetails,
            keyCaptureFilter: keyCaptureFilter,
            activate: activate,
            refresh: refresh,
            sessionsFilter: sessionsFilter,
            sessions: sessions,
            timeslots: timeslots
        };
    });