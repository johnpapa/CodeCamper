// Depends on 
//	Amplify.js
//	app.mock
// ----------------------------------------------
var app = app || {};
app.mock.dataservice.attendance = (function (amplify, mock) {
	var 
		defineApi = function(){
		    amplify.request.define('attendance', function (settings) {
		        settings.success(mock.model.generateAttendance().attendance)
            })
		}
	return {
	    defineApi: defineApi
	}
})(amplify, app.mock);
