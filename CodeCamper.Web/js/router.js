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
app.router = (function (window, $, Sammy, presenter) {
    var
        sammy = new Sammy.Application(function () {
            this.use(Sammy.Title);
            this.setTitle('CodeCamper > ');
            this.get('', function () {
                this.app.runRoute('get', startupUrl);
            });
        }),
        
        startupUrl = '',
        
        register = function (options) {
            if (options.routes) {
                //options.routes.forEach(function (route) {
                _.each(options.routes, function(route) {
                    registerRoute(route.route, route.title, route.callback, options.view, route.group);
                });
                return;
            }

            registerRoute(options.route, options.title, options.callback, options.view, options.group);
        },

        registerRoute = function (route, title, callback, view, group) {
            if (!callback) {
                throw Error('callback must be specified.');
            }
            //var hash = new RegExp('#\\/' + route + '.*')
            //var hash = new RegExp('\\^' + route + '$.*')

            sammy.get(route, function(context) {
                //context is 'this'
                callback(context.params); 
                $('.view').hide();
                presenter.transitionTo($(view), context.path, group); //context.$element().append('<h1>hello</h1>') //PAPA: for testing
                this.title(title);
            });
        },

        navigateTo = function (url) {
            window.location.href = url;
        },
        
        run = function (url) {
            startupUrl = url;
            sammy.run();
            navigateTo(url);
        };

        // Initialize
        //sammy.get('', function () {
        //    this.app.runRoute('get', startupUrl);
        //});
    
    return {
        navigateTo: navigateTo,
        register: register,
        run: run
    };
//})(window, jQuery, new Sammy.Application(), app.presenter)
})(window, jQuery, Sammy, app.presenter)
