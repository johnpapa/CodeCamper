define(
    'vm-session-tests-function',
    ['ko', 'datacontext', 'config', 'sort'],
    function (ko, datacontext, config, sort) {

        var doNothing = function () { };

        config.useMocks(true); // this helps me NOT mock datacontext
        config.currentUserId = 3;
        config.currentUser = function () { return { id: function () { return 3; } }; };
        config.logger = { success: doNothing };
        config.dataserviceInit();

        var fakeMessenger = {
            publish: { viewModelActivated: doNothing }
        };

        var fakeRouter = {
            navigateBack: doNothing
        };

        var
            testPersonId = config.currentUserId,
            testRouteData = { id: testPersonId },
            fakeTitle = 'fake title';

        var findVm = function () {
            return window.testFn(ko, datacontext, config, fakeRouter, fakeMessenger, sort);
        };

        module('session viewmodel tests');

        asyncTest('Update session and viewmodel is dirty',
            function () {
                //ARRANGE
                var vmSession = findVm();
                
                vmSession.activate(testRouteData, function () {

                    var
                        session = vmSession.session(),
                        originalTitle = session.title();

                    //ACT
                    session.title(fakeTitle);

                    //ASSERT
                    ok(session.isDirty(), 'Title changed and session is dirty');

                    //RESET
                    session.title(originalTitle);
                    start();
                });
            }
        );

        asyncTest('Get session and viewmodel is NOT dirty',
            function () {
                //ARRANGE
                var vmSession = findVm();

                vmSession.activate(testRouteData, function () {

                    //ACT
                    var session = vmSession.session();

                    //ASSERT
                    ok(!session.isDirty(), 'Verified that session is NOT dirty yet');

                    //RESET
                    start();
                });
            }
        );

        asyncTest('Update session title to empty string and viewmodel is invalid',
            function () {
                //ARRANGE
                var vmSession = findVm();

                vmSession.activate(testRouteData, function () {

                    var
                        session = vmSession.session(),
                        originalTitle = session.title();

                    //ACT
                    session.title('');

                    //ASSERT
                    ok(!session.isValid(), 'Title changed to empty string and session is invalid');

                    //RESET
                    session.title(originalTitle);
                    start();
                });
            }
        );

        asyncTest('Update session title and viewmodel is valid',
            function () {
                //ARRANGE
                var vmSession = findVm();

                vmSession.activate(testRouteData, function () {

                    var
                        session = vmSession.session(),
                        originalTitle = session.title();

                    //ACT
                    session.title('valid title value');

                    //ASSERT
                    ok(session.isValid(), 'Title changed to valid value  and session is valid');

                    //RESET
                    session.title(originalTitle);
                    start();
                });
            }
        );



    });