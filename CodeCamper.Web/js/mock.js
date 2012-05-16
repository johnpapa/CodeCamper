// Depends on 
//	jQuery
//
// Conventions
//	All mock data is exposed through data  property
// 	toggle mock usage on and off through useMocks property
// ----------------------------------------------
var my = my || {};

// Adding the @SPEAKER_FIRST_NAME keyword
//$.mockJSON.random = false;
$.mockJSON.log = false;
$.mockJSON.data.SPEAKER_FIRST_NAME = ['John', 'Dan', 'Scott', 'Hans', 'Ward'];
$.mockJSON.data.SPEAKER_LAST_NAME = ['Papa', 'Wahlin', 'Guthrie', 'Fjällemark', 'Bell'];
$.mockJSON.data.DATE_TODAY = [moment().format('MMMM DD YYYY')];
//$.mockJSON.data.DATE_NOW = [Date.create().format('{Weekday} {Month} {d} {hh}:{mm} {tt} {yyyy}')];
$.mockJSON.data.TAG = ['JavaScript', 'Knockout', 'MVVM', 'HTML5', 'Keynote', 'SQL', 'CSS', 'Metro', 'UX'];
$.mockJSON.data.TRACK = ['Windows 8', 'JavaScript', 'ASP.NET', '.NET', 'Data', 'Mobile', 'Cloud', 'Practices', 'Design'];
$.mockJSON.data.TITLE = [
    'Building HTML and JavaScript Apps with KnockoutJS and MVVM',
    'JsRender Fundamentals',
    'Introduction to Building Windows 8 Metro Applications',
    'Building ASP.NET MVC Apps with EF Code First, HTML5, and jQuery',
    'jQuery Fundamentals',
    'Structuring JavaScript Code',
    'Keynote'
];
$.mockJSON.data.LEVELS = ["Beginner", "Intermediate", "Advanced"];

my.mock = (function ($) {
    var 
		useMocks = true,
        sessions = function () {
            return $.mockJSON.generateFromTemplate({
                'sessions|10-20': [{
                    'id|+1': 1,
                    speaker: { 
                        firstName: '@SPEAKER_FIRST_NAME',
                        lastName: '@SPEAKER_LAST_NAME' //, 
                    },
                    imageName: '../content/' + '@SPEAKER_FIRST_NAME' + '.jpg',
                    code: '@LOREM',
                    level: '@LEVEL',
                    title: '@TITLE',
                    description: '@LOREM_IPSUM',
                    track: '@TRACK',
                    date: '@DATE_TODAY @TIME_HH:@TIME_MM:@TIME_SS +0000',
                    'tags|1-5': '@TAG ,' 
                }]
            })
        }
    return {
		useMocks: useMocks,
		models: { sessions: sessions },
		dataservice : {}
    }
})(jQuery);
