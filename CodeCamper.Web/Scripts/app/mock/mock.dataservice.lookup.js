define('mock/mock.dataservice.lookup',
    ['amplify'],
    function (amplify) {
        var
            defineApi = function (model) {

            amplify.request.define('lookups', function (settings) {
                settings.success({
                    lookups: {
                        Rooms: model.generateRooms().rooms,
                        TimeSlots: model.generateTimeslots().timeslots,
                        Tracks: model.generateTracks().tracks
                    }
                });
            });

            amplify.request.define('rooms', function (settings) {
                settings.success(model.generateRooms().rooms);
            });

            amplify.request.define('timeslots', function (settings) {
                settings.success(model.generateTimeslots().timeslots);
            });

            amplify.request.define('tracks', function (settings) {
                settings.success(model.generateTracks().tracks);
            });
        };

        return {
            defineApi: defineApi
        };
    });
