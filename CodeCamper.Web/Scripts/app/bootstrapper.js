define('bootstrapper',
    ['jquery', 'config', 'route-config', 'presenter', 'dataprimer', 'binder'],
    function ($, config, routeConfig, presenter, dataprimer, binder) {
        var
            run = function () {
                presenter.toggleActivity(true);

                //PAPA: Set up the dataservice for "how it is going to roll" ... Ward Bell
                config.dataserviceInit(); // prime the data services and eager load the lookups
                
                $.when(dataprimer.fetch())
                .done(binder.bind)
                .done(routeConfig.register)
                .always(function () {
                    presenter.toggleActivity(false);
                });
            };

        return {
            run: run
        };
    });