define('messenger',
['amplify', 'config'],
    function (amplify, config) {
        var
            priority = 1,
            
            viewModelActivated = function (options) {
                amplify.publish(config.messages.viewModelActivated, options);
            },
            
            publish = { viewModelActivated: viewModelActivated },
            
            subscribe = function (options) {
                amplify.subscribe(
                    options.topic,
                    options.context,
                    options.callback,
                    priority);
            };

        return {
            publish: publish,
            subscribe: subscribe
        };
    });
