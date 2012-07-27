define(
    'vm-speakers-tests-function',
    ['jquery', 'ko', 'datacontext', 'config', 'filter', 'sort'],
    function ($, ko, datacontext, config, filter, sort) {
        
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
            fetch: doNothing,
            save: doNothing
        };

        var findVm = function() {
            return window.testFn(ko, datacontext, config, fakeRouter, fakeMessenger, filter, sort, fakeStore);
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

    });