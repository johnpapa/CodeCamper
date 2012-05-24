// Depends on 
//	Amplify.js
//	my.mock
// ----------------------------------------------
var app = app || {};
app.mock.dataservice.person = (function (amplify, mock) {
	var 
		apply = function(){

            //TODO: persons need to be fleshed out
		    //amplify.request.define('persons', function (settings) {
		    //    settings.success(mock.model.persons())
			//})

		    amplify.request.define('speakers', function (settings) {
		        settings.success(mock.model.generateSpeakers().speakers)
		    })

		}
	return {
		apply : apply
	}
})(amplify, app.mock);
