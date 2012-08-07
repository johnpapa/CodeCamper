define(
    'dataservice-session-tests-function',
    ['amplify'],
    function (amplify) {

        config.useMocks(true); // this helps me NOT mock datacontext
        config.currentUserId = 3;
        config.currentUser = function () { return { id: function () { return 3; } }; };
        config.logger = { success: doNothing };
        config.dataserviceInit();

        var retrievalTests = [
            { name: 'Retrieve session briefs', delegate: app.dataservice.session.getSessionBriefs},
            { name: 'Retrieve sessions', delegate: app.dataservice.session.getSessions},
            { name: 'Retrieve 1 session', delegate: app.dataservice.session.getSession, args: [1] }
        ];

        var findDs = function () {
            return window.testFn(amplify);
        };

        module('Session Data Services return data');

        asyncTest('Lookups url should return array of Rooms, Tracks, TimeSlots',
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
            });
    
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
                var retTest = retrievalTests[i];
                AsyncTest(retTest.name,
                    function (t) {
                         return function() { retrievalTest(t); };
                    }(retTest));
            }

            module('CUD for Attendance');

            var testAttendance = {
                personId: 1,
                sessionId: 3,
                rating: 1,
                text: "Dummy attendance and evaluation."
            };
        
            test('Add a Favorite', function() {
                var data = JSON.stringify(testAttendance);
                stop();
                app.dataservice.attendance.add({
                    success: function (result) {
                        ok(result.PersonId === testAttendance.personId &&
                                    result.SessionId === testAttendance.sessionId,
                                    "returned key matches testAttendance key."
                                );
                        start();
                    },
                    error: function (result) {
                        ok(false, 'Failed with: ' + result.responseText);
                        start();
                    }
                }, data.personId, data.sessionId);
            });
        
    });