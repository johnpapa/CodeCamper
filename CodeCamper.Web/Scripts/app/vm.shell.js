define(['ko', 'underscore', 'datacontext', 'config'],
    function (ko, _, datacontext, config) {

        var
            currentUser = config.currentUser,

            demoUsers = ko.observableArray([]),

            activate = function () {
                //_.each(config.demoUserIds, function (id) {
                //    demoUsers.push(datacontext.persons.getLocalById(id));
                //});
            },
            
            init = function () {
                activate();
            };

        // Initialization
        init();

        return {
            currentUser: currentUser,
            demoUsers: demoUsers,
            activate: activate
        };
    });