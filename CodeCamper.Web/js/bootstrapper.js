// Depends on
//  jQuery
//  knockout
//  toastr
//	router
//  viewmodels
//  dataPrimer
//
// Conventions
//	1) dataservices must be initialized via dataPrimer
//  2) viewmodels must be married to views
//	3) routes must be registered with router
// ----------------------------------------------
var my = my || {};

my.bootstrapper = (function ($, ko, toastr, router, vm, dataprimer) {
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
            router.register({
                routes:
                    [{ route: '#/favorites', callback: vm.favorites.activate },
                    { route: '#/favorites/date/:date', callback: vm.favorites.loadByDate },
                    { route: '#/favorites/track/:track', callback: vm.favorites.loadByTrack }],
                view: '#favorites'
            })
            router.register({
                routes:
                    [{ route: '#/sessions', callback: vm.sessions.activate },
                    { route: '#/sessions/date/:date', callback: vm.sessions.loadByDate },
                    { route: '#/sessions/track/:track', callback: vm.sessions.loadByTrack }],
                view: '#sessions'
            })
            router.register({ route: '#/sessions/:id', callback: vm.sessions.activate, view: '#session' })

            router.register({ route: '#/speakers', callback: vm.speakers.activate, view: '#speakers' })

            // Catch invalid routes
            router.register({ route: /.*/, callback: function () { toastr.error('invalid route') }, view: '' })

            router.run('#/favorites')
            //toastr.info('bootstrapper: routes have been registered ') //TODO: remove
        },
        run = function () {
            toastr.options.timeOut = 2000 //TODO: Just for testing

            // prime the data services and eager load the lookups
            dataprimer.init()
            $.when(dataprimer.fetchlookups())
                //.then(function(){toastr.info('hi')})
                .then(bindViewModelsToViews)
                .then(registerRoutes)
            //dataprimer.fetchlookups()
            //bindViewModelsToViews()
            //registerRoutes()
        }
    return {
        run: run
    }
})(jQuery, ko, toastr, my.router, my.vm, my.dataprimer)

$(function() {
    my.bootstrapper.run();
})