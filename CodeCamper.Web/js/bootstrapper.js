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
            ko.applyBindings(vm.session, $('#session').get(0))
            ko.applyBindings(vm.sessions, $('#sessions').get(0))
            ko.applyBindings(vm.favorites, $('#favorites').get(0))
            ko.applyBindings(vm.speakers, $('#speakers').get(0))
            //toastr.info('bootstrapper: ViewModels have been bound to Views ') //TODO: remove
        },
        registerRoutes = function () {
            // Bind the views to the view models
            //TODO: Shorten these up with root route prefixes
            // Favorites routes
            router.register({
                routes:
                    [{ route: '#/favorites', callback: vm.favorites.activate, group: '.route-top' },
                    { route: '#/favorites/date/:date', callback: vm.favorites.loadByDate, group: '.route-left' }],
                view: '#favorites'
            })
            // Sessions routes
            router.register({
                routes:
                    [{ route: '#/sessions', callback: vm.sessions.activate, group: '.route-top' },
                    { route: '#/sessions/date/:date', callback: vm.sessions.loadByDate, group: '.route-left' },
                    { route: '#/sessions/track/:track', callback: vm.sessions.loadByTrack, group: '.route-left' }],
                view: '#sessions'
            })
            // Session details routes
            router.register({ route: '#/sessions/:id', callback: vm.sessions.activate, view: '#session', group: '.route-left' })

            // Speakers list routes
            router.register({ route: '#/speakers', callback: vm.speakers.activate, view: '#speakers', group: '.route-top' })

            // Catch invalid routes
            router.register({ route: /.*/, callback: function () { toastr.error('invalid route') }, view: '' })

            router.run('#/favorites')
            //toastr.info('bootstrapper: routes have been registered ') //TODO: remove
        },
        run = function () {
            toastr.options.timeOut = 2000 //TODO: Just for testing

            // Set up the dataservice for "how it is going to roll" ... Ward Bell
            config.dataserviceInit()
            // prime the data services and eager load the lookups
            $.when(datacontext.rooms.getData(),
                datacontext.timeslots.getData(),
                datacontext.tracks.getData(),
                datacontext.speakers.getData(),
                datacontext.sessions.getData(),
                datacontext.attendance.getData({param: app.currentUser().id()})
                )
                //.pipe(dataprimer.fetchSessionBriefs())
                //.then(function(){toastr.info('hi')})
                .then(bindViewModelsToViews)
                .then(registerRoutes)
        }
    return {
        run: run
    }
})(jQuery, ko, toastr, app.router, app.vm, app.datacontext, app.config)

$(function() {
    //TODO: hard coded the user
    app.currentUser = ko.observable({ id: ko.observable(1) });
    app.bootstrapper.run();
})