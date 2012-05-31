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
		                Tracks: mock.model.generateTracks().tracks
		            }
		        });
		    });
		    amplify.request.define('rooms', function (settings) {
		        settings.success(mock.model.generateRooms().rooms);
		    });
		    amplify.request.define('timeslots', function (settings) {
		        settings.success(mock.model.generateTimeslots().timeslots);
		    });
		    amplify.request.define('tracks', function (settings) {
		        settings.success(mock.model.generateTracks().tracks);
		    });
		};
    return {
	    defineApi: defineApi
	};
})(amplify, app.mock);
