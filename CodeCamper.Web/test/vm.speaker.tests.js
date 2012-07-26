define(
    'vm-speaker-tests-function',
    ['ko', 'datacontext', 'config'],
    function (ko, datacontext, config) {

        function doNothing() { };

        // Overriding part of config
        //var
        //    fakeConfig = {
        //        useMocks: true, // this helps me NOT mock datacontext
        //        currentUserId: 4,
        //        currentUser: function () { return { id: function () { return 4; } }; },
        //        logger: { success: doNothing } //,
        //    };
        //fakeConfig = config;
        config.useMocks(true); // this helps me NOT mock datacontext
        config.currentUserId = 3;
        config.currentUser = function () { return { id: function () { return 4; } }; };
        config.logger = { success: doNothing };
        config.dataserviceInit();


        var fakeMessenger = {
            publish: { viewModelActivated: doNothing }
        };

        var fakeRouter = {
            navigateBack: doNothing
        };

        //QUnit.config.testTimeout = 10000;
        //QUnit.config.autostart = false;
        //QUnit.start();

        var
            vmSpeaker = window.testFn(ko, datacontext, config, fakeMessenger, fakeRouter),
            testPersonId = config.currentUserId,
            testRouteData = { id: testPersonId };

        module('speaker viewmodel tests',
            {
                setup: function () {
                }
            });

        test('Update speaker and viewmodel is dirty',
            function () {
                //ARRANGE
                stop();
                vmSpeaker.activate(testRouteData, function () {
                    start();

                    //ACT
                    var speaker = vmSpeaker.speaker();

                    //ASSERT
                    equal(speaker.firstName(), 'John', 'Got speaker John Papa');
                    ok(!speaker.isDirty(), 'Verified that speaker is NOT dirty yet');
                    speaker.email('new@email.com');
                    ok(speaker.isDirty(), 'Emailed changed and speaker is dirty');
                });
            }
        );


    });