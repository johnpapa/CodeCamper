define('route-config',
    ['config', 'router', 'vm', 'store'],
    function (config, router, vm, store) {
        var
            logger = config.logger,
            
            register = function() {

                var routeData = [
                    // Favorites routes
                    {
                        routes: [
                            {
                                isDefault: true,
                                route: config.hashes.favorites,
                                title: 'Favorites',
                                callback: vm.favorites.activate,
                                group: '.route-top'
                            },
                            {
                                route: config.hashes.favoritesByDate + '/:date',
                                title: 'Favorites',
                                callback: vm.favorites.activate,
                                group: '.route-left'
                            }
                        ],
                        view: config.viewIds.favorites
                    },
                    // Sessions routes
                    {
                        routes:
                            [{
                                route: config.hashes.sessions,
                                title: 'Sessions',
                                callback: vm.sessions.activate,
                                group: '.route-top'
                            }],
                        view: config.viewIds.sessions
                    },
                    // Session details routes
                    {
                        route: config.hashes.sessions + '/:id',
                        title: 'Session',
                        callback: vm.session.activate,
                        view: config.viewIds.session,
                        group: '.route-left'
                    },
                    // Speaker and speaker details routes
                    {
                        route: config.hashes.speakers,
                        title: 'Speakers',
                        callback: vm.speakers.activate,
                        view: config.viewIds.speakers,
                        group: '.route-top'
                    },
                    {
                        route: config.hashes.speakers + '/:id',
                        title: 'Speaker',
                        callback: vm.speaker.activate,
                        view: config.viewIds.speaker
                    },
                    // Catch invalid routes
                    {
                        route: /.*/,
                        title: '',
                        callback: function() {
                            logger.error(config.toasts.invalidRoute);
                        },
                        view: ''
                    }
                ];

                for (var i = 0; i < routeData.length; i++) {
                    router.register(routeData[i]);
                }

                var tombstoneView = store.fetch(config.stateKeys.lastView);

                //logger.info('Reloading tombstoned route: ' + tombstoneView); //TODO: for testing
                // Crank up the router
                router.run(tombstoneView || null);
            };
            

        return {
            register: register
        };
    });