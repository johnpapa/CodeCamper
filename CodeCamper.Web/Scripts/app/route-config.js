define('route-config',
    ['config', 'router', 'vm'],
    function (config, router, vm) {
        var
            logger = config.logger,
            
            register = function() {

                var routeData = [

                    // Favorites routes
                    {
                        view: config.viewIds.favorites,
                        routes: [
                            {
                                isDefault: true,
                                route: config.hashes.favorites,
                                title: 'Favorites',
                                callback: vm.favorites.activate,
                                group: '.route-top'
                            },{
                                route: config.hashes.favoritesByDate + '/:date',
                                title: 'Favorites',
                                callback: vm.favorites.activate,
                                group: '.route-left'
                            }
                        ]
                    },

                    // Sessions routes
                    {
                        view: config.viewIds.sessions,
                        routes:
                            [{
                                route: config.hashes.sessions,
                                title: 'Sessions',
                                callback: vm.sessions.activate,
                                group: '.route-top'
                            }]
                    },

                    // Session details routes
                    {
                        view: config.viewIds.session,
                        route: config.hashes.sessions + '/:id',
                        title: 'Session',
                        callback: vm.session.activate,
                        group: '.route-left'
                    },

                    // Speaker and speaker details routes
                    {
                        view: config.viewIds.speakers,
                        route: config.hashes.speakers,
                        title: 'Speakers',
                        callback: vm.speakers.activate,
                        group: '.route-top'
                    },{
                        view: config.viewIds.speaker,
                        route: config.hashes.speakers + '/:id',
                        title: 'Speaker',
                        callback: vm.speaker.activate
                    },

                    // Invalid routes
                    {
                        view: '',
                        route: /.*/,
                        title: '',
                        callback: function() {
                            logger.error(config.toasts.invalidRoute);
                        }
                    }
                ];

                for (var i = 0; i < routeData.length; i++) {
                    router.register(routeData[i]);
                }

                // Crank up the router
                router.run();
            };
            

        return {
            register: register
        };
    });