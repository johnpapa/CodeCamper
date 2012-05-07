// Depends on 
//	Sammy.js
//
// Conventions
//	All Views must implement css class .view
// 	Before registering routes, viewmodels must exist
// ----------------------------------------------
my.routeService = (function(Sammy) {
    var sammy = new Sammy.Application(),
        register = function(options) {
            var 
                view = options.view,
                route = options.route,
                viewModel = options.viewModel,
                hash = route !== undefined ? (route.length ? '#/' + route : '#/') : '#/' + view,
                hashWildcard = new RegExp('#\\/' + view + '.*'),
                $element = $('#' + view)

            if (viewModel) {
                ko.applyBindings(viewModel, $element.get(0))
            }

            sammy.before(hashWildcard, function() {
                $('.view').hide()
                $element.show()
            })

            sammy.get(hash, function() {
                if (viewModel.activate)
                    viewModel.activate(this.params)
            })
        },
        run = function(startUrl) {
            sammy.run(startUrl)
        };
    return {
        register: register,
        run: run
    }
})(Sammy)