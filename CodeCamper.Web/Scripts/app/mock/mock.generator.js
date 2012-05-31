// Depends on
//	jQuery
//
// Conventions
//	All mock data is exposed through data  property
// 	toggle mock usage on and off through useMocks property
// ----------------------------------------------
define(['jquery', 'moment'],
    function($, moment) {
        var init = function() {
            $.mockJSON.random = true;
            $.mockJSON.log = false;
            $.mockJSON.data.SPEAKER_FIRST_NAME = ['John', 'Dan', 'Scott', 'Hans', 'Ward', 'Jim', 'Ryan'];
            $.mockJSON.data.SPEAKER_LAST_NAME = ['Papa', 'Wahlin', 'Guthrie', 'Fjällemark', 'Bell', 'Cowart', 'Niemeyer'];
            $.mockJSON.data.IMAGE_SOURCE = ['john_papa.jpg', 'dan_wahlin.jpg', 'scott_guthrie.jpg', 'hans_fjallemark.jpg', 'ward_bell.jpg', 'jim_cowart.jpg', 'ryan_niemeyer.jpg'];
            $.mockJSON.data.DATE_TODAY = [moment().format('MMMM DD YYYY')];
            $.mockJSON.data.DATE_FULL = [new Date()];
            $.mockJSON.data.TAG = ['JavaScript', 'Knockout', 'MVVM', 'HTML5', 'Keynote', 'SQL', 'CSS', 'Metro', 'UX'];
            $.mockJSON.data.TRACK = ['Windows 8', 'JavaScript', 'ASP.NET', '.NET', 'Data', 'Mobile', 'Cloud', 'Practices', 'Design'];
            $.mockJSON.data.TITLE = [
                'Building HTML/JavaScript Apps with Knockout and MVVM',
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
            $.mockJSON.data.RATING = [1, 2, 3, 4, 5];
        },
            generateAttendance = function() {
                return $.mockJSON.generateFromTemplate({
                    'attendance|8-16': [{
                        'PersonId': 1,
                        'SessionId|+1': 1,
                        Rating: '@RATING',
                        Text: '@LOREM_IPSUM'
                    }]
                });
            },
            generateRooms = function() {
                return $.mockJSON.generateFromTemplate({
                    'rooms|10-20': [{
                        'Id|+1': 1,
                        Name: '@LOREM'
                    }]
                });
            },
            generateSessions = function() {
                return $.mockJSON.generateFromTemplate({
                    'sessions|100-120': [{
                        'Id|+1': 1,
                        Title: '@TITLE',
                        Code: '@LOREM',
                        'SpeakerId|1-50': 1,
                        'TrackId|1-10': 1,
                        'TimeSlotId|1-15': 1,
                        'RoomId|1-10': 1,
                        Level: '@LEVEL',
                        'Tags|1-5': '@TAG ,',
                        Description: '@LOREM_IPSUM'
                    }]
                });
            },
            generatePersons = function() {
                return $.mockJSON.generateFromTemplate({
                    'persons|50-60': [{
                        'Id|+1': 1,
                        FirstName: '@SPEAKER_FIRST_NAME',
                        LastName: '@SPEAKER_LAST_NAME',
                        Email: '@EMAIL',
                        Blog: '@URL',
                        TWITTER: 'http://twitter.com/@' + '@TWITTER',
                        GENDER: '@GENDER',
                        ImageSource: '@IMAGE_SOURCE',
                        Bio: '@LOREM_IPSUM'
                    }]
                });
            },
            generateTimeslots = function() {
                return $.mockJSON.generateFromTemplate({
                    'timeslots|15-20': [{
                        'Id|+1': 1,
                        Start: '@DATE_FULL',
                        Duration: 60
                    }]
                });
            },
            generateTracks = function() {
                return $.mockJSON.generateFromTemplate({
                    'tracks|10-15': [{
                        'Id|+1': 1,
                        Name: '@LOREM'
                    }]
                });
            };

        init();
        // ToDo: get rid of model?
        return {
            model: {
                generateAttendance: generateAttendance,
                generateRooms: generateRooms,
                generateSessions: generateSessions,
                generatePersons: generatePersons,
                generateTimeslots: generateTimeslots,
                generateTracks: generateTracks
            }
        };
    });
