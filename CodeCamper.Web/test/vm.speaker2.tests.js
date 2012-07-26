define(
    'vm-speaker2-tests-function',
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
        config.currentUser = function() { return { id: function() { return 3; } }; };
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
            //vmSpeaker, // = window.testFn(ko, datacontext, config, fakeMessenger, fakeRouter),
            testPersonId = config.currentUserId,
            testRouteData = { id: testPersonId };

        module('speaker viewmodel tests',
            {
                setup: function () {
                    //vmSpeaker = window.testFn(ko, datacontext, config, fakeMessenger, fakeRouter);
                },
                teardown: function () {
                    //vmSpeaker.cancel();
                    //vmSpeaker = null;
                    ok(true, 'teardown');
                }
            });

        test('Update speaker and viewmodel is dirty',
            function() {
                console.log('about to stop-1');
                stop();
                
                vmSpeaker = window.testFn(ko, datacontext, config, fakeMessenger, fakeRouter);
                vmSpeaker.activate(testRouteData, function () {
                    //ARRANGE
                    var speaker = vmSpeaker.speaker();

                    //ACT
                    speaker.email('new@email.com');

                    //ASSERT
                    ok(speaker.isDirty(), 'Emailed changed and speaker is dirty');
                    console.log('about to start-2');
                    vmSpeaker.cancel();
                    start();
                });
            }
        );

        test('Get speaker and viewmodel is NOT dirty',
            function () {
                console.log('about to stop-3');
                stop();
                
                var vmSpeaker = window.testFn(ko, datacontext, config, fakeMessenger, fakeRouter);
                vmSpeaker.activate(testRouteData, function () {
                    //ARRANGE

                    //ACT
                    var speaker = vmSpeaker.speaker();

                    //ASSERT
                    ok(!speaker.isDirty(), 'Verified that speaker is NOT dirty yet');
                    console.log('about to start-4');
                    vmSpeaker.cancel();
                    start();
                });
            }
        );
    });