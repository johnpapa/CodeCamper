define(
    'vm-sessions-tests-function',
    ['jquery', 'underscore', 'ko', 'datacontext', 'router', 'filter.sessions', 'sort', 'utils', 'config', 'event.delegates'],
    function ($, _, ko, datacontext, router, filter, sort, utils, config, eventDelegates) {

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
            return window.testFn($, _, ko, datacontext, fakeRouter, filter, sort, eventDelegates, utils, fakeMessenger, config, fakeStore);
            };

        module('Sessions viewmodel tests');

        asyncTest('Activate viewmodel and has sessions',
            function() {
                //ARRANGE
                var vmSessions = findVm(),
                    routeData = { };

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
                    vmSessions.activate(routeData, function () {
                        //ASSERT
                        ok(vmSessions.sessions().length > 0, 'Sessions exist');
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
                var vmSessions = findVm(),
                    routeData = { };

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
                        vmSessions.activate(routeData, function() {

                            var sessions = vmSessions.sessions();

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

                    subscription = vmSessions.sessionFilter.searchText.subscribe(performTest);

                    vmSessions.sessionFilter.searchText('Single Page App');

                });
            }
        );

    });