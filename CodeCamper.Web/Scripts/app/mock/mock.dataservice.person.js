define('mock/mock.dataservice.person',
    ['amplify'],
    function (amplify) {
        var
		    defineApi = function (model) {

		    amplify.request.define('speakers', function (settings) {
		        settings.success(model.generatePersons().persons);
		    });

		    amplify.request.define('persons', function (settings) {
		        settings.success(model.generatePersons().persons);
		    });

		    amplify.request.define('person', function (settings) {
		        settings.success(model.generatePersons().persons[0]);
		    });
		    
		    amplify.request.define('personUpdate', function (settings) {
		        settings.success();
		    });
		};
        
        return {
            defineApi: defineApi
        };
    });
