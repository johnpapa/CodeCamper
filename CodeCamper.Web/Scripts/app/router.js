// Conventions
//	1) All Views must have their HTML element tags
//      include a CSS class named .view.
// ----------------------------------------------
define('router',
    ['jquery', 'underscore', 'sammy', 'presenter', 'config', 'route-mediator', 'store'],
    function ($, _, Sammy, presenter, config, routeMediator, store) {
        var
            currentHash = '',
            window = config.window,
            logger = config.logger,
            isRedirecting = false,
            defaultRoute = '',
            startupUrl = '',

            sammy = new Sammy.Application(function () {
                if (Sammy.Title) {
                    this.use(Sammy.Title);
                    this.setTitle(config.title);
                }

                this.get('', function () {
                    this.app.runRoute('get', startupUrl);
                });
            }),

            register = function (options) {
                if (options.routes) {
                    _.each(options.routes, function (route) {
                        registerRoute({
                            route: route.route,
                            title: route.title,
                            callback: route.callback,
                            view: options.view,
                            group: route.group,
                            isDefault: !!route.isDefault
                        });
                    });
                    return;
                }

                registerRoute(options);
            },

            registerRoute = function (options) {
                var route = options.route,
                    title = options.title,
                    callback = options.callback,
                    view = options.view,
                    group = options.group,
                    isDefault = options.isDefault;

                if (!callback) {
                    throw Error('callback must be specified.');
                }

                if (isDefault) {
                    defaultRoute = route;
                }

                //var hash = new RegExp('#\\/' + route + '.*')
                //var hash = new RegExp('\\^' + route + '$.*')

                sammy.get(route, function (context) {
                    store.save(config.stateKeys.lastView, context.path);
                    //context is 'this'
                    callback(context.params);
                    $('.view').hide(); // Hide all views
                    presenter.transitionTo($(view), context.path, group);
                    //context.$element().append('<h1>hello</h1>') //PAPA: for testing
                    if (this.title) {
                        this.title(title);
                    }
                });
            },

            navigateTo = function (url) {
                //window.location.href = url;
                sammy.setLocation(url);
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
                        // Keep hash url the same in address bar
                        context.app.setLocation(currentHash);
                    }
                    else {
                        isRedirecting = false;
                        currentHash = context.app.getLocation();
                    }
                    return response.val;
                });
            },

            navigateBack = function () {
                window.history.back();
            },

            run = function (url) {
                // 1) if i browse to a location, use it
                // 2) otherwise, use the url i pass in
                // 3) otherwise use the default route
                startupUrl = sammy.getLocation() || url || defaultRoute;
                
                if (!startupUrl) {
                    logger.error('No route was indicated.');
                    return;
                }
                sammy.run();
                registerBeforeLeaving();
                navigateTo(startupUrl);
           };

        return {
            navigateBack: navigateBack,
            navigateTo: navigateTo,
            register: register,
            run: run
        };
    });