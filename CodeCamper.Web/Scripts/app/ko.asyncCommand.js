// By: Hans Fjällemark and John Papa
// https://github.com/CodeSeven/KoLite

define(['ko'],
    function (ko) {
        ko.asyncCommand = function (options) {
            var me = ko.observable(),
                canExecuteDelegate = options.canExecute,
                executeDelegate = options.execute,

                completeCallback = function () {
                    me.isExecuting(false);
                };
            me.isExecuting = ko.observable();
            me.canExecute = ko.computed(function () {
                return canExecuteDelegate ? canExecuteDelegate(me.isExecuting()) : true;
            });
            me.execute = function (argument) {
                var args = []; // Allow for this argument to be passed on to execute delegate
                if (executeDelegate.length === 2) {
                    args.push(argument);
                }

                args.push(completeCallback);
                me.isExecuting(true);
                executeDelegate.apply(this, args);
            };
            return me;
        };
    });