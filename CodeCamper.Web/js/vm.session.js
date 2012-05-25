// Depends on 
//	Knockout
// 	toastr
//	app.dataservice.session
// ----------------------------------------------
app.vm = app.vm || {}
app.vm.session = (function (ko, ds, toastr) {
    var
        session = ko.observable(),
        activate = function (routeData) {
            toastr.info('activated session view model')
        };
    return {
        session: session,
        activate: activate
    }
})(ko, app.dataservice.session, toastr);
