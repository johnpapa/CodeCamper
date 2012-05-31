// Depends on
//  jQuery
//  knockout
//  toastr
//	router
//  vm (view models)
//  viewmodels
//  datacontext
//
// Conventions
//	1) dataservices must be initialized via config
//  2) viewmodels must be married to views
//	3) routes must be registered with router
//  4) datacontext must be primed
// ----------------------------------------------
define(['jquery', 'ko', 'toastr', 'config', 'router', 'vm', 'model', 'datacontext'],
    function ($, ko, toastr, config, router, vm, model, datacontext) {

        // all models use the one datacontext
        // avoids circular reference between model & datacontext
        model.datacontext(datacontext);

        var bindViewModelsToViews = function () {
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
                        [{ route: '#/favorites', title: 'Favorites', callback: vm.favorites.loadByDate, group: '.route-top' },
                            { route: '#/favorites/date/:date', title: 'Favorites', callback: vm.favorites.loadByDate, group: '.route-left' }],
                    view: '#favorites'
                });
                // Sessions routes
                router.register({
                    routes:
                        [{ route: '#/sessions', title: 'Sessions', callback: vm.sessions.activate, group: '.route-top' }],
                    //{ route: '#/sessions/date/:date', callback: vm.sessions.loadByDate, group: '.route-left' },
                    //{ route: '#/sessions/track/:track', callback: vm.sessions.loadByTrack, group: '.route-left' },
                    view: '#sessions'
                });
                // Session details routes
                router.register({ route: '#/sessions/:id', title: 'Session', callback: vm.session.activate, view: '#session', group: '.route-left' }); // Speakers list routes
                router.register({ route: '#/speakers', title: 'Speakers', callback: vm.speakers.refresh, view: '#speakers', group: '.route-top' }); //// Speaker details routes
                //router.register({ route: '#/speakers/:id', callback: vm.speaker.activate, view: '#speaker', group: '.route-left' })

                // Catch invalid routes
                router.register({ route: /.*/, title: '', callback: function () { toastr.error('invalid route'); }, view: '' });
                router.run('#/favorites');
            },
            run = function () {

                //PAPA: hard coded the user
                config.currentUser = ko.observable({ id: ko.observable(1) });

                $('#busyindicator').activity(true);

                //PAPA: Set up the dataservice for "how it is going to roll" ... Ward Bell
                config.dataserviceInit(); // prime the data services and eager load the lookups
                $.when(datacontext.rooms.getData(),
                    datacontext.timeslots.getData(),
                    datacontext.tracks.getData(),
                    datacontext.attendance.getData({ param: config.currentUser().id() }),
                    datacontext.persons.getData(), // PAPA: this just gets speakers, by default
                    datacontext.sessions.getData(), //TODO: get ME, too ... current user
                    datacontext.sessionSpeakers.getData()
                )
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
