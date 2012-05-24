// Depends on 
//	Amplify.js
// ----------------------------------------------
var app = app || {};

app.dataservice = app.dataservice || {}

app.dataservice.person = (function (amplify) {
    var
        init = function () {
            amplify.request.define('persons', 'ajax', {
                url: '/api/persons',
                dataType: 'json',
                type: 'GET'
                //cache:
            }),
            amplify.request.define('speakers', 'ajax', {
                url: '/api/persons',
                dataType: 'json',
                type: 'GET'
                //cache:
            })
        },
        getSpeakers = function (callbacks) {
            return amplify.request({
                resourceId: "speakers",
                //data: { sessionType: sessionType }, //TODO: dont need it ?
                success: callbacks.success,
                error: callbacks.error
            })
        },
        getPersons = function (callbacks) {
            return amplify.request({
                resourceId: "persons",
                //data: { sessionType: sessionType }, //TODO: dont need it ?
                success: callbacks.success,
                error: callbacks.error
            })
        };
    return {
        init: init,
        getPersons: getPersons,
        getSpeakers: getSpeakers
    }
})(amplify);

app.dataservice.person.init();
