// Description
//  vm.favorites is the ViewModel for a view displaying just the sessions
//  that the current user has marked as favorites.
//  The user can further filter this subset of Sessions by additional criteria,
//  the same filter criteria that can be applied to all sessions.
// ----------------------------------------------
define(['jquery', 'ko', 'router', 'datacontext', 'filter', 'sort', 'group', 'utils', 'config', 'event.delegates', 'messenger'],
    function ($, ko, router, datacontext, filter, sort, group, utils, config, eventDelegates, messenger) {
        var
            isBusy = false,
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
                refresh();
            },
            
            gotoDetails = function(selectedSession) {
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

            init = function () {
                eventDelegates.favoritesListItem(gotoDetails);
                eventDelegates.favoritesFavorite(saveFavorite);
                sessionsFilter.searchText.subscribe(activate);
                selectedDate.subscribe(synchSelectedDateWithIsSelected);
            };

            // Initialization
            init();

        return {
            canLeave: canLeave,
            clearFilter: clearFilter,
            days: days,
            //debugInfo: debugInfo,
            forceRefresh: forceRefresh,
            gotoDetails: gotoDetails,
            activate: activate,
            sessionsFilter: sessionsFilter,
            sessions: sessions,
            timeslots: timeslots
        };
    });