(function () {
    QUnit.config.testTimeout = 10000;
    
    var okAsync = QUnit.okAsync,
        stringformat = QUnit.stringformat;
    
    var baseUrl = '/api/sessions',
        getMsgPrefix = function(id, rqstUrl) {
            return stringformat(
                ' of session with id=\'{0}\' to \'{1}\'',
                id, rqstUrl);
        },
        onCallSuccess = function(msgPrefix) {
            ok(true, msgPrefix + " succeeded.");
        },
        onError = function (result, msgPrefix) {
            okAsync(false, msgPrefix +
                stringformat(' failed with status=\'{1}\': {2}.',
                    result.status, result.responseText));
        };

    var testSessionId = 42,
        testUrl,
        testMsgBase,
        testSession,
        origCode,
        testCode;

    module('Web API Session update tests',
        {
          setup: function () {
              testUrl = stringformat(
                  '{0}/?id={1}', baseUrl, testSessionId);
              testMsgBase = getMsgPrefix(testSessionId, testUrl);
          } 
        });
       
    test('Can update the test Session',
        function() {
            testSession = null;
            stop();
            getTestSession(changeTestSession);
        }
    );

    // Step 1: Get test session (this fnc is re-used several times)
    function getTestSession(succeed) {
        var msgPrefix = 'GET' + testMsgBase;
        $.ajax({
            type: 'GET',
            url: testUrl,
            success: function(result) {
                onCallSuccess(msgPrefix);
                okAsync(result.Id === testSessionId,
                    "returned key matches testSession Id.");
                if (typeof succeed !== 'function') {
                    start(); // no 'succeed' callback; end of the line
                    return;
                } else {
                    succeed(result);
                };
            },
            error: function(result) { onError(result, msgPrefix); }
        });
    };

    // Step 2: Change test session and save it
    function changeTestSession(session) {
        testSession = session;
        origCode = testSession.Code;
        testCode = origCode === "TST123" ? "TST987" : "TST123"; // make it different
        testSession.Code = testCode;

        var msgPrefix = 'PUT (change)' + testMsgBase,
            data = JSON.stringify(testSession);

        $.ajax({
            type: 'PUT',
            url: baseUrl,
            data: data,
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            success: function() {
                onCallSuccess(msgPrefix);
                getTestSession(confirmUpdated);
            },
            error: function(result) { onError(result, msgPrefix); }
        });
    };

    // Step 3: Confirm test session updated, then call restore
    function confirmUpdated(session) {
        okAsync(session.Code === testCode, "test session's code was updated ");
        restoreTestSession();
    };

    // Step 4: Restore orig test session in db
    function restoreTestSession() {
        testSession.Code = origCode;
        var msgPrefix = 'PUT (restore)' + testMsgBase,
            data = JSON.stringify(testSession);

        $.ajax({
            type: 'PUT',
            url: baseUrl,
            data: data,
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            success: function() {
                getTestSession(confirmRestored);
            },
            error: function(result) { onError(result, msgPrefix); }
        });
    };

    // Step 5: Confirm test session was restored
    function confirmRestored(session) {
        okAsync(session.Code === origCode, "test session's code was restored ");
        start();
    };

    /////////////////////
    
    module('Web API Session add tests',
        {
            setup: function () {
                testSession = {
                    title: "TEST session " + new Date(),
                    code: "TST123",
                    speakerId:1,
                    trackId: 1,
                    timeslotId: 1,
                    roomId:1,
                    description: "This session was added in an automated test and should be deleted."
                };
            }
        });

    test('Can add a test Session',
        function() {
            var msgPrefix = 'POST of new test session to '+testUrl,
                data = JSON.stringify(testSession);

            stop();
            $.ajax({
                type: 'POST',
                url: baseUrl,
                data: data,
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                success: function(result) {
                    onCallSuccess(msgPrefix);
                    okAsync(!!result, "returned a newly added session.");
                    deleteAddedTestSession(result);
                },
                error: function(result) { onError(result, msgPrefix); }
            });
        }
    );
    
    function deleteAddedTestSession(session) {
        var deleteUrl = '/api/tests/testsession/?id=' + session.Id,
            msgPrefix = 'DELETE api call: ' + deleteUrl;
        $.ajax({
            type: 'DELETE',
            url: deleteUrl,
            dataType: 'json',
            success: function() {
                onCallSuccess(msgPrefix);
                start();
            },
            error: function(result) { onError(result, msgPrefix); }
        });
    }
 
})();