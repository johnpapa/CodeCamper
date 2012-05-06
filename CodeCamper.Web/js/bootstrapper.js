var my = my || {};

my.bootstrapper = (function() {
    var run = function() {
        my.sessionHttpService.init();
        my.routeService.register({ view: 'favorites', viewModel: my.favoritesVM});
        my.routeService.register({ view: 'speakers', viewModel: my.speakersVM });
        my.routeService.run('#/favorites');
    }
    return {
        run: run
    }
})()

$(function() {
    my.bootstrapper.run();
})