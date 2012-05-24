var myTests = window.myTests || {};

// ToDo: Consider making this a utility
// Stole from http://stackoverflow.com/questions/1038746/equivalent-of-string-format-in-jquery
// Usage: 
//   format("i can speak {language} since i was {age}",{language:'javascript',age:10}); 
//
//   format("i can speak {0} since i was {1}",'javascript',10}); 
myTests.format = function (str, col) {
    col = typeof col === 'object' ? col : Array.prototype.slice.call(arguments, 1);

    return str.replace(/\{\{|\}\}|\{(\w+)\}/g, function (m, n) {
        if (m == '{{') { return '{'; }
        if (m == '}}') { return '}'; }
        return col[n];
    });
};

myTests.webApiGetEndpointsRespondOk = function () {

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

            '/api/sessions/?$top=3', // 'top 3' makes test ~1 second faster
            '/api/sessions/2',
            '/api/sessions/2/attendance',
            '/api/sessions/briefs',
            '/api/sessions/taggroups/',

            '/api/attendance',
            '/api/attendance/?$filter=personId%20eq%202',

            // These variations find the link with personId==2 && sessionId==1
            '/api/attendance/?$filter=personId%20eq%202%20and%20sessionId%20eq%201',
            '/api/attendance/?pid=1&sid=2' // preferred
    ];

    var apiUrlslen = apiUrls.length;

    // Test only that the WebAPI responded to the request with 'success'
    var endpointTest = function (url) {
        stop();
        $.ajax({
            url: url,
            dataType: 'json',
            success: function (data) {
                ok(true, 'GET succeeded for ' + url);
                ok(!!data, 'GET retrieved some data');
                start();
            },
            error: function (data) {
                ok(false, 
                       myTests.format('GET on \'{0}\' failed with status=\'{1}\': {2}',
                          url, data.status, data.responseText));
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
        test(url, 2, endpointTestGenerator(url));
    };
}

myTests.webApiGetResultsHaveExpectedShapes = function () {

    module('WebAPI GET result has expected shape');

    test('Lookups url should return array of Rooms, Tracks, TimeSlots',
            function () {
                stop();
                $.ajax({
                    url: '/api/lookups',
                    dataType: 'json',
                    success: function (data) {
                        ok(!!data.Rooms && !!data.Tracks && !!data.TimeSlots,
                            'Got Rooms, Tracks, TimeSlots');
                        start();
                    },
                    error: function (data) {
                        ok(false, 'Failed with: ' + data.responseText);
                        start();
                    }
                });
            }
        );
};

$(function () {
    myTests.webApiGetEndpointsRespondOk();
    myTests.webApiGetResultsHaveExpectedShapes();
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
