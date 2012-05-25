// Depends on 
//	Amplify.js
//	app.mock
// ----------------------------------------------
var app = app || {};
app.mock.dataservice.session = (function (amplify, mock) {
	var 
		defineApi = function () {
		    amplify.request.define('mysessions', function (settings) {
		        settings.success(mock.model.generateSessions().sessions)
            })

		    amplify.request.define('sessions', function (settings) {
		        settings.success(mock.model.generateSessions().sessions)
			})

		    amplify.request.define('session-briefs', function (settings) {
		        settings.success(mock.model.generateSessions().sessions)
		    })
		    
		    amplify.request.define('session', function (settings) {
		        settings.success(mock.model.generateSessions().sessions[0])
			})
		}
	return {
	    defineApi: defineApi
	}
})(amplify, app.mock);
