// Description
//  vm.favorites is the ViewModel for a view displaying just the sessions
//  that the current user has marked as favorites.
//  The user can further filter this subset of Sessions by additional criteria,
//  the same filter criteria that can be applied to all sessions.
// ----------------------------------------------
define(['ko', 'router', 'datacontext', 'filter', 'sort', 'group', 'utils', 'config', 'events'],
    function(ko, router, datacontext, filter, sort, group, utils, config, events) {
        var selectedDate,
            sessionsFilter = new filter.SessionsFilter(),
            timeslots = ko.observableArray(),
            sessions = ko.observableArray(), //.trackReevaluations(),
            days = ko.computed(function() {
                return group.timeslotsToDays(timeslots());
            }),
            //days = ko.computed({
        //    read: function () {
        //        return group.timeslotsToDays(timeslots());
        //    },
        //    deferEvaluation: true
        //}),
            getTimeslots = function() {
                if (!timeslots().length) {
                    datacontext.timeslots.getData({
                        results: timeslots,
                        sortFunction: sort.timeslotSort
                    });
                }
            },
            setFilter = function() {
                var day = new Date(selectedDate);
                sessionsFilter.minDate(day)
                    .maxDate(utils.endOfDay(day))
                    .favoriteOnly(true);
            },
            setSelectedDay = function(data) {
                selectedDate = data && data.date ? data.date : selectedDate;
                if (!selectedDate) {
                    // Get the first date
                    selectedDate = moment(timeslots()[0].start()).format('MM-DD-YYYY');
                }

                // keeping nav in synch too
                for (var i = 0; i < days().length; i++) {
                    var day = days()[i];
                    day.isSelected(false);
                    if (day.date === selectedDate) {
                        day.isSelected(true);
                        return;
                    }
                }
            },
            refresh = function() {
                setFilter();

                datacontext.sessions.getData({
                    results: sessions,
                    filter: sessionsFilter,
                    sortFunction: sort.sessionSort
                });
            },
            loadByDate = function(data) {
                getTimeslots();
                setSelectedDay(data);
                refresh();
            },
            gotoDetails = function(selectedSession) {
                if (selectedSession && selectedSession.id()) {
                    router.navigateTo('#/sessions/' + selectedSession.id());
                }
            },
            saveFavorite = function (selectedSession) {
                //debugger; //TODO:
                if (selectedSession.isFavorite()) {
                    // If we just unmarked it as a favorite, we need to go delete it.
                    datacontext.attendanceCud.deleteAttendance(selectedSession);
                } else {
                    // If we just marked it as a favorite, we need to go add it.
                    datacontext.attendanceCud.addAttendance(selectedSession);
                }
            },
            clearFilter = function () {
                if (sessionsFilter.searchText().length) {
                    sessionsFilter.searchText('');
                }
            },
            keyCaptureFilter = function(data, event) {
                if (event.keyCode == 27) {
                    clearFilter();
                }
            },
            init = function () {
                events.favoriteSessionBriefBinding(gotoDetails);
                events.favoriteSessionFavoriteBinding(saveFavorite);
                sessionsFilter.searchText.subscribe(loadByDate);
            };

            // Initialization
            init();

        return {
            clearFilter: clearFilter,
            days: days,
            //debugInfo: debugInfo,
            gotoDetails: gotoDetails,
            keyCaptureFilter: keyCaptureFilter,
            loadByDate: loadByDate,
            refresh: refresh,
            sessionsFilter: sessionsFilter,
            sessions: sessions,
            timeslots: timeslots
        };
    });