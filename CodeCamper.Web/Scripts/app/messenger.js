define('messenger',
['amplify', 'config'],
    function (amplify, config) {
        var
            viewModelActivated = function (options) {
                amplify.publish(config.messages.viewModelActivated, options);
            },
            
            publish = { viewModelActivated: viewModelActivated };

        return {
            publish: publish
        };
    });
