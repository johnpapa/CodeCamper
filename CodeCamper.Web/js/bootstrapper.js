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

        //router.register({ route: '#/favorites', callback: vm.favorites.activate })
        //router.register({ route: '#/sessions', callback: vm.sessions.activate })
        //router.register({ route: '#/sessions/:date', callback: vm.sessions.loadByDate })
        //router.register({ route: '#/sessions/:id', callback: vm.session.activate })
        //router.register({ route: '#/speakers', callback: vm.speakers.activate })

        //presenter.register({ route: '#/favorites', view: '#favorites' })
        //presenter.register({ routes: ['#/sessions', '#/sessions/:date'], view: '#sessions' })
        //presenter.register({ route: '#/sessions/:id', view: '#session' })
        //presenter.register({ route: '#/speakers', view: '#speakers' })

        router.register({ route: '#/favorites', callback: vm.favorites.activate, view: '#favorites' })
        router.register({
            routes:
                [{ route: '#/sessions', callback: vm.sessions.activate },
                { route: '#/sessions/:date', callback: vm.sessions.loadByDate }],
            view: '#sessions'
        })
        router.register({ route: '#/session/:id', callback: vm.sessions.activate, view: '#session' })
        router.register({ route: '#/speakers', callback: vm.speakers.activate, view: '#speakers' })

        router.run('#/favorites')
    }
    return {
        run: run
    }
})(ko, my.router, my.presenter, my.dataservice, my.vm)

$(function() {
    my.bootstrapper.run();
})