// Depends on 
//	Knockout
// 	toastr
//	app.dataservice.session
// ----------------------------------------------
app.vm = app.vm || {}
app.vm.speakers = (function (ko, ds, toastr) {
    var 
        speakers = ko.observableArray(),
        activate = function(routeData) {
            ds.getSessions('speakers',
                {
                    success: loadSessions,
                    error: function() { toastr.error('oops!'); }
                })
        },
        loadSessions = function(data) {
            toastr.success('received with ' + data.sessions.length + ' elements');
            speakers(data.speakers);
        };
    return {
        speakers: speakers,
        activate: activate
    }
})(ko, app.dataservice.session, toastr);
