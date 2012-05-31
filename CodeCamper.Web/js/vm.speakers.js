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
//  vm.speakers is the ViewModel for a view displaying all speakers.
//  The user can further filter this subset of speakers by additional criteria.
//
// ----------------------------------------------
app.vm = app.vm || {};

app.vm.speakers = (function (ko, logger, router, datacontext, config, filter, sort) {
    var
        speakerFilter = new filter.SpeakerFilter(),
        speakers = ko.observableArray(),

        getSpeakers = function () {
            datacontext.sessionSpeakers.getData({
                results: speakers,
                filter: speakerFilter,
                sortFunction: sort.speakerSort
            });
        },

        refresh = function () {
            getSpeakers();
        },

        gotoDetails = function (selectedspeaker) {
            if (selectedspeaker && selectedspeaker.id()) {
                router.navigateTo('#/speakers/' + selectedspeaker.id());
            }
        },

        clearFilter = function () {
            if (speakerFilter.searchText().length) {
                speakerFilter.searchText('');
            }
        },

        keyCaptureFilter = function (data, event) {
            if (event.keyCode == 27) {
                clearFilter();
            }
        };

    return {
        clearFilter: clearFilter,
        gotoDetails: gotoDetails,
        keyCaptureFilter: keyCaptureFilter,
        refresh: refresh,
        speakerFilter: speakerFilter,
        speakers: speakers
    };
})(ko, app.config.logger, app.router, app.datacontext, app.config, app.filter, app.sort, app.utils);

app.vm.speakers.speakerFilter.searchText.subscribe(function () {
    app.vm.speakers.refresh();
});