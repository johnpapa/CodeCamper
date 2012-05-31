define(['amplify'],
    function (amplify) {
        var
		defineApi = function (model) {

		    //TODO: Come back and fix this. Only get ones that are speakers
		    amplify.request.define('speakers', function (settings) {
		        settings.success(model.generatePersons().persons());
		    });

		    amplify.request.define('persons', function (settings) {
		        settings.success(model.generatePersons().persons);
		    });
		};
        return {
            defineApi: defineApi
        };
    });
