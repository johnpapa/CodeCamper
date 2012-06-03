var app = window["app"] = {};
app.test = app.test || {};
//var myTests = window.myTests || {};

// ToDo: Consider making this a utility
// Stole from http://stackoverflow.com/questions/1038746/equivalent-of-string-format-in-jquery
// Usage: 
//   format("i can speak {language} since i was {age}",{language:'javascript',age:10}); 
//
//   format("i can speak {0} since i was {1}",'javascript',10}); 
app.test.format = function (str, col) {
    col = typeof col === 'object' ? col : Array.prototype.slice.call(arguments, 1);

    return str.replace(/\{\{|\}\}|\{(\w+)\}/g, function (m, n) {
        if (m == '{{') { return '{'; }
        if (m == '}}') { return '}'; }
        return col[n];
    });
};

app.test.webApiGetEndpointsRespondOk = function () {

    module('WebAPI GET endpoints respond successfully');

    var apiUrls = [
        //'/api/BAD_ENDPOINT',
        '/api/lookups/all',
        '/api/lookups/rooms',
        '/api/lookups/tracks',
        '/api/lookups/timeslots/',
        // Demo OData-ish filtering
        '/api/lookups/timeslots/?$filter=id%20eq%203',
        '/api/persons/?$top=3', // 'top 3' makes test 0.2 secs faster
        '/api/persons/1',
        '/api/favorites/1',
        '/api/speakers',
        '/api/speakers/?$filter=firstName%20eq%20\'Hans\'',
        '/api/sessions/?$top=3', // 'top 3' makes test ~1 second faster
        '/api/sessions/2',
        '/api/sessionbriefs',
        '/api/attendance',
        '/api/attendance/?$filter=personId%20eq%202', // without spaces
        '/api/attendance/?$filter=personId eq 2', // with spaces

        // These variations find the link with personId==2 && sessionId==1
        '/api/attendance/?$filter=personId%20eq%202%20and%20sessionId%20eq%201',
        '/api/attendance/?pid=2&sid=1', // preferred
    ];

    var apiUrlslen = apiUrls.length;

    // Test only that the WebAPI responded to the request with 'success'
    var endpointTest = function (url) {
        stop();
        $.ajax({
            url: url,
            dataType: 'json',
            success: function (result) {
                ok(true, 'GET succeeded for ' + url);
                ok(!!result, 'GET retrieved some data');
                start();
            },
            error: function (result) {
                ok(false,
                    app.test.format('GET on \'{0}\' failed with status=\'{1}\': {2}',
                        url, result.status, result.responseText));
                start();
            }
        });
    };

    // Returns an endpointTest function for a given URL
    var endpointTestGenerator = function (url) {
        return function () { endpointTest(url); };
    };

    // Test each endpoint in apiUrls
    for (var i = 0; i < apiUrlslen; i++) {
        var url = apiUrls[i];
        test(url, endpointTestGenerator(url));
    }
    ;
};

app.test.webApiGetResultsHaveExpectedShapes = function () {

    module('WebAPI GET result has expected shape');

    test('Lookups url should return array of Rooms, Tracks, TimeSlots',
            function () {
                stop();
                $.ajax({
                    url: '/api/lookups/all',
                    dataType: 'json',
                    success: function (result) {
                        ok(!!result.Rooms && !!result.Tracks && !!result.TimeSlots,
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
    
    var expectedHansImageSource = "hans_fjallemark.jpg";
    test('Find Hans among speakers and his ImageSource is ' + expectedHansImageSource,
        function() {
            stop();
            $.ajax({
                url: '/api/speakers/?$filter=firstName%20eq%20\'Hans\'',
                dataType: 'json',
                success: function(result) {
                    ok(!!result, "Got data when searching for Hans");
                    ok(result.length === 1 && result[0].FirstName === 'Hans',
                        "Got exactly one speaker w/ firstName = 'Hans'");
                    
                    ok(result[0].ImageSource === expectedHansImageSource,
                        "Got expected ImageSource = " + expectedHansImageSource);
                    start();
                },
                error: function(result) {
                    ok(false, 'Failed with: ' + result.responseText);
                    start();
                }
            });
        }
    );
};

app.test.webApiCudTests = function () {
    
    module('WebAPI Attendance CUD tests');

    var baseUrl = '/api/attendance',
        getMsgPrefix = function(pid, sid, rqstUrl) {
            return app.test.format(
                ' of attendance with pid=\'{0}\' sid=\'{1}\' to \'{2}\'',
                pid, sid, rqstUrl);
        },
        onCallSuccess = function(msgPrefix) {
            ok(true, msgPrefix + " succeeded.");
        },
        onError = function(result, msgPrefix) {
            ok(false, msgPrefix +
                app.test.format(' failed with status=\'{1}\': {2}.',
                    result.status, result.responseText));
        };  

    var testPersonId = 1,
        testSessionId = 1,

        testUrl = app.test.format(
            '{0}/?pid={1}&sid={2}', baseUrl, testPersonId, testSessionId),
        
        testMsgBase = getMsgPrefix(testPersonId, testSessionId, testUrl);
    
    test('Can get the test Attendance',
        function () {
            stop();
            getTestAttendance();
        }
    );

    var origRatingValue,
        testRatingValue,
        testAttendance,
        // Supporting update test functions
        getTestAttendance, changeTestAttendance, confirmUpdated, restoreTestAttendance, confirmRestored;

    test('Can update the test Attendance',
        function () {
            
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
                ok(result.PersonId === testPersonId &&
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
        ok(attendance.Rating === testRatingValue, "test rating was updated ");
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
        ok(attendance.Rating === origRatingValue, "test rating was restored ");
        start();
    };

    ///////////// DUMMY ATTENDANCE TESTS /////////

    var dummyAttendance = {
        personId: 1,
        sessionId: 42,
        rating: 1,
        text: "Dummy attendance and evaluation."
    },
        dummyUrl = app.test.format(
            '{0}/?pid={1}&sid={2}', baseUrl, dummyAttendance.personId, dummyAttendance.sessionId),
        dummyMsgBase = getMsgPrefix(dummyAttendance.personId, dummyAttendance.sessionId, dummyUrl);

    test('Can add dummy Attendance',
        function() {
            var msgPrefix = 'POST' + dummyMsgBase,
                data = JSON.stringify(dummyAttendance);

            stop();
            $.ajax({
                type: 'POST',
                url: dummyUrl,
                data: data,
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                success: function(result) {
                    onCallSuccess(msgPrefix);
                    ok(result.PersonId === dummyAttendance.personId &&
                        result.SessionId === dummyAttendance.sessionId,
                        "returned key matches dummyAttendance key."
                    );
                    start();
                },
                error: function(result) { onError(result, msgPrefix); }
            });
        }
    );

    test('Can delete dummy Attendance',
        function() {
            var msgPrefix = 'POST' + dummyMsgBase;

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
};

    $(function () {
    // TODO: Learn how to set test timeout. This doesn't work
    QUnit.testTimeout = 10000; // 10 second default timeout for async
    app.test.webApiGetEndpointsRespondOk();
    app.test.webApiGetResultsHaveExpectedShapes();
    app.test.webApiCudTests();
});


/* Boiler plate demo code from QUnit documentation

    module('Module A');

    test('a basic test example', function () {
        ok(true, 'this test is fine');
        var value = 'hello';
        equal(value, 'hello', 'We expect value to be hello');
    });

    test('first test within module', function () {
        ok(true, 'all pass');
    });

    test('second test within module', function () {
        ok(true, 'all pass');
    });

    module('Module B');

    test('some other test', function () {
        expect(2);
        equal(true, false, 'failing test');
        equal(true, true, 'passing test');

    });
*/
