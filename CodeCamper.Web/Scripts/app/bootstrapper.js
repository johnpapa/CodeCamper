define(['jquery', 'ko', 'toastr', 'config', 'router', 'vm', 'model', 'datacontext'],
    function ($, ko, toastr, config, router, vm, model, datacontext) {

        // all models use the one datacontext
        // avoids circular reference between model & datacontext
        model.datacontext(datacontext);

        var
            logger = config.logger,
            
            bindViewModelsToViews = function () {
                ko.applyBindings(vm.session, $('#session').get(0));
                ko.applyBindings(vm.sessions, $('#sessions').get(0));
                ko.applyBindings(vm.favorites, $('#favorites').get(0));
                ko.applyBindings(vm.speakers, $('#speakers').get(0));
            },

            registerRoutes = function () {
                // Bind the views to the view models
                // Favorites routes
                router.register({
                    routes:
                        [
                            { isDefault: true, route: '#/favorites', title: 'Favorites', callback: vm.favorites.activate, group: '.route-top' },
                            { route: '#/favorites/date/:date', title: 'Favorites', callback: vm.favorites.activate, group: '.route-left' }],
                    view: '#favorites'
                });
                // Sessions routes
                router.register({
                    routes:
                        [{ route: '#/sessions', title: 'Sessions', callback: vm.sessions.activate, group: '.route-top' }],
                    view: '#sessions'
                });
                // Session details routes
                router.register({ route: '#/sessions/:id', title: 'Session', callback: vm.session.activate, view: '#session', group: '.route-left' }); // Speakers list routes
                router.register({ route: '#/speakers', title: 'Speakers', callback: vm.speakers.activate, view: '#speakers', group: '.route-top' }); //// Speaker details routes
                //router.register({ route: '#/speakers/:id', callback: vm.speaker.activate, view: '#speaker', group: '.route-left' })

                // Catch invalid routes
                router.register({ route: /.*/, title: '', callback: function () { toastr.error('invalid route'); }, view: '' });
                //router.run('#/favorites');
                router.run();
            },
            
            run = function () {

                //PAPA: hard coded the user
                config.currentUser = ko.observable({ id: ko.observable(1) });
                var userId = config.currentUser().id();

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
                    sessions: ko.observable(),
                    user: ko.observable()
                };
                // TODO: END TESTING 

                $.when(datacontext.rooms.getData({results: data.rooms}),
                    datacontext.timeslots.getData({ results: data.timeslots }),
                    datacontext.tracks.getData({ results: data.tracks }),
                    datacontext.attendance.getData({ param: userId, results: data.attendance }),
                    datacontext.persons.getData({ results: data.persons }), // TODO: this currently just gets speakers. need to refactor in DC
                    datacontext.sessions.getData({ results: data.sessions }),
                    datacontext.persons.getFullPersonById(userId, { success: function (person) { data.user(person); }})
                    )
                    .pipe(function () {
                        // Need sessions first
                        datacontext.sessionSpeakers.getData();
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
                            + '<div>' + (data.user() ? 1 : 0) + ' current user profile </div>'
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
