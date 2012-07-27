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
            testPersonId = config.currentUserId,
            testRouteData = { id: testPersonId };

        module('speaker viewmodel tests',
            {
                setup: function () {
                },
                teardown: function () {
                }
            });

        asyncTest('Update speaker and viewmodel is dirty',
            function() {
                console.log('about to stop-1');
                
                //ARRANGE
                var vmSpeaker = window.testFn(ko, datacontext, config, fakeMessenger, fakeRouter);
                vmSpeaker.activate(testRouteData, function () {

                    var
                        speaker = vmSpeaker.speaker(),
                        originalEmail = speaker.email();

                    //ACT
                    speaker.email('new@email.com');

                    //ASSERT
                    ok(speaker.isDirty(), 'Emailed changed and speaker is dirty');
                    console.log('about to start-2');
                    
                    //RESET
                    speaker.email(originalEmail);
                    start();
                });
            }
        );

        asyncTest('Get speaker and viewmodel is NOT dirty',
            function () {
                console.log('about to stop-3');
                
                //ARRANGE
                var vmSpeaker = window.testFn(ko, datacontext, config, fakeMessenger, fakeRouter);
                vmSpeaker.activate(testRouteData, function () {

                    //ACT
                    var speaker = vmSpeaker.speaker();

                    //ASSERT
                    ok(!speaker.isDirty(), 'Verified that speaker is NOT dirty yet');
                    console.log('about to start-4');
                    
                    //RESET
                    start();
                });
            }
        );
    });