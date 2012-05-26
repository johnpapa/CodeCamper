// Depends on 
//	Knockout
// 	app.logger
//	app.dataservice.session
// ----------------------------------------------
app.vm = app.vm || {}
app.vm.sessions = (function (ko, ds, logger) {
    var 
        sessions = ko.observableArray(),
        activate = function(routeData) {
            //ds.getSessions({
            //        success: loadSessions,
            //        error: function() { logger.error('oops!'); }
            //    })
        },
        loadSessions = function(data) {
            logger.success('received with ' + data.sessions.length + ' elements');
            sessions(data.sessions);
        },
        loadByDate = function (data) {
            logger.info('load by date');
        },
        loadByTrack= function (data) {
            logger.info('load by track');
        };
    return {
        sessions: sessions,
        activate: activate,
        loadByDate: loadByDate,
        loadByTrack: loadByTrack
    }
})(ko, app.dataservice.session, app.config.logger);
