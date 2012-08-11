define(
    'vm-speakers-tests-function',
    ['jquery', 'underscore', 'ko', 'datacontext', 'config', 'filter.speakers', 'sort'],
    function ($, _, ko, datacontext, config, filter, sort) {
        
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
            return window.testFn(ko, _, datacontext, config, fakeRouter, fakeMessenger, filter, sort, fakeStore);
        };

        module('speakers viewmodel tests');

        asyncTest('Activate viewmodel and has speakers',
            function() {
                //ARRANGE
                var vmSpeakers = findVm(),
                    data = {
                        persons: ko.observable(),
                        sessions: ko.observable()
                    },
                    routeData = {};
                
                $.when(
                    datacontext.persons.getSpeakers({ results: data.persons }),
                    datacontext.sessions.getData({ results: data.sessions })
                )
                .pipe(datacontext.speakerSessions.refreshLocal)
                .done(function () {
                    //ACT
                    vmSpeakers.activate(routeData, function () {
                        //ASSERT
                        ok(vmSpeakers.speakers().length > 0, 'Speakers exist');
                    });
                })
                .always(function () {
                    start();
                });
            }
        );

        asyncTest('Filter viewmodel by Name',
            function () {
                //ARRANGE
                var vmSpeakers = findVm(),
                    data = {
                        persons: ko.observable(),
                        sessions: ko.observable()
                    },
                    routeData = {};

                //store subscriptions in array
                var subscription;

                // Because we have a throttle, I can either remove it
                // or I can subscribe to the observable. 
                // This means we have to reshapre our test so it waits
                // for the throttle to kick in.
                //vmSpeakers.speakerFilter.searchText = ko.observable();

                $.when(
                    datacontext.persons.getSpeakers({ results: data.persons }),
                    datacontext.sessions.getData({ results: data.sessions })
                )
                .pipe(datacontext.speakerSessions.refreshLocal)
                .done(function() {

                    //ACT
                    var performTest = function(val) {
                        vmSpeakers.activate(routeData, function() {

                            var speakers = vmSpeakers.speakers();

                            //ASSERT
                            var onlyJohn = _.all(speakers, function(item) {
                                return item.firstName() === 'John';
                            });

                            ok(onlyJohn, 'Filtered properly');

                            // RESET
                            subscription.dispose(); 

                            start();
                        });
                    };

                    subscription = vmSpeakers.speakerFilter.searchText.subscribe(performTest);

                    vmSpeakers.speakerFilter.searchText('John');

                });
            }
        );

    });