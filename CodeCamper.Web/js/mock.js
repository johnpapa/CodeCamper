// Depends on 
//	jQuery
//
// Conventions
//	All mock data is exposed through data  property
// 	toggle mock usage on and off through useMocks property
// ----------------------------------------------
var my = my || {};
my.mock = (function ($) {
    var 
		useMocks = true,
        sessions = function () {
            return $.mockJSON.generateFromTemplate({
                    'sessions|10-20': [{
                        'id|+1': 1,
                        speaker: { firstName: '@MALE_FIRST_NAME', lastName: '@LAST_NAME'},
                        code: '@LOREM',
                        'level|+10': 100,
                        title: '@LOREM',
                        description: '@LOREM_IPSUM',
                        track: '@LOREM',
                        date: 'Mon Apr 30 @TIME_HH:@TIME_MM:@TIME_SS +0000 2012',
                        tags: '@LOREM'
                    }]
            })
        }
    return {
		useMocks: useMocks,
		models: { sessions: sessions },
		dataservice : {}
    }
})(jQuery);
