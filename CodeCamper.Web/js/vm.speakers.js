// Depends on 
//	Knockout
// 	app.logger
//	app.dataservice.session
// ----------------------------------------------
app.vm = app.vm || {};
app.vm.speakers = (function (ko, ds, logger) {
    var speakers = ko.observableArray(),
        activate = function(routeData) {

        };
    return {
        speakers: speakers,
        activate: activate
    };
})(ko, app.dataservice.session, app.config.logger);
