define('vm.speakers',
    ['ko', 'underscore', 'datacontext', 'config', 'router', 'messenger', 'filter.speakers', 'sort', 'store'],
    function (ko, _, datacontext, config, router, messenger, filter, sort, store) {
        var
            speakersFilter = new filter.Speakers(),
            speakers = ko.observableArray(),
            stateKey = { searchText: 'vm.speakers.searchText' },
            tmplName = 'speakers.view',
            
            getSpeakers = function(callback) {
                datacontext.speakerSessions.getLocalSpeakers(speakers, {
                    filter: speakersFilter,
                    sortFunction: sort.speakerSort
                });
                if (_.isFunction(callback)) {
                    callback();
                }
            },

            refresh = function (callback) {
                restoreFilter();
                getSpeakers(callback);
            },

            canLeave = function () {
                return true;
            },

            activate = function (routeData, callback) {
                messenger.publish.viewModelActivated({ canleaveCallback: canLeave });
                refresh(callback);
            },

            forceRefresh = ko.asyncCommand({
                execute: function(complete) {
                    datacontext.speakerSessions.forceDataRefresh()
                        .done(refresh)
                        .always(complete);
                },
                canExecute: function(isExecuting) {
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

            restoreFilter = function () {
                var val = store.fetch(stateKey.searchText);
                if (val !== speakersFilter.searchText()) {
                    speakersFilter.searchText(store.fetch(stateKey.searchText));
                }
            },

            onFilterChange = function (val) {
                store.save(stateKey.searchText, val);
                refresh();
            },

            init = function () {
                speakersFilter.searchText.subscribe(onFilterChange);
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