define('vm.shell',
    ['ko', 'config'],
    function (ko, config) {

        var
            currentUser = config.currentUser,

            demoUsers = ko.observableArray([]),

            activate = function (routeData) {
                //No-Op for now
            },
            
            init = function () {
                activate();
            };

        init();

        return {
            currentUser: currentUser,
            demoUsers: demoUsers,
            activate: activate
        };
    });