define('vm.shell',
    ['ko', 'config'],
    function (ko, config) {
        var
            currentUser = config.currentUser,

            menuHashes = config.hashes,

            activate = function (routeData) {
                //No-Op for now
            },
            
            init = function () {
                activate();
            };

        init();

        return {
            activate: activate,
            currentUser: currentUser,
            menuHashes: menuHashes
        };
    });