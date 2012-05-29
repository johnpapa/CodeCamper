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
app.bootstrapper = (function ($, ko, toastr, router, vm, datacontext, config) {
     
    var
        bindViewModelsToViews = function () {
            ko.applyBindings(vm.session, $('#session').get(0));
            ko.applyBindings(vm.sessions, $('#sessions').get(0));
            ko.applyBindings(vm.favorites, $('#favorites').get(0));
            ko.applyBindings(vm.speakers, $('#speakers').get(0));
        },
        registerRoutes = function () {
            // Bind the views to the view models
            //TODO: Shorten these up with root route prefixes
            // Favorites routes
            router.register({
                routes:
                    [{ route: '#/favorites', title: 'Favorites', callback: vm.favorites.loadByDate, group: '.route-top' },
                    { route: '#/favorites/date/:date', title: 'Favorites', callback: vm.favorites.loadByDate, group: '.route-left' }],
                view: '#favorites'
            }); // Sessions routes
            router.register({
                routes:
                    [{ route: '#/sessions', title: 'Sessions', callback: vm.sessions.activate, group: '.route-top' }],
                    //{ route: '#/sessions/date/:date', callback: vm.sessions.loadByDate, group: '.route-left' },
                    //{ route: '#/sessions/track/:track', callback: vm.sessions.loadByTrack, group: '.route-left' },
                view: '#sessions'
            }); // Session details routes
            router.register({ route: '#/sessions/:id', title: 'Session', callback: vm.session.activate, view: '#session', group: '.route-left' }); // Speakers list routes
            router.register({ route: '#/speakers', title: 'Speakers', callback: vm.speakers.activate, view: '#speakers', group: '.route-top' }); //// Speaker details routes
            //router.register({ route: '#/speakers/:id', callback: vm.speaker.activate, view: '#speaker', group: '.route-left' })
            
            // Catch invalid routes
            router.register({ route: /.*/, title: '', callback: function () { toastr.error('invalid route'); }, view: '' });
            router.run('#/favorites');
        },
        run = function () {
            // Set up the dataservice for "how it is going to roll" ... Ward Bell
            config.dataserviceInit(); // prime the data services and eager load the lookups
            $.when(datacontext.rooms.getData(),
                datacontext.timeslots.getData(),
                datacontext.tracks.getData(),
                datacontext.attendance.getData({param: app.currentUser().id()}),
                datacontext.speakers.getData(),
                datacontext.sessions.getData()
                )
                //.pipe(dataprimer.fetchSessionBriefs())
                .done(bindViewModelsToViews)
                .done(registerRoutes);
        };
    return {
        run: run
    };
})(jQuery, ko, toastr, app.router, app.vm, app.datacontext, app.config);

$(function() {
    //TODO: hard coded the user
    app.currentUser = ko.observable({ id: ko.observable(1) });
    app.bootstrapper.run();
});