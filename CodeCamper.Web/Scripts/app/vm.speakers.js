// Description
//  vm.speakers is the ViewModel for a view displaying all speakers.
//  The user can further filter this subset of speakers by additional criteria.
//
// ----------------------------------------------
define(['ko', 'router', 'datacontext', 'filter', 'sort'],
    function(ko, router, datacontext, filter, sort) {
        //app.vm.speakers = (function (ko, logger, router, datacontext, config, filter, sort) {
        var
            speakersFilter = new filter.SpeakersFilter(),
            speakers = ko.observableArray(),

            getSpeakers = function () {
                datacontext.sessionSpeakers.getData({
                    results: speakers,
                    filter: speakersFilter,
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
                if (speakersFilter.searchText().length) {
                    speakersFilter.searchText('');
                }
            },

            init = function () {
                speakersFilter.searchText.subscribe(refresh);
            };

        init();

        return {
            clearFilter: clearFilter,
            gotoDetails: gotoDetails,
            refresh: refresh,
            speakersFilter: speakersFilter,
            speakers: speakers
        };
    });