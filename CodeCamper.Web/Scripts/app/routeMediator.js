define(['amplify', 'config'],
    function (amplify, config) {
        var
            logger = config.logger,
            canleaveCallback,
            priority = 1,
            self = this,

            viewModelActivated = function (options) {
                canleaveCallback = options && options.canleaveCallback;
            },

            canLeave = function () {
                // Check the active view model to see if we can leave it
                var
                    val = canleaveCallback ? canleaveCallback() : true,
                    response = { val: val, message: 'Cannot leave view. Pending operation.' }; //TODO: revise message
                return response;
            },

            subscribeToViewModelActivations = function () {
                var context = self;
                amplify.subscribe(config.messages.viewModelActivated, context, viewModelActivated, priority);
            },

            init = function () {
                subscribeToViewModelActivations();
            };

        init();

        return {
            canLeave: canLeave
        };
    });
