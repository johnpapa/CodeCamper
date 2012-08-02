(function () {
    QUnit.config.testTimeout = 10000;

    module('Web API GET result has expected shape');

    asyncTest('Lookups url should return array of rooms, tracks, timeSlots',
            function () {
                $.ajax({
                    url: '/api/lookups/all',
                    dataType: 'json',
                    success: function (result) {
                        ok(
                            !!result.rooms
                            && !!result.tracks
                            && !!result.timeSlots,
                            'Got Rooms, Tracks, TimeSlots');
                        start();
                    },
                    error: function (result) {
                        ok(false, 'Failed with: ' + result.responseText);
                        start();
                    }
                });
            }
        );

}());
