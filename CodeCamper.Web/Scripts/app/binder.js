define('binder',
    ['jquery', 'ko', 'config', 'vm'],
    function ($, ko, config, vm) {
        var
            bind = function () {
                ko.applyBindings(vm.shell, getView(config.viewIds.shellTop));
                ko.applyBindings(vm.favorites, getView(config.viewIds.favorites));
                ko.applyBindings(vm.session, getView(config.viewIds.session));
                ko.applyBindings(vm.sessions, getView(config.viewIds.sessions));
                ko.applyBindings(vm.speaker, getView(config.viewIds.speaker));
                ko.applyBindings(vm.speakers, getView(config.viewIds.speakers));
            },
            
            getView = function (viewName) {
                return $(viewName).get(0);
            };
            
        return {
            bind: bind
        };
    });