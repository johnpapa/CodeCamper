define('binder',
    ['jquery', 'ko', 'config', 'vm'],
    function ($, ko, config, vm) {
        var
            ids = config.viewIds,

            bind = function () {
                ko.applyBindings(vm.shell, getView(ids.shellTop));
                ko.applyBindings(vm.favorites, getView(ids.favorites));
                ko.applyBindings(vm.session, getView(ids.session));
                ko.applyBindings(vm.sessions, getView(ids.sessions));
                ko.applyBindings(vm.speaker, getView(ids.speaker));
                ko.applyBindings(vm.speakers, getView(ids.speakers));
            },
            
            getView = function (viewName) {
                return $(viewName).get(0);
            };
            
        return {
            bind: bind
        };
    });