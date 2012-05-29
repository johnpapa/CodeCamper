// Depends on 
//	Knockout
// 	app.logger
//	app.dataservice.session
// ----------------------------------------------
app.vm = app.vm || {};
app.vm.speakers = (function (ko, ds, logger) {
    var 
        speakers = ko.observableArray(),
        activate = function(routeData) {
            ds.getSessions('speakers',
                {
                    success: loadSessions,
                    error: function() { logger.error('oops!'); }
                });
        },
        loadSessions = function(data) {
            logger.success('received with ' + data.sessions.length + ' elements');
            speakers(data.speakers);
        };
    return {
        speakers: speakers,
        activate: activate
    };
})(ko, app.dataservice.session, app.config.logger);
