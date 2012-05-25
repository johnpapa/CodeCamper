// Depends on 
//	Knockout
// 	toastr
//	app.dataservice.session
// ----------------------------------------------
app.vm = app.vm || {}
app.vm.sessions = (function (ko, ds, toastr) {
    var 
        sessions = ko.observableArray(),
        activate = function(routeData) {
            //ds.getSessions({
            //        success: loadSessions,
            //        error: function() { toastr.error('oops!'); }
            //    })
        },
        loadSessions = function(data) {
            toastr.success('received with ' + data.sessions.length + ' elements');
            sessions(data.sessions);
        },
        loadByDate = function (data) {
            toastr.info('load by date');
        },
        loadByTrack= function (data) {
            toastr.info('load by track');
        };
    return {
        sessions: sessions,
        activate: activate,
        loadByDate: loadByDate,
        loadByTrack: loadByTrack
    }
})(ko, app.dataservice.session, toastr);
