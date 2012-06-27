define(['ko', 'router', 'datacontext', 'filter', 'sort', 'messenger', 'config'],
    function (ko, router, datacontext, filter, sort, messenger, config) {
        var
            speakersFilter = new filter.SpeakersFilter(),
            speakers = ko.observableArray(),
            
            tmplName = 'speakers.view',

            getSpeakers = function () {
                datacontext.speakerSessions.getLocalSpeakers(speakers, {
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
                    datacontext.speakerSessions.forceDataRefresh()
                    .done(getSpeakers)
                    .always(complete);
                },
                canExecute: function (isExecuting) {
                    return true;
                }
            }),

            gotoDetails = function (selectedSpeaker) {
                if (selectedSpeaker && selectedSpeaker.id()) {
                    router.navigateTo(config.hashes.speakers + '/' + selectedSpeaker.id());
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
            speakers: speakers,
            tmplName: tmplName
        };
    });