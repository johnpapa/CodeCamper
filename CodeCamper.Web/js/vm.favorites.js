// Depends on 
//	Knockout
// 	toastr
//	my.dataservice.session
// ----------------------------------------------
my.vm = my.vm || {}
my.vm.favorites = (function(ko, ds, toastr) {
    var 
        sessions = ko.observable(),
        activate = function(routeData) { //TODO: routeData is not used. Remove it later.
            ds.getSessions('favorites',
                {
                    success: loadSessions,
                    error: function() { toastr.error('oops!'); }
                })
        },
        loadSessions = function(data) {
            toastr.success('received with ' + data.sessions.length + ' elements');
            sessions(data.sessions);
        };
    return {
        sessions: sessions,
        activate: activate
    }
})(ko, my.dataservice.session, toastr);