define(['ko', 'underscore', 'datacontext', 'config', 'model'],
    function (ko, _, datacontext, config, model) {

        var
            logger = config.logger,

            currentUser = config.currentUser,

            demoUsers = ko.observableArray([]),

            activate = function () {
                _.each(config.demoUserIds, function (id) {
                    demoUsers.push(datacontext.persons.getLocalById(id));
                });
            },
            
            init = function () {
            };

        // Initialization
        init();

        return {
            currentUser: currentUser,
            demoUsers: demoUsers,
            activate: activate
        };
    });