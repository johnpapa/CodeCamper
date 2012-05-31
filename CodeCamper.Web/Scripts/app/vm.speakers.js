// Description
//  vm.speakers is the ViewModel for a view displaying all speakers.
//  The user can further filter this subset of speakers by additional criteria.
//
// ----------------------------------------------
define(['ko', 'router', 'datacontext', 'filter', 'sort'],
    function(ko, router, datacontext, filter, sort) {
        //app.vm.speakers = (function (ko, logger, router, datacontext, config, filter, sort) {
        var speakersFilter = new filter.SpeakersFilter(),
            speakers = ko.observableArray(),
            getSpeakers = function() {
                datacontext.sessionSpeakers.getData({
                    results: speakers,
                    filter: speakersFilter,
                    sortFunction: sort.speakerSort
                });
            },
            refresh = function() {
                getSpeakers();
            },
            gotoDetails = function(selectedspeaker) {
                if (selectedspeaker && selectedspeaker.id()) {
                    router.navigateTo('#/speakers/' + selectedspeaker.id());
                }
            },
            clearFilter = function() {
                if (speakersFilter.searchText().length) {
                    speakersFilter.searchText('');
                }
            },
            keyCaptureFilter = function(data, event) {
                if (event.keyCode == 27) {
                    clearFilter();
                }
            },
            initialize = function() {
                //debugInfo = config.debugInfo(sessions);
                speakersFilter.searchText.subscribe(refresh);
            };

        initialize();
        return {
            clearFilter: clearFilter,
            gotoDetails: gotoDetails,
            keyCaptureFilter: keyCaptureFilter,
            refresh: refresh,
            speakersFilter: speakersFilter,
            speakers: speakers
        };
    });