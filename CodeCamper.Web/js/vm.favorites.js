// Depends on 
//	Knockout
// 	toastr
//	my.dataservice.session
// ----------------------------------------------
my.vm = my.vm || {}

my.vm.favorites = (function(ko, ds, toastr) {
    var
        sessions = ko.observableArray(),
        isActive = ko.observable(false),
        activate = function (routeData) { //TODO: routeData is not used. Remove it later.
            isActive(true);
            ds.getSessions('favorites',
                {
                    success: loadSessions,
                    error: function () { toastr.error('oops!'); }
                })
        },
        deactivate = function () {
            isActive(false);
        },
        loadSessions = function (data) {
            sessions(data.sessions.map(function (s) { return my.modelMappers.mapSession(s) }));
            //sessions(data.sessions.map(my.models.mapSession(s)));
            toastr.success('received with ' + sessions().length + ' elements');
        },
        debugInfo = ko.computed(function () {
            return JSON.stringify(ko.toJS(sessions), null, 2)
        });
    return {
        sessions: sessions,
        activate: activate,
        deactivate: deactivate,
        debugInfo: debugInfo
    }
})(ko, my.dataservice.session, toastr);