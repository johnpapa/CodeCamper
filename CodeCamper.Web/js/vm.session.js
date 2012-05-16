// Depends on 
//	Knockout
// 	toastr
//	my.dataservice.session
// ----------------------------------------------
my.vm = my.vm || {}
my.vm.session = (function (ko, ds, toastr) {
    var
        session = ko.observable(),
        activate = function (routeData) {
            toastr.info('activated session view model')
        };
    return {
        session: session,
        activate: activate
    }
})(ko, my.dataservice.session, toastr);
