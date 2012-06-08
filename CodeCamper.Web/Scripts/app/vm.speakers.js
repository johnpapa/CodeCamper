// Description
//  vm.speakers is the ViewModel for a view displaying all speakers.
//  The user can further filter this subset of speakers by additional criteria.
//
// ----------------------------------------------
define(['ko', 'router', 'datacontext', 'filter', 'sort', 'messenger'],
    function (ko, router, datacontext, filter, sort, messenger) {
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

            canLeave = function () {
                return true;
            },

            activate = function () {
                messenger.publish.viewModelActivated({ canleaveCallback: canLeave });
                getSpeakers();
            },

            forceRefresh = ko.asyncCommand({
                execute: function (complete) {
                    $.when(
                        datacontext.sessionSpeakers.getData({
                            results: speakers,
                            filter: speakersFilter,
                            sortFunction: sort.speakerSort,
                            forceRefresh: true
                        })
                    ).always(complete);
                },
                canExecute: function (isExecuting) {
                    return true;
                }
            }),

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
                speakersFilter.searchText.subscribe(getSpeakers);
            };

        init();

        return {
            activate: activate,
            canLeave: canLeave,
            clearFilter: clearFilter,
            forceRefresh: forceRefresh,
            gotoDetails: gotoDetails,
            speakersFilter: speakersFilter,
            speakers: speakers
        };
    });