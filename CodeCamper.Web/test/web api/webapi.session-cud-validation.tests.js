(function () {

    var baseUrl = '/api/sessions';

    asyncTest("Update Session - Null Title - Throws Validation Error",
        function () {
            //ARRANGE
            var
                badTestSession = {
                    title: null,
                    code: "TST123",
                    speakerId: 1,
                    trackId: 1,
                    timeslotId: 1,
                    roomId: 1,
                    description: "This session has no title and should not been valid."
                },
                data = JSON.stringify(badTestSession);

            //ACT
            $.ajax({
                type: 'PUT',
                url: baseUrl,
                data: data,
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',

                // ASSERT
                success: function() {
                    ok(false, 'Validation did not catch the null title');
                    start();
                },
                error: function (result) {
                    debugger;
                    equal(result.responseText, '{\"session.Title\":\"Title is required!\"}', 'Validation caught the null title');
                    start();
                }
            });
        }
    );   
 
})();