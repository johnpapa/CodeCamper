// Depends on 
//	Amplify.js
//	my.mock
// ----------------------------------------------
var my = my || {};
my.mock.dataservice.session = (function (amplify, mock) {
	var 
		apply = function(){
			amplify.request.define('getSessions', function(settings) {
				settings.success(mock.models.sessions())
			})

			amplify.request.define('getSession', function(settings) {
			    settings.success(mock.models.sessions()[0])
			})
		}
	return {
		apply : apply
	}
})(amplify, my.mock);
