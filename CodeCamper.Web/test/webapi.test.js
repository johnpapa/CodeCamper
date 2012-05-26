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
        '/api/lookups',
        '/api/lookups/rooms',
        '/api/lookups/tracks',
        '/api/lookups/timeslots/',
        // Demo OData-ish filtering
        '/api/lookups/timeslots/?$filter=id%20eq%203',
        '/api/persons/?$top=3', // 'top 3' makes test 0.2 secs faster
        '/api/persons/1',
        '/api/persons/2/attendance',
        '/api/persons/speakers',
        '/api/persons/speakers/?$filter=firstName%20eq%20\'Hans\'',
        '/api/sessions/?$top=3', // 'top 3' makes test ~1 second faster
        '/api/sessions/2',
        '/api/sessions/2/attendance',
        '/api/sessions/briefs',
        '/api/sessions/taggroups/',
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
                    url: '/api/lookups',
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
                url: '/api/persons/speakers/?$filter=firstName%20eq%20\'Hans\'',
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

    var testAttendance = {
        personId: 1,
        sessionId: 42,
        rating: 1,
        text: "Dummy attendance and evaluation."
    },
        getAttendanceQueryString = function(attendance) {
            return app.test.format(
                '?pid={0}&sid={1}', attendance.personId, attendance.sessionId);
        },
        getMsgPrefix = function(attendance, verb, url) {
            return app.test.format(
                '{0} of attendance with pid=\'{1}\' sid=\'{2}\' to \'{3}\'',
                verb, attendance.personId, attendance.sessionId, url);
        },
        onSuccess = function(msgPrefix) {
            ok(true, msgPrefix + " succeeded.");
            start();
        },
        onError = function(result, msgPrefix) {
            ok(false, msgPrefix +
                app.test.format(' failed with status=\'{1}\': {2}.',
                    result.status, result.responseText));
            start();
        };

    test('Can add test Attendance',
            function () {
                var url = '/api/attendance',
                    msgPrefix = getMsgPrefix(testAttendance, 'POST', url),
                    data = JSON.stringify(testAttendance);
                
                stop();
                $.ajax({
                    type: 'POST',
                    url: url,
                    data: data,
                    dataType: 'json',
                    contentType: 'application/json; charset=utf-8',
                    success: function (result) {
                        onSuccess(msgPrefix);
                        ok(result.PersonId === testAttendance.personId &&
                            result.SessionId === testAttendance.sessionId,
                            "returned key matches testAttendance key."
                        );
                    },
                    error: function (result) { onError(result, msgPrefix); }
                });
            }
        );
    
    test('Can update test Attendance',
            function () {
                // some change
                testAttendance.text = 'CHANGE ' + testAttendance.text;
                
                var url = '/api/attendance',
                    msgPrefix = getMsgPrefix(testAttendance, 'PUT', url),
                    data = JSON.stringify(testAttendance);
                
                stop();
                $.ajax({
                    type: 'PUT',
                    url: url,
                    data: data,
                    dataType: 'json',
                    contentType: 'application/json; charset=utf-8',
                    success: function () { onSuccess(msgPrefix); },
                    error: function(result) { onError(result, msgPrefix); }
                });
            }
        );
    
    test('Can delete test Attendance',
            function () {
                var url = '/api/attendance/' +
                          getAttendanceQueryString(testAttendance),                   
                    msgPrefix = getMsgPrefix(testAttendance, 'DELETE', url);
                
                stop();
                $.ajax({
                    type: 'DELETE',
                    url: url,
                    dataType: 'json',
                    success: function () { onSuccess(msgPrefix); },
                    error: function (result) { onError(result, msgPrefix); }
                });
            }
        );
};

$(function () {
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
