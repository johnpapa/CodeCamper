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
var app = app || {};

app.router = (function ($, sammy, presenter) {
    var
        register = function (options) {
            if (options.routes) {
                //options.routes.forEach(function (route) {
                _.each(options.routes, function (route) {
                    registerRoute(route.route, route.callback, options.view, route.group)
                })
                return
            }

            registerRoute(options.route, options.callback, options.view, options.group)
        },
        registerRoute = function (route, callback, view, group) {
            if (!callback) {
                throw Error('callback must be specified.')
            }
            //var hash = new RegExp('#\\/' + route + '.*')
            //var hash = new RegExp('\\^' + route + '$.*')

            sammy.get(route, function (context) {
                //context is 'this'
                callback(context.params)
                //$('body > section').hide()
                $('.view').hide()
                presenter.transitionTo($(view), context.path, group)
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
})(jQuery, new Sammy.Application(), app.presenter)