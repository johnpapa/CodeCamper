// Depends on 
//	Amplify.js
//	my.mock
// ----------------------------------------------
var my = my || {};
my.mock.dataservice.session = (function (amplify, mock) {
	var 
		apply = function(){
		    amplify.request.define('mysessions', function (settings) {
		        settings.success(mock.model.sessions())
            })

		    amplify.request.define('sessions', function (settings) {
				settings.success(mock.model.sessions())
			})

			amplify.request.define('session', function (settings) {
			    settings.success(mock.model.sessions()[0])
			})
		}
	return {
		apply : apply
	}
})(amplify, my.mock);
