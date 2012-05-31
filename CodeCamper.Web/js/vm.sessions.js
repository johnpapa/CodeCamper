// Depends on
//	Knockout
// 	app.logger
//  app.router
//	app.datacontext
//  app.config
//  app.filter
//  app.sort
//
// Description
//  vm.sessions is the ViewModel for a view displaying all sessions.
//  The user can further filter this subset of Sessions by additional criteria.
//
// ----------------------------------------------
app.vm = app.vm || {};

app.vm.sessions = (function (ko, logger, router, datacontext, config, filter, sort) {
    var
        pauseRefresh = false,
        sessionFilter = new filter.SessionFilter(),
        sessions = ko.observableArray(),
        speakers = ko.observableArray(),
        timeslots = ko.observableArray(),
        tracks = ko.observableArray(),

        getSpeakers = function () {
            if (!speakers().length) {
                datacontext.sessionSpeakers.getData({
                    results: speakers,
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

        activate = function () {
            getSpeakers();
            getTimeslots();
            getTracks();
            refresh();
        },

        refresh = function () {
            if (!pauseRefresh) {
                datacontext.sessions.getData({
                    results: sessions,
                    filter: sessionFilter,
                    sortFunction: sort.sessionSort
                });
            }
        },

        gotoDetails = function (selectedSession) {
            if (selectedSession && selectedSession.id()) {
                router.navigateTo('#/sessions/' + selectedSession.id());
            }
        },

        clearFilter = function () {
            if (sessionFilter.searchText().length) {
                sessionFilter.searchText('');
            }
        },
        
        clearSideFilters = function () {
            pauseRefresh = true;
            sessionFilter.favoriteOnly(false);
            sessionFilter.speaker(null);
            sessionFilter.timeslot(null);
            sessionFilter.track(null);
            pauseRefresh = false;
            refresh();
        },

        keyCaptureFilter = function (data, event) {
            if (event.keyCode == 27) {
                clearFilter();
            }
        };

    return {
        activate: activate,
        clearFilter: clearFilter,
        clearSideFilters: clearSideFilters,
        gotoDetails: gotoDetails,
        keyCaptureFilter: keyCaptureFilter,
        refresh: refresh,
        sessionFilter: sessionFilter,
        sessions: sessions,
        speakers: speakers,
        timeslots: timeslots,
        tracks: tracks
    };
})(ko, app.config.logger, app.router, app.datacontext, app.config, app.filter, app.sort, app.utils);

app.vm.sessions.sessionFilter.searchText.subscribe(function () {
    app.vm.sessions.refresh();
});

app.vm.sessions.sessionFilter.speaker.subscribe(function () {
    app.vm.sessions.refresh();
});

app.vm.sessions.sessionFilter.timeslot.subscribe(function () {
    app.vm.sessions.refresh();
});

app.vm.sessions.sessionFilter.track.subscribe(function () {
    app.vm.sessions.refresh();
});

app.vm.sessions.sessionFilter.favoriteOnly.subscribe(function () {
    app.vm.sessions.refresh();
});

