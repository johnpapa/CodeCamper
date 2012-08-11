define(
    'vm-favorites-tests-function',
    ['jquery', 'underscore', 'ko', 'datacontext', 'router', 'filter.sessions', 'sort', 'group', 'utils', 'config', 'event.delegates'],
    function ($, _, ko, datacontext, router, filter, sort, group, utils, config, eventDelegates) {

        var doNothing = function(){};

        config.useMocks(true); // this helps me NOT mock datacontext
        config.currentUserId = 3;
        config.currentUser = function() { return { id: function() { return 3; } }; };
        config.logger = { success: doNothing };
        config.dataserviceInit();

        var fakeMessenger = {
            publish: { viewModelActivated: doNothing }
        };

        var fakeRouter = {
            navigateBack: doNothing
        };

        var fakeStore = {
            clear: doNothing,
            fetch: function (){ return 'John';}, //doNothing,
            save: doNothing
        };

        var findVm = function() {
            return window.testFn($, ko, datacontext, fakeRouter, filter, sort, group, utils, config, eventDelegates, fakeMessenger, fakeStore);
        };

        module('favorites viewmodel tests');

        asyncTest('Activate viewmodel and has favorites',
            function() {
                //ARRANGE
                var vmFavorites = findVm(),
                    routeData = { date: '05-19-2013' };

                var data = {
                    rooms: ko.observable(),
                    tracks: ko.observable(),
                    timeslots: ko.observable(),
                    attendance: ko.observable(),
                    persons: ko.observable(),
                    sessions: ko.observable()
                };

                $.when(
                    datacontext.rooms.getData({ results: data.rooms }),
                    datacontext.timeslots.getData({ results: data.timeslots }),
                    datacontext.tracks.getData({ results: data.tracks }),
                    datacontext.attendance.getData({ param: config.currentUserId, results: data.attendance }),
                    datacontext.persons.getSpeakers({ results: data.persons }),
                    datacontext.sessions.getData({ results: data.sessions }),
                    datacontext.persons.getFullPersonById(config.currentUserId,
                        {
                            success: function (person) {
                                config.currentUser(person);
                            }
                        }, true)
                )
            .done(function () {
                    //ACT
                    vmFavorites.activate(routeData, function () {
                        //ASSERT
                        ok(vmFavorites.sessions().length > 0, 'Favorites exist');
                    });
                })
                .always(function () {
                    start();
                });
            }
        );

        asyncTest('Filter viewmodel by Title',
            function () {
                //ARRANGE
                var vmFavorites = findVm(),
                    routeData = { date: '05-19-2013' };

                //store subscriptions in array
                var subscription;

                // Because we have a throttle, I can either remove it
                // or I can subscribe to the observable. 
                // This means we have to reshapre our test so it waits
                // for the throttle to kick in.
                //vmSpeakers.speakerFilter.searchText = ko.observable();

                var data = {
                    rooms: ko.observable(),
                    tracks: ko.observable(),
                    timeslots: ko.observable(),
                    attendance: ko.observable(),
                    persons: ko.observable(),
                    sessions: ko.observable()
                };

                $.when(
                    datacontext.rooms.getData({ results: data.rooms }),
                    datacontext.timeslots.getData({ results: data.timeslots }),
                    datacontext.tracks.getData({ results: data.tracks }),
                    datacontext.attendance.getData({ param: config.currentUserId, results: data.attendance }),
                    datacontext.persons.getSpeakers({ results: data.persons }),
                    datacontext.sessions.getData({ results: data.sessions }),
                    datacontext.persons.getFullPersonById(config.currentUserId,
                        {
                            success: function (person) {
                                config.currentUser(person);
                            }
                        }, true)
                )
            .done(function () {

                    //ACT
                    var performTest = function(val) {
                        vmFavorites.activate(routeData, function() {

                            var sessions = vmFavorites.sessions();

                            //ASSERT
                            var onlySPA = _.all(sessions, function(item) {
                                return item.title().indexOf('Single Page App') > -1;
                            });

                            ok(onlySPA, 'Filtered properly');

                            // RESET
                            subscription.dispose(); 

                            start();
                        });
                    };

                    subscription = vmFavorites.sessionFilter.searchText.subscribe(performTest);

                    vmFavorites.sessionFilter.searchText('Single Page App');

                });
            }
        );

    });