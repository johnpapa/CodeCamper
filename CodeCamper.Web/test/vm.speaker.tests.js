require(['vm', 'config'],
    function (vm, config) {

    QUnit.config.testTimeout = 10000;
    QUnit.config.autostart = false;

    //config.currentUser().id(3);

    QUnit.start();

            var
                vmSpeaker = vm.speaker, //require('vm.speaker'),
                testPersonId = 5, //Ward Bell
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
                        equal(speaker.firstName(), 'Ward', 'Got speaker Ward Bell');
                    });
                }
            );
});
