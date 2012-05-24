// Depends on 
//	Amplify.js
//	my.mock
// ----------------------------------------------
var app = app || {};
app.mock.dataservice.lookup = (function (amplify, mock) {
	var 
		apply = function(){

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
		apply : apply
	}
})(amplify, app.mock);
