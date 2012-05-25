// Depends on 
//	Amplify.js
//	app.mock
// ----------------------------------------------
var app = app || {};
app.mock.dataservice.lookup = (function (amplify, mock) {
	var 
		defineApi = function () {

		    amplify.request.define('lookups', function (settings) {
		        settings.success({
		            lookups: {
		                Rooms: mock.model.generateRooms().rooms,
		                TimeSlots: mock.model.generateTimeslots().timeslots,
		                Tracks: mock.model.generateTracks().tracks,
		            }
		        })
			})
		    amplify.request.define('lookups', 'ajax', {
		        url: '/api/lookups',
		        dataType: 'json',
		        type: 'GET'
		        //cache:
		    })
		}
	return {
	    defineApi: defineApi
	}
})(amplify, app.mock);
