// Depends on 
//	jQuery
//
// Conventions
//	All mock data is exposed through data  property
// 	toggle mock usage on and off through useMocks property
// ----------------------------------------------
var app = app || {};

app.mock = (function ($) {
    var
        init = function () {
            //$.mockJSON.random = false;
            $.mockJSON.log = false;
            $.mockJSON.data.SPEAKER_FIRST_NAME = ['John', 'Dan', 'Scott', 'Hans', 'Ward', 'Jim', 'Ryan'];
            $.mockJSON.data.SPEAKER_LAST_NAME = ['Papa', 'Wahlin', 'Guthrie', 'Fjällemark', 'Bell', 'Cowart', 'Niemeyer'];
            $.mockJSON.data.DATE_TODAY = [moment().format('MMMM DD YYYY')];
            $.mockJSON.data.DATE_FULL = [new Date()];
            $.mockJSON.data.TAG = ['JavaScript', 'Knockout', 'MVVM', 'HTML5', 'Keynote', 'SQL', 'CSS', 'Metro', 'UX'];
            $.mockJSON.data.TRACK = ['Windows 8', 'JavaScript', 'ASP.NET', '.NET', 'Data', 'Mobile', 'Cloud', 'Practices', 'Design'];
            $.mockJSON.data.TITLE = [
                'Building HTML and JavaScript Apps with KnockoutJS and MVVM',
                'JsRender Fundamentals',
                'Introduction to Building Windows 8 Metro Applications',
                'Building ASP.NET MVC Apps with EF Code First, HTML5, and jQuery',
                'jQuery Fundamentals',
                'jQuery Tips and Tricks',
                'JavaScript for .NET Developers',
                'jQuery Mobile',
                'Bootstrap',
                'Responsive Web Design',
                'Structuring JavaScript Code',
                'Keynote'
                        ];
            $.mockJSON.data.LEVEL = ["Beginner", "Intermediate", "Advanced"];
            $.mockJSON.data.TWITTER = ['john_papa', 'danwahlin', 'ifthenelse', 'scottgu', 'wardbell'];
            $.mockJSON.data.URL = ['http://www.johnpapa.net', 'http://www.pluralsight.com'];
            $.mockJSON.data.GENDER = ['F', 'M'];
            $.mockJSON.data.RATING = [1,2,3,4,5];
        },
        generateAttendance = function () {
            return $.mockJSON.generateFromTemplate({
                'attendance|8-16': [{
                    'PersonId': 1,
                    'SessionId|+1': 1,
                    Rating: '@RATING',
                    Text: '@LOREM_IPSUM'
                }]
            })
        },
        generateRooms = function () {
            return $.mockJSON.generateFromTemplate({
                'rooms|10-20': [{
                    'Id|+1': 1,
                    Name: '@LOREM'
                }]
            })
        },
        generateSessions = function () {
            return $.mockJSON.generateFromTemplate({
                'sessions|10-20': [{
                    'Id|+1': 1,
                    Title: '@TITLE',
                    Code: '@LOREM',
                    'SpeakerId|+1': 1,
                    'TrackId|+1': 1,
                    'TimeSlotId|+1': 1,
                    'RoomId|+1': 1,
                    Level: '@LEVEL',
                    'Tags|1-5': '@TAG ,',
                    'IsFavorite|0-1': true, //TODO fix this
                    Description: '@LOREM_IPSUM'
                }]
            })
        },
        generateSpeakers = function () {
            return $.mockJSON.generateFromTemplate({
                'speakers|50-60': [{
                    'Id|+1': 1,
                    FirstName: '@SPEAKER_FIRST_NAME',
                    LastName: '@SPEAKER_LAST_NAME',
                    Email: '@EMAIL',
                    Blog: '@URL',
                    TWITTER: 'http://twitter.com/@' + '@TWITTER',
                    GENDER: '@GENDER',
                    ImageSource: '@SPEAKER_FIRST_NAME' + "_" + '@SPEAKER_LAST_NAME' + ".jpg",
                    Bio: '@LOREM_IPSUM'
                    //imageName: '../content/' + '@SPEAKER_FIRST_NAME' + '.jpg' //TODO: do in the mapping
                }]
            })
        },
        generateTimeslots = function () {
            return $.mockJSON.generateFromTemplate({
                'TimeSlots|10-20': [{
                    'Id|+1': 1,
                    Start: '@DATE_FULL',
                    Duration: 60
                }]
            })
        },
        generateTracks = function () {
            return $.mockJSON.generateFromTemplate({
                'Tracks|10-20': [{
                    'Id|+1': 1,
                    Name: '@LOREM'
                }]
            })
        };
    return {
        init: init,
        model: {
            generateAttendance: generateAttendance,
            generateRooms: generateRooms,
            generateSessions: generateSessions,
            generateSpeakers: generateSpeakers,
            generateTimeslots: generateTimeslots,
            generateTracks: generateTracks
        },
		dataservice : {}
    }
})(jQuery);

app.mock.init();