define(['amplify', 'config'],
    function (amplify, config) {
        var
            logger = config.logger,
            self = this,

            viewModelActivated = function (options) {
                amplify.publish(config.messages.viewModelActivated, options);
            },
            
            publish = { viewModelActivated: viewModelActivated };

        return {
            publish: publish
        };
    });
