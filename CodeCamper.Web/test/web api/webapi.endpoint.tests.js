(function () {
    QUnit.config.testTimeout = 10000;
    
    var okAsync = QUnit.okAsync,
        stringformat = QUnit.stringformat;
    
    module('Web API GET Endpoints respond successfully');
    
    var apiUrls = [
       // '/api/BAD_ENDPOINT',
        '/api/lookups/all',
        '/api/lookups/rooms',
        '/api/lookups/tracks',
        '/api/lookups/timeslots/',

        '/api/persons/',
        '/api/persons/1',
        '/api/persons/getbyfirstname/?value=Hans',
        '/api/favorites/1',
        '/api/speakers',

        '/api/sessions/',
        '/api/sessions/2',
        '/api/sessionbriefs',

        // Find the Attendance with personId==2 && sessionId==1
        '/api/attendance/?pid=2&sid=1', // preferred
        
        //// TESTING ONLY
        //'/api/tests/testsessions' 

        // These variations rely on Web API OData support (Future)

        //'/api/lookups/timeslots/?$filter=id%20eq%203',
        //'/api/persons/?$top=3', // 'top 3' makes test 0.2 secs faster
        //'/api/speakers/?$filter=firstName%20eq%20\'Hans\'',
        //'/api/sessions/?$top=3', // 'top 3' makes test ~1 second faster
        //'/api/attendance/?$filter=personId%20eq%202%20and%20sessionId%20eq%201',
        //'/api/attendance/?$filter=personId%20eq%202', // without spaces
        //'/api/attendance/?$filter=personId eq 2', // with spaces
    ];


    var apiUrlslen = apiUrls.length;

    // Test only that the Web API responded to the request with 'success'
    var endpointTest = function (url) {
        stop();
        $.ajax({
            url: url,
            dataType: 'json',
            success: function (result) {
                ok(true, 'GET succeeded for ' + url);
                okAsync(!!result, 'GET retrieved some data');
                start();
            },
            error: function (result) {
                okAsync(false,
                    stringformat('GET on \'{0}\' failed with status=\'{1}\': {2}',
                        url, result.status, result.responseText));
            }
        });
    };

    // Returns an endpointTest function for a given URL
    var endpointTestGenerator = function (url) {
        return function () { endpointTest(url); };
    };

    // Test each endpoint in apiUrls
    for (var i = 0; i < apiUrlslen; i++) {
        var apiUrl = apiUrls[i];
        test(apiUrl, endpointTestGenerator(apiUrl));
    }
    ;
})();
