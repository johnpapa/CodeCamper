// Depends on
//	router
//  dataservice
//
// Conventions
//	1) All routes must be registered with router
//	2) All dataservices must be initialized
// ----------------------------------------------
var my = my || {};

my.bootstrapper = (function (ko, router, dataservice, vm) {
    var run = function() {
        dataservice.session.init();
        router.register({ view: 'favorites', viewModel: vm.favorites });
        router.register({ view: 'sessions', viewModel: vm.sessions});
        router.register({ view: 'speakers', viewModel: vm.speakers });
        router.run('#/favorites');
    }
    return {
        run: run
    }
})(ko, my.router, my.dataservice, my.vm)

$(function() {
    my.bootstrapper.run();
})