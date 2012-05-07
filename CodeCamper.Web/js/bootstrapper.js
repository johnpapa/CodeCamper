var my = my || {};

my.bootstrapper = (function() {
    var run = function() {
        my.sessionDataService.init();
        my.router.register({ view: 'favorites', viewModel: my.favoritesVM});
        my.router.register({ view: 'speakers', viewModel: my.speakersVM });
        my.router.run('#/favorites');
    }
    return {
        run: run
    }
})()

$(function() {
    my.bootstrapper.run();
})