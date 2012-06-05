(function () {

    var okAsync = QUnit.okAsync,
        stringformat = QUnit.stringformat;
    
    var baseUrl = '/api/attendance',
        getMsgPrefix = function(pid, sid, rqstUrl) {
            return stringformat(
                ' of attendance with pid=\'{0}\' sid=\'{1}\' to \'{2}\'',
                pid, sid, rqstUrl);
        },
        onCallSuccess = function(msgPrefix) {
            ok(true, msgPrefix + " succeeded.");
        },
        onError = function(result, msgPrefix) {
            okAsync(false, msgPrefix +
                stringformat(' failed with status=\'{1}\': {2}.',
                    result.status, result.responseText));
        };

    var testPersonId = 1,
        testSessionId = 1,
        testUrl = stringformat(
            '{0}/?pid={1}&sid={2}', baseUrl, testPersonId, testSessionId),        
        testMsgBase = getMsgPrefix(testPersonId, testSessionId, testUrl),
        origRatingValue,
        testRatingValue,
        testAttendance,
        // Supporting test functions
        getTestAttendance, changeTestAttendance, confirmUpdated, restoreTestAttendance, confirmRestored;

    module('Web API Attendance get tests');
    
    test('Can get the test Attendance',
        function() {
            stop();
            getTestAttendance();
        }
    );

    module('Web API Attendance update tests');
    
    test('Can update the test Attendance',
        function() {
            testAttendance = null;
            stop();
            getTestAttendance(changeTestAttendance);
        }
    );

    // Step 1: Get test attendance (this fnc is re-used several times)
    getTestAttendance = function(succeed) {
        var msgPrefix = 'GET' + testMsgBase;
        $.ajax({
            type: 'GET',
            url: testUrl,
            success: function(result) {
                onCallSuccess(msgPrefix);
                okAsync(result.PersonId === testPersonId &&
                    result.SessionId === testSessionId,
                    "returned key matches testAttendance key.");
                if (typeof succeed !== 'function') {
                    start(); // no 'succeed' callback; end of the line
                    return;
                } else {
                    succeed(result);
                }
                ;
            },
            error: function(result) { onError(result, msgPrefix); }
        });
    };

    // Step 2: Change test attendance and save it
    changeTestAttendance = function(attendance) {
        testAttendance = attendance;
        origRatingValue = testAttendance.Rating;
        testRatingValue = origRatingValue === 1 ? 5 : 1; // make it different
        testAttendance.Rating = testRatingValue;

        var msgPrefix = 'PUT (change)' + testMsgBase,
            data = JSON.stringify(testAttendance);

        $.ajax({
            type: 'PUT',
            url: testUrl,
            data: data,
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            success: function() {
                onCallSuccess(msgPrefix);
                getTestAttendance(confirmUpdated);
            },
            error: function(result) { onError(result, msgPrefix); }
        });
    };

    // Step 3: Confirm test attendance updated, then call restore
    confirmUpdated = function(attendance) {
        okAsync(attendance.Rating === testRatingValue, "test rating was updated ");
        restoreTestAttendance();
    };

    // Step 4: Restore orig test attendance in db
    restoreTestAttendance = function() {
        testAttendance.Rating = origRatingValue;
        var msgPrefix = 'PUT (restore)' + testMsgBase,
            data = JSON.stringify(testAttendance);

        $.ajax({
            type: 'PUT',
            url: testUrl,
            data: data,
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            success: function() {
                getTestAttendance(confirmRestored);
            },
            error: function(result) { onError(result, msgPrefix); }
        });
    };

    // Step 5: Confirm test attendance was restored
    confirmRestored = function(attendance) {
        okAsync(attendance.Rating === origRatingValue, "test rating was restored ");
        start();
    };

    module('Web API Attendance add tests');

    var dummyAttendance = {
        personId: 1,
        sessionId: 42,
        rating: 1,
        text: "Dummy attendance and evaluation."
    },
        dummyUrl = stringformat(
            '{0}/?pid={1}&sid={2}', baseUrl, dummyAttendance.personId, dummyAttendance.sessionId),
        dummyMsgBase = getMsgPrefix(dummyAttendance.personId, dummyAttendance.sessionId, dummyUrl);

    test('Can add dummy Attendance',
        function() {
            var msgPrefix = 'POST' + dummyMsgBase,
                data = JSON.stringify(dummyAttendance);

            stop();
            $.ajax({
                type: 'POST',
                url: baseUrl, //dummyUrl, //PAPA: Ward - mofied this oto use base Url, since we dont need to pass pid and sid
                data: data,
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                success: function(result) {
                    onCallSuccess(msgPrefix);
                    okAsync(result.PersonId === dummyAttendance.personId &&
                        result.SessionId === dummyAttendance.sessionId,
                        "returned key matches dummyAttendance key."
                    );
                    start();
                },
                error: function(result) { onError(result, msgPrefix); }
            });
        }
    );
    
    module('Web API Attendance delete tests');
    
    test('Can delete dummy Attendance',
        function() {
            var msgPrefix = 'DELETE' + dummyMsgBase;

            stop();
            $.ajax({
                type: 'DELETE',
                url: dummyUrl,
                dataType: 'json',
                success: function() {
                    onCallSuccess(msgPrefix);
                    start();
                },
                error: function(result) { onError(result, msgPrefix); }
            });
        }
    );
})();