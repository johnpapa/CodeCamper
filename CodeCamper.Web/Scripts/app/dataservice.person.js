define(['amplify'],
    function (amplify) {
    var init = function() {
        amplify.request.define('speakers', 'ajax', {
            url: '/api/persons/speakers',
            dataType: 'json',
            type: 'GET'
            //cache:
        }),
        amplify.request.define('persons', 'ajax', {
            url: '/api/persons',
            dataType: 'json',
            type: 'GET'
            //cache:
        });
    },
        getSpeakers = function(callbacks) {
            return amplify.request({
                resourceId: "speakers",
                success: callbacks.success,
                error: callbacks.error
            });
        },
        getPersons = function(callbacks) {
            return amplify.request({
                resourceId: "persons",
                success: callbacks.success,
                error: callbacks.error
            });
        };

    init();
  
    return {
        getPersons: getPersons,
        getSpeakers: getSpeakers
    };
});


