// Depends on 
//	Knockout
// 	app.logger
//	app.datacontext
//  app.filter
//  app.sort
//  app.config
//
// Description
//  vm.favorites is the ViewModel for a view displaying just the sessions
//  that the current user has marked as favorites.
//  The user can further filter this subset of Sessions by additional criteria,
//  the same filter criteria that can be applied to all sessions.
//
// ----------------------------------------------
app.vm = app.vm || {};

app.vm.favorites = (function (ko, logger, router, datacontext, config, filter, sort, group) {
    var selectedDate,
        searchText = ko.observable().extend({ throttle: config.throttle }),
        sessionFilter = new filter.SessionFilter(),
        timeslots = ko.observableArray(),
        sessions = ko.observableArray(), //.trackReevaluations(),
        days = ko.computed(function () { return group.timeslotsToDays(timeslots()); }),

        getTimeslots = function () {
            if (!timeslots().length) {
                datacontext.timeslots.getData({
                    results: timeslots,
                    sortFunction: sort.timeslotSort
                });
            }
        },

        setFilter = function () {
            var day = new Date(selectedDate),
                maxDate = moment(new Date(day))
                    .add('days', 1)
                    .add('seconds', -1)
                    .toDate();
            sessionFilter.minTimeSlot(day)
                .maxTimeSlot(maxDate)
                .favoriteOnly(true)
                .searchText(searchText());
        },

        setSelectedDay = function (data) {
            selectedDate = data && data.date ? data.date : selectedDate;
            if (!selectedDate) {
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
        refresh = function () {
            setFilter();

            datacontext.sessions.getData({
                results: sessions,
                filter: sessionFilter,
                sortFunction: sort.sessionSort
            });
        },
        loadByDate = function (data) {
            getTimeslots();
            setSelectedDay(data);
            refresh();
        },
        
        gotoDetails = function (selectedSession) {
            if (selectedSession && selectedSession.id()) {
                router.navigateTo('#/sessions/' + selectedSession.id());
            }
        },
        
        clearFilter = function () {
            searchText('');
        },
        
        keyCaptureFilter = function (e) {
            //if (e.keyCode == 13) {
            //    refresh();
            //}
            if (e.keyCode == 27) {
                clearFilter();
            }
        },

        debugInfo = app.debugInfo(sessions);

    return {
        clearFilter: clearFilter,
        days: days,
        debugInfo: debugInfo,
        gotoDetails: gotoDetails,
        keyCaptureFilter: keyCaptureFilter,
        loadByDate: loadByDate,
        refresh: refresh,
        searchText: searchText,
        sessions: sessions,
        timeslots: timeslots
    };
})(ko, app.config.logger, app.router, app.datacontext, app.config, app.filter, app.sort, app.group);

app.vm.favorites.searchText.subscribe(function() {
    app.vm.favorites.loadByDate();
    //TODO: remove logger
    app.config.logger.info('searchText Changed to ' + app.vm.favorites.searchText()); 
});

$(document).keyup(function (e) {
    if (e.keyCode == 13) {
        app.vm.favorites.refresh(); }     // enter
    if (e.keyCode == 27) {
        app.vm.favorites.clearFilter(); }   // esc
});
