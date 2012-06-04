// Conventions
//	1) All Views must have their HTML element tags
//      include a CSS class named .view.
// 	2) Before registering routes with router,
//      the viewmodels should exist.
// ----------------------------------------------
define(['jquery', 'underscore','sammy', 'presenter','config', 'routeMediator'],
    function ($, _, Sammy, presenter, config, routeMediator) {
        var
            window = config.window,
            logger = config.logger,
            isRedirecting = false,

            sammy = new Sammy.Application(function () {
                if (Sammy.Title) {
                    this.use(Sammy.Title);
                    this.setTitle(config.title);
                }else {
                    logger.warning('Sammy.Title is not loaded.');
                }
                this.get('', function () {
                    this.app.runRoute('get', startupUrl);
                });
            }),

            startupUrl = '',

            register = function (options) {
                if (options.routes) {
                    _.each(options.routes, function (route) {
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

                sammy.get(route, function (context) {
                    //context is 'this'
                    callback(context.params);
                    $('.view').hide();
                    presenter.transitionTo($(view), context.path, group);
                    //context.$element().append('<h1>hello</h1>') //PAPA: for testing
                    this.title(title);
                });
            },

            navigateTo = function (url) {
                //window.location.href = url;
                sammy.setLocation(url); //TODO: test this
            },

            registerBeforeLeaving = function () {
                sammy.before(/.*/, function () {
                    // Can cancel the route if this returns false
                    var
                        context = this,
                        response = routeMediator.canLeave();
                    if (!isRedirecting && !response.val) {
                        isRedirecting = true;
                        logger.warning(response.message);
                        window.history.back();
                        //this.redirect('#/Sessions'); // Keep hash url the same in address bar
                    } else {
                        isRedirecting = false;
                    }
                    return response.val;
                });

            },

            run = function (url) {
                startupUrl = url
                registerBeforeLeaving();
                sammy.run();
                navigateTo(url);
            };

        return {
            navigateTo: navigateTo,
            register: register,
            run: run
        };
    });
