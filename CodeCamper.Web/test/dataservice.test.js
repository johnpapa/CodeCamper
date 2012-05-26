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
                success: function(result){
                    ok(!!result.Rooms && !!result.Tracks && !!result.TimeSlots,
                            'Got Rooms, Tracks, TimeSlots');
                    start();
                }, 
                error: function(result) {
                    ok(false, 'Failed with: ' + result.responseText);
                    start();
                }
            });
        })

    var retrievalTest = function (t) {
        stop();
        var params = [];
        if (t.args) {
            params = t.args;
        }
        params.push({
            success: function (result) {
                var prefix = 'Test \"' + t.name + '" retrieved ';
                if (!!result && result.length > 0) {
                    ok(true, prefix + result.length+' items.');
                } else {
                    ok(!!result, prefix + 'one item.');
                }
                start();
            },
            error: function (result) {
                ok(false, 'Failed with: ' + result.responseText);
                start();
            }
        });
        t.delegate.apply({ }, params);
    };
    
    for (var i = 0; i < retrievalTests.length; i++) {
        var t = retrievalTests[i];
        test(t.name,
            function (t) {
                 return function() { retrievalTest(t); };
            }(t));
    }
};

$(function () {
    app.test.dataservicesReturnData();
});
