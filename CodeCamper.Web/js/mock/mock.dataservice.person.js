// Depends on 
//	Amplify.js
//	app.mock
// ----------------------------------------------
var app = app || {};

app.mock.dataservice.person = (function (amplify, mock) {
	var 
		defineApi = function () {

            //TODO: Come back and fix this. Only get ones that are speakers
		    amplify.request.define('speakers', function(settings) {
		        settings.success(mock.model.generatePersons().persons());
		    });

		    amplify.request.define('persons', function (settings) {
		        settings.success(mock.model.generatePersons().persons);
		    });
		};
    return {
	    defineApi: defineApi
	};
})(amplify, app.mock);
