// Depends on
//  jQuery
//  knockout
//  toastr
//	router
//  vm (view models)
//  viewmodels
//  dataPrimer
//
// Conventions
//	1) dataservices must be initialized via dataPrimer
//  2) viewmodels must be married to views
//	3) routes must be registered with router
// ----------------------------------------------
var my = my || {};

my.bootstrapper = (function ($, ko, toastr, router, vm, dataprimer, config) {
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
                    { route: '#/favorites/date/:date', callback: vm.favorites.loadByDate, group: '.route-left' },
                    { route: '#/favorites/track/:track', callback: vm.favorites.loadByTrack, group: '.route-left' }],
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
            $.when(dataprimer.fetchlookups(),
                dataprimer.fetchSpeakers(),
                dataprimer.fetchSessionBriefs()
                )
                //.pipe(dataprimer.fetchSessionBriefs())
                //.then(function(){toastr.info('hi')})
                .then(bindViewModelsToViews)
                .then(registerRoutes)
        }
    return {
        run: run
    }
})(jQuery, ko, toastr, my.router, my.vm, my.dataprimer, my.config)

$(function() {
    my.bootstrapper.run();
})