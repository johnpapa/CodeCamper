// Depends on 
//	Amplify.js
//	my.mock
// ----------------------------------------------
my.sessionHttpServiceMock = (function (amplify, mock) {
	var 
		apply = function(){
			amplify.request.define('getSessions', function(settings) {
				settings.success(mock.data.sessions())
			})

			amplify.request.define('getSession', function(settings) {
				settings.success(mock.data.sessions()[0])
			})
		}
	return {
		apply : apply
	}
})(amplify, my.mock);
