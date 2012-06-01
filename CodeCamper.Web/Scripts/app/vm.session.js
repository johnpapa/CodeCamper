define(['ko', 'datacontext', 'config'],
    function (ko, datacontext, config) {
        var logger = config.logger,
            session = ko.observable(),
            activate = function(routeData) {
                logger.info('activated session view model');
                var sessionId = routeData.id;
                var result = datacontext.sessions.getById(sessionId);
                session(result);
                //TODO:
                //if (session()) {
                //    session().isFavorite.subscribe(addFavorite);
                //}
            };



        return {
            session: session,
            activate: activate
        };
    });
