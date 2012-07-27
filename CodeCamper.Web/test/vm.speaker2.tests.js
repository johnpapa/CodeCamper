define(
    'vm-speaker2-tests-function',
    ['ko', 'datacontext', 'config'],
    function (ko, datacontext, config) {
        
        function doNothing() { };

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

        var
            testPersonId = config.currentUserId,
            testRouteData = { id: testPersonId },
            fakeEmail = 'fake@contoso.com';

        module('speaker viewmodel tests',
            {
                setup: function () {
                },
                teardown: function () {
                }
            });

        asyncTest('Update speaker and viewmodel is dirty',
            function() {
                //ARRANGE
                var vmSpeaker = window.testFn(ko, datacontext, config, fakeMessenger, fakeRouter);
                vmSpeaker.activate(testRouteData, function () {

                    var
                        speaker = vmSpeaker.speaker(),
                        originalEmail = speaker.email();

                    //ACT
                    speaker.email(fakeEmail);

                    //ASSERT
                    ok(speaker.isDirty(), 'Emailed changed and speaker is dirty');
                    
                    //RESET
                    speaker.email(originalEmail);
                    start();
                });
            }
        );

        asyncTest('Get speaker and viewmodel is NOT dirty',
            function () {
                //ARRANGE
                var vmSpeaker = window.testFn(ko, datacontext, config, fakeMessenger, fakeRouter);
                vmSpeaker.activate(testRouteData, function () {

                    //ACT
                    var speaker = vmSpeaker.speaker();

                    //ASSERT
                    ok(!speaker.isDirty(), 'Verified that speaker is NOT dirty yet');
                    
                    //RESET
                    start();
                });
            }
        );
    });