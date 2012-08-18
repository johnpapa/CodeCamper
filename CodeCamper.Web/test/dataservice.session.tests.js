define(
    'dataservice.session-tests-function',
    ['jquery', 'amplify', 'config', ],
    function ($, amplify, config) {

        var doNothing = function () { };

        var retrievalTestSessionId = 1; // Keynote / KEY001

        config.useMocks(true); // this helps me NOT mock datacontext
        config.currentUserId = 3;
        config.currentUser = function () { return { id: function () { return 3; } }; };
        config.logger = { success: doNothing };
        config.dataserviceInit();

        var findDs = function () {
            return window.testFn(amplify);
            //return window.testFn($); // purely for the course to test the non amplify version
        };

        module('Session Data Services return data');

        asyncTest('getSessionBriefs returns array SessionBrief objects',
            function () {
                //ARRANGE
                var ds = findDs();
                
                //ACT
                ds.getSessionBriefs({

                    //ASSERT
                    success: function (result) {
                        ok(result && result.length > 0, 'Got SessionBriefs');
                        start();
                    }, 
                    error: function (result) {
                        ok(false, 'Failed with: ' + result.responseText);
                        start();
                    }
                });
            });

        asyncTest('getSessions returns array Session objects',
            function () {
                //ARRANGE
                var ds = findDs();

                //ACT
                ds.getSessions({

                    //ASSERT
                    success: function (result) {
                        ok(result && result.length > 0, 'Got Sessions');
                        start();
                    },
                    error: function (result) {
                        ok(false, 'Failed with: ' + result.responseText);
                        start();
                    }
                });
            });

        asyncTest('getSession returns 1 Session object',
            function () {
                //ARRANGE
                var ds = findDs();

                //ACT
                ds.getSession({

                    //ASSERT
                    success: function (result) {
                        ok(result && result.code === 'KEY001', 'Got 1 Session, the Keynote');
                        start();
                    },
                    error: function (result) {
                        ok(false, 'Failed with: ' + result.responseText);
                        start();
                    }
                }, retrievalTestSessionId);
            });

        module('Session Data Services update data');

        asyncTest('updateSession updates description',
            function () {

                //ARRANGE
                var ds = findDs();
                var toggleDescription = function(s, changeIt) {
                    s.description = changeIt ? 'C H A N G E D' : 'Change the World';
                };
                ds.getSession({
                    success: 
                        function (result) {
                            var testSession = result;

                            //ACT
                            toggleDescription(testSession, true);
                            var testSessionJSON = JSON.stringify(testSession);

                            ds.updateSession({

                                //ASSERT
                                success: function (result) {
                                    ds.getSession(
                                        {
                                            success:
                                                function (result) {
                                                    var testSession2ndTry = result;

                                                    ok(testSession2ndTry.description, testSession.description, 'Description was updated successfully');

                                                    //RESET
                                                    toggleDescription(testSession, false);
                                                    testSessionJSON = JSON.stringify(testSession);
                                                    ds.updateSession({
                                                        success: function () { start(); },
                                                        error: function () { start(); }
                                                    }, testSessionJSON);
                                                },
                                            error: function (result) {
                                                ok(false, 'Failed with: ' + result.responseText);
                                                start();
                                            }
                                        }, 
                                        retrievalTestSessionId)
                                }, 
                                error: function (result) {
                                    ok(false, 'Failed with: ' + result.responseText);
                                    start();
                                }
                            }, testSessionJSON);
                        },
                    error: function(result) {
                        ok(false, 'Failed with: ' + result.responseText);
                        start();
                    }
                }, retrievalTestSessionId);
            });

    });