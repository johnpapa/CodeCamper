define('store',
    ['jquery', 'amplify'],
    function ($, amplify) {
        var
            clear = function (key) {
                return amplify.store(key, null);
            }

            fetch = function (key) {
                return amplify.store(key);
            }
            save = function (key, value) {
                amplify.store(key, value);
            };

        return {
            clear: clear,
            fetch: fetch,
            save: save
        };
    });