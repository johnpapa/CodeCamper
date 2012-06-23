define(['jquery', 'ko', 'toastr', 'config', 'router', 'model', 'datacontext', 'vm'],
    function ($, ko, toastr, config, router, model, datacontext, vm) {
        var
            logger = config.logger,
            
            bindViewModelsToViews = function () {
                ko.applyBindings(vm.shell, getView(config.viewIds.shellTop));
                ko.applyBindings(vm.favorites, getView(config.viewIds.favorites));
                ko.applyBindings(vm.session, getView(config.viewIds.session));
                ko.applyBindings(vm.sessions, getView(config.viewIds.sessions));
                ko.applyBindings(vm.speaker, getView(config.viewIds.speaker));
                ko.applyBindings(vm.speakers, getView(config.viewIds.speakers));
            },
            
            getView = function (viewName) {
                return $(viewName).get(0);
            },

            registerRoutes = function () {

                // Favorites routes
                router.register({
                    routes:[
                        { isDefault: true, route: config.hashes.favorites, title: 'Favorites', callback: vm.favorites.activate, group: '.route-top' },
                        { route: config.hashes.favoritesByDate + '/:date', title: 'Favorites', callback: vm.favorites.activate, group: '.route-left' }
                    ],
                    view: config.viewIds.favorites
                });

                // Sessions routes
                router.register({
                    routes:
                        [{ route: config.hashes.sessions, title: 'Sessions', callback: vm.sessions.activate, group: '.route-top' }],
                    view: config.viewIds.sessions
                });
                // Session details routes
                router.register({ route: config.hashes.sessions + '/:id', title: 'Session', callback: vm.session.activate, view: config.viewIds.session, group: '.route-left' });

                // Speaker and speaker details routes
                router.register({ route: config.hashes.speakers, title: 'Speakers', callback: vm.speakers.activate, view: config.viewIds.speakers, group: '.route-top' });
                router.register({ route: config.hashes.speakers + '/:id', title: 'Speaker', callback: vm.speaker.activate, view: config.viewIds.speaker });

                // Catch invalid routes
                router.register({ route: /.*/, title: '', callback: function () { toastr.error('invalid route'); }, view: '' });

                // Crank up the router
                router.run();
            },
            
            run = function () {
                var currentUserId = config.currentUserId;

                $('#busyindicator').activity(true);

                //PAPA: Set up the dataservice for "how it is going to roll" ... Ward Bell
                config.dataserviceInit(); // prime the data services and eager load the lookups
                
                // TODO: TESTING 
                // We don't actually use this data, 
                // we just get it so we can see that something was fetched.
                var data = {
                    rooms: ko.observable(),
                    tracks: ko.observable(),
                    timeslots: ko.observable(),
                    attendance: ko.observable(),
                    persons: ko.observable(),
                    sessions: ko.observable()
                };
                // TODO: END TESTING 

                $.when(datacontext.rooms.getData({results: data.rooms}),
                    datacontext.timeslots.getData({ results: data.timeslots }),
                    datacontext.tracks.getData({ results: data.tracks }),
                    datacontext.attendance.getData({ param: currentUserId, results: data.attendance }),
                    datacontext.persons.getSpeakers({ results: data.persons }),
                    datacontext.sessions.getData({ results: data.sessions }),
                    datacontext.persons.getFullPersonById(currentUserId,
                        {
                            success: function (person) {
                                config.currentUser(person);
                            }
                        }, true)
                    )

                    .pipe(function () {
                        // Need sessions and speakers in cache before we can make speakerSessions
                        datacontext.speakerSessions.refreshLocal();

                        //TODO: Testing only
                        //if (config.currentUser().id() === 0) debugger;
                        //var ss = datacontext.speakerSessions;
                        //var speakers = ko.observableArray();
                        //ss.getLocalSpeakers(speakers);
                        //console.log(speakers());
                        //console.log(ss.getLocalSessionsBySpeakerId(3));

                    })

                    // TODO: TESTING 
                    .done(function () {
                        logger.success('Fetched data for: '
                            + '<div>' + data.rooms().length + ' rooms </div>'
                            + '<div>' + data.tracks().length + ' rooms </div>'
                            + '<div>' + data.timeslots().length + ' timeslots </div>'
                            + '<div>' + data.attendance().length + ' attendance </div>'
                            + '<div>' + data.persons().length + ' persons </div>'
                            + '<div>' + data.sessions().length + ' sessions </div>'
                            + '<div>' + (config.currentUser().isNullo ? 0 : 1) + ' user profile </div>'
                            );
                    })
                    // TODO: END TESTING 

                    .done(bindViewModelsToViews)
                    .done(registerRoutes)
                    .always(function () {
                        $('#busyindicator').activity(false);
                    });
            };

        return {
            run: run
        };
    });
