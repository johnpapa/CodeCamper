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

my.router = (function ($, sammy, presenter) {
    var
        register = function (options) {
            if (options.routes) {
                options.routes.forEach(function (route) {
                    registerRoute(route.route, route.callback, options.view)
                })
                return
            }

            registerRoute(options.route, options.callback, options.view)
        },
        registerRoute = function (route, callback, view) {
            if (!callback) {
                throw Error('callback must be specified.')
            }
            //var hash = new RegExp('#\\/' + route + '.*')
            //var hash = new RegExp('\\^' + route + '$.*')

            sammy.get(route, function (context) {
                //context is this
                callback(context.params)
                $('body > section').hide()
                //$('.view').hide()
                presenter.transitionTo($(view), context.path)
                //context.$element().append('<h1>hello</h1>') //TODO: for testing
            })
        },
        run = function(startUrl) {
            sammy.run(startUrl)
        };
    return {
        register: register,
        run: run
    }
})(jQuery, new Sammy.Application(), my.presenter)