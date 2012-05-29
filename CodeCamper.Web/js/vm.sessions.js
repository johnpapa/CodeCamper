// Depends on
//	Knockout
// 	app.logger
//  app.router
//	app.datacontext
//  app.config
//  app.filter
//  app.sort
//  app.group
//  app.utils
//
// Description
//  vm.sessions is the ViewModel for a view displaying all sessions.
//  The user can further filter this subset of Sessions by additional criteria.
//
// ----------------------------------------------
app.vm = app.vm || {};

app.vm.sessions = (function (ko, logger, router, datacontext, config, filter, sort, utils) {
    var searchText = ko.observable().extend({ throttle: config.throttle }),
        sessionFilter = new filter.SessionFilter(),
        roomCriteria = ko.observable(),
        speakerCriteria = ko.observable(),
        trackCriteria = ko.observable(),
        sessions = ko.observableArray(),
        setFilter = function() {
            sessionFilter.favoriteOnly(false)
                .room(roomCriteria())
                .track(trackCriteria())
                .speaker(speakerCriteria())
                .searchText(searchText());
        },
        refresh = function () {
            setFilter();

            datacontext.sessions.getData({
                results: sessions,
                filter: sessionFilter,
                sortFunction: sort.sessionSort
            });
        },
        gotoDetails = function(selectedSession) {
            if (selectedSession && selectedSession.id()) {
                router.navigateTo('#/sessions/' + selectedSession.id());
            }
        },
        clearFilter = function() {
            if (searchText().length) {
                searchText('');
            }
        },
        keyCaptureFilter = function(data, event) {
            if (event.keyCode == 27) {
                clearFilter();
            }
        };

    return {
        clearFilter: clearFilter,
        gotoDetails: gotoDetails,
        keyCaptureFilter: keyCaptureFilter,
        refresh: refresh,
        roomCriteria: roomCriteria,
        searchText: searchText,
        speakerCriteria: speakerCriteria,
        trackCriteria: trackCriteria,
        sessions: sessions
    };
})(ko, app.config.logger, app.router, app.datacontext, app.config, app.filter, app.sort, app.utils);

app.vm.sessions.searchText.subscribe(function () {
    app.vm.sessions.refresh();
});
