// Depends on
//	router
//  dataservice
//
// Conventions
//	1) All routes must be registered with router
//	2) All dataservices must be initialized
// ----------------------------------------------
var my = my || {};

my.bootstrapper = (function (ko, router, presenter, dataservice, vm) {
    var run = function () {

        toastr.options.timeOut = 2000 //TODO: Just for testing

        dataservice.session.init()

        ko.applyBindings(vm.session, $('#session').get(0))
        ko.applyBindings(vm.sessions, $('#sessions').get(0))
        ko.applyBindings(vm.favorites, $('#favorites').get(0))
        ko.applyBindings(vm.speakers, $('#speakers').get(0))

        //router.register({ route: /^#\/favorites/, callback: vm.favorites.activate, view: '#favorites' })
        //router.register({
        //    routes:
        //        [{ route: /^#\/sessions/, callback: vm.sessions.activate },
        //        { route: /^#\/sessions\/\:date/, callback: vm.sessions.loadByDate },
        //        { route: /^#\/sessions\/\:track/, callback: vm.sessions.loadByTrack }],
        //    view: '#sessions'
        //})
        //router.register({ route: /^#\/session\/:id/, callback: vm.sessions.activate, view: '#session' })
        //router.register({ route: /^#\/speakers/, callback: vm.speakers.activate, view: '#speakers' })

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
        //TODO: clean this up
        router.register({ route: /.*/, callback: function (){toastr.error('invalid route')}, view: '' })

        router.run('#/favorites')
    }
    return {
        run: run
    }
})(ko, my.router, my.presenter, my.dataservice, my.vm)

$(function() {
    my.bootstrapper.run();
})