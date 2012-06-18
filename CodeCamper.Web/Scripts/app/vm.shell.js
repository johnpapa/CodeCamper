define(['ko', 'datacontext', 'config'],
    function (ko, datacontext, config) {

        var
            logger = config.logger,

            //currentUser = ko.observable(),
            currentUser = config.currentUser,

            activate = function (routeData) {
                //getUser(routeData.id);
                //getUser();
            },
            
            getUser = function (completeCallback, currentUserId, forceRefresh) {
                var
                    callback = completeCallback || function () { };

                datacontext.persons.getFullPersonById(
                        currentUserId, {
                            success: function (user) {
                                currentUser(user);
                                callback();
                            },
                            error: function () {
                                callback();
                            }
                        },
                    forceRefresh
                    );
            },

            init = function () {
            };

        // Initialization
        init();

        return {
            currentUser: currentUser
        };
    });