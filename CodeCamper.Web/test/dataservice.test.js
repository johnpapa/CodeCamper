app.test = app.test || {};
    
app.test.dataservicesReturnData = function () {

    //ARRANGE
    var retrievalTests = [
        { name: 'Retrieve session briefs', delegate: app.dataservice.session.getSessionBriefs},
        { name: 'Retrieve sessions', delegate: app.dataservice.session.getSessions},
        { name: 'Retrieve 1 session', delegate: app.dataservice.session.getSession, args: [1] },
        { name: 'Retrieve rooms', delegate: app.dataservice.lookup.getRooms },
        { name: 'Retrieve timeslots', delegate: app.dataservice.lookup.getTimeslots },
        { name: 'Retrieve tracks', delegate: app.dataservice.lookup.getTracks}
    ];

    //ACT
    
    module('Data Services results return data');

    test('Lookups url should return array of Rooms, Tracks, TimeSlots',
        function() {
            stop();
            app.dataservice.lookup.getLookups({
                success: function(data){
                    ok(!!data.Rooms && !!data.Tracks && !!data.TimeSlots,
                            'Got Rooms, Tracks, TimeSlots');
                    start();
                }, 
                error: function(data) {
                    ok(false, 'Failed with: ' + data.responseText);
                    start();
                }
            });
        })

    for (var i = 0; i < retrievalTests.length; i++) {
        var t = retrievalTests[i];
        test(t.name,
            function() {
                stop();
                var params = [];
                if (t.args) {
                    params = t.args;
                }
                params.unshift({
                        success: function(data) {
                            ok(!!data, 'Retrieved some data');
                            start();
                        },
                        error: function(data) {
                            ok(false, 'Failed with: ' + data.responseText);
                            start();
                        }
                });
                t.delegate.apply({}, params)
            })
    }
};

$(function () {
    app.test.dataservicesReturnData();
});
