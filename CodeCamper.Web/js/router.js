// Depends on 
//	Sammy.js
//  jQuery
//  presenter
//
// Conventions
//	1) All Views must have their HTML element tags 
//      include a CSS class named .view.
// 	2) Before registering routes with router, 
//      the viewmodels should exist.
// ----------------------------------------------
var my = my || {};
my.router = (function ($, Sammy, presenter) {
    var sammy = new Sammy.Application(),
        prevViewModel,
        register = function(options) {
            var 
                view = options.view,
                route = options.route,
                viewModel = options.viewModel,
                hash = route !== undefined ? (route.length ? '#/' + route : '#/') : '#/' + view,
                hashWildcard = new RegExp('#\\/' + view + '.*'),
                $element = $('#' + view)

            if (!viewModel) {
                throw Error('viewModel must be specified.')
            }

            if (viewModel) {
                ko.applyBindings(viewModel, $element.get(0))
            }

            sammy.before(hashWildcard, function () {
                $('.view').hide()
                //$element.show()
                presenter.transitionTo($element, hash)
            })

            sammy.get(hash, function () {
                if (prevViewModel && prevViewModel.deactivate) {
                    prevViewModel.deactivate();                   
                }
                if (viewModel.activate) {
                    viewModel.activate(this.params)
                }
                prevViewModel = viewModel // TODO: Do I even need prevViewModel ???
            })
        },
        run = function(startUrl) {
            sammy.run(startUrl)
        };
    return {
        register: register,
        run: run
    }
})(jQuery, Sammy, my.presenter)