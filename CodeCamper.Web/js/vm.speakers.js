// Depends on 
//	Knockout
// 	toastr
//	my.dataservice.session
// ----------------------------------------------
my.vm = my.vm || {}
my.vm.speakers = (function (ko, ds, toastr) {
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
})(ko, my.dataservice.session, toastr);
