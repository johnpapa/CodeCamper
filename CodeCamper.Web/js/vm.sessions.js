// Depends on 
//	Knockout
// 	toastr
//	my.dataservice.session
// ----------------------------------------------
my.vm = my.vm || {}
my.vm.sessions = (function (ko, ds, toastr) {
    var 
        sessions = ko.observableArray(),
        activate = function(routeData) {
            ds.getSessions('sessions',
                {
                    success: loadSessions,
                    error: function() { toastr.error('oops!'); }
                })
        },
        loadSessions = function(data) {
            toastr.success('received with ' + data.sessions.length + ' elements');
            sessions(data.sessions);
        },
        loadByDate = function (data) {
            toastr.success('load by date');
        };
    return {
        sessions: sessions,
        activate: activate,
        loadByDate: loadByDate
    }
})(ko, my.dataservice.session, toastr);
