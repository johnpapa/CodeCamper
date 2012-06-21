(function () {
    QUnit.config.testTimeout = 10000;
    
    var okAsync = QUnit.okAsync,
        stringformat = QUnit.stringformat;
    
    var baseUrl = '/api/persons',
        getMsgPrefix = function(id, rqstUrl) {
            return stringformat(
                ' of person with id=\'{0}\' to \'{1}\'',
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

    var testPersonId = 5,
        testUrl,
        testMsgBase,
        testPerson,
        origEmail,
        testEmail;

    module('Web API Person update tests',
        {
          setup: function () {
              testUrl = stringformat(
                  '{0}/?id={1}', baseUrl, testPersonId);
              testMsgBase = getMsgPrefix(testPersonId, testUrl);
          } 
        });
       
    test('Can update the test Person',
        function() {
            testPerson = null;
            stop();
            getTestPerson(changeTestPerson);
        }
    );

    // Step 1: Get test person (this fnc is re-used several times)
    function getTestPerson(succeed) {
        var msgPrefix = 'GET' + testMsgBase;
        $.ajax({
            type: 'GET',
            url: testUrl,
            success: function(result) {
                onCallSuccess(msgPrefix);
                okAsync(result.Id === testPersonId,
                    "returned key matches testPerson Id.");
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

    // Step 2: Change test person and save it
    function changeTestPerson(person) {
        testPerson = person;
        origEmail = testPerson.Email;
        testEmail = origEmail === "wardb@contoso.com" ? "CHANGED@contoso.com" : "wardb@contoso.com"; // make it different
        testPerson.Email = testEmail;

        var msgPrefix = 'PUT (change)' + testMsgBase,
            data = JSON.stringify(testPerson);

        $.ajax({
            type: 'PUT',
            url: baseUrl,
            data: data,
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            success: function() {
                onCallSuccess(msgPrefix);
                getTestPerson(confirmUpdated);
            },
            error: function(result) { onError(result, msgPrefix); }
        });
    };

    // Step 3: Confirm test person updated, then call restore
    function confirmUpdated(person) {
        okAsync(person.Email === testEmail, "test person's Email was updated ");
        restoreTestPerson();
    };

    // Step 4: Restore orig test person in db
    function restoreTestPerson() {
        testPerson.Email = origEmail;
        var msgPrefix = 'PUT (restore)' + testMsgBase,
            data = JSON.stringify(testPerson);

        $.ajax({
            type: 'PUT',
            url: baseUrl,
            data: data,
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            success: function() {
                getTestPerson(confirmRestored);
            },
            error: function(result) { onError(result, msgPrefix); }
        });
    };

    // Step 5: Confirm test person was restored
    function confirmRestored(person) {
        okAsync(person.Email === origEmail, "test person's Email was restored ");
        start();
    };

    /////////////////////   
})();