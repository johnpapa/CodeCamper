// Depends on
//  ko
//  config
//  datacontext (at runtime, for reference/navigation)
//
// ----------------------------------------------
define(['ko', 'config'],
    function (ko, config) {

        var imageBasePath = '../content/',
            unknownPersonImageSource = 'unknown_person.jpg';

        // To avoid a circular model/datacontext reference
        // model.datacontext is set in Bootstrapper
        var _datacontext,
            datacontext = function (dc) {
                if (!!dc) {
                    _datacontext = dc;
                }
                return _datacontext;
            };

        // Attendance
        // ----------------------------------------------
        var Attendance = function () {
            var self = this;
            self.datacontext = datacontext;
            self.sessionId = ko.observable();
            self.personId = ko.observable();
            self.rating = ko.observable();
            self.text = ko.observable();
            return self;
        };

        var attendanceNullo = new Attendance()
            .sessionId(0)
            .personId(0)
            .rating(0)
            .text('');

        Attendance.prototype = function () {
            var person = function () {
                return this.datacontext().persons.getById(this.personId());
            },
                session = function () {
                    return this.datacontext().sessions.getById(this.sessionId());
                };
            return {
                person: person,
                session: session
            };
        }();

        // Room
        // ----------------------------------------------
        var Room = function () {
            var self = this;
            self.datacontext = datacontext;
            self.id = ko.observable();
            self.name = ko.observable();
            return self;
        };

        var roomNullo = new Room()
            .id(0)
            .name('Not a room');

        // Session
        // ----------------------------------------------
        var Session = function () {
            var self = this;
            self.datacontext = datacontext;
            self.id = ko.observable();
            self.title = ko.observable();
            self.code = ko.observable();
            self.speakerId = ko.observable();
            self.trackId = ko.observable();
            self.timeslotId = ko.observable();
            self.roomId = ko.observable();
            self.level = ko.observable();
            self.tags = ko.observable();
            self.description = ko.observable();

            self.tagsFormatted = ko.computed(function () {
                var text = self.tags();
                return text ? text.replace(/\|/g, ', ') : text;
            }),
            self.isFavorite = ko.computed({
                read: function () {
                    var id = self.id();
                    //var match = self.datacontext && self.attendance ? self.attendance().sessionId() === id : null;
                    var match = self.attendance ? self.attendance().sessionId() === id : null;
                    return !!match;
                },
                // Chicken and the egg kind of situation (attendance or datacontext are setup later.
                // The "deferEvalation" flag will prevent it from running immediately
                // and it will wait until something actually tries to access its value.
                deferEvaluation: true,
                write: function (value) {
                    //TODO: come back and fix this when we get to the SESSIONS screen
                    //if (!self.attendance) return;

                    if (value) {
                        //create attendance
                        var newObj = new Attendance()
                            .sessionId(self.id())
                            .personId(config.currentUser().id());
                        self.datacontext().attendance.add(newObj, 'sessionId');

                        // Explicitly set the flag so we can force the re-evauation of the read
                        self.id.valueHasMutated();
                    } else if (!value && this.datacontext) {
                        // remove attendance
                        self.datacontext().attendance.removeById(self.id(), 'sessionId');
                    }
                },
                owner: self
            });

            return self;
        };

        var sessionNullo = new Session()
            .id(0)
            .title('Not a Session')
            .code('XYZ123')
            .speakerId(0)
            .trackId(0)
            .timeslotId(0)
            .roomId(0)
            .description('')
            .level('')
            .tags('');

        Session.prototype = function () {
            var attendance = function () {
                return this.datacontext().attendance.getById(this.id());
            },
                room = function () {
                    return this.datacontext().rooms.getById(this.roomId());
                },
                speaker = function () {
                    return this.datacontext().persons.getById(this.speakerId()); //TODO: do i get from persons or speakers?
                },
                timeslot = function () {
                    return this.datacontext().timeslots.getById(this.timeslotId());
                },
                track = function () {
                    return this.datacontext().tracks.getById(this.trackId());
                };

            return {
                attendance: attendance,
                speaker: speaker,
                room: room,
                timeslot: timeslot,
                track: track
            };
        }();

        // Person
        // ----------------------------------------------
        var Person = function () {
            var self = this;
            self.datacontext = datacontext;
            self.id = ko.observable();
            self.firstName = ko.observable();
            self.lastName = ko.observable();
            self.fullName = ko.computed(function () {
                return self.firstName() + ' ' + self.lastName();
            }, self);

            self.email = ko.observable();
            self.blog = ko.observable();
            self.twitter = ko.observable();
            self.gender = ko.observable();
            self.imageSource = ko.observable();
            self.imageName = ko.computed(function () {
                var source = self.imageSource();
                if (!source) {
                    source = unknownPersonImageSource;
                }
                return imageBasePath + source;
            }, self);
            self.bio = ko.observable();
            return self;
        };

        var personNullo = new Person()
            .id(0)
            .firstName('Not a')
            .lastName('Person')
            .email('')
            .blog('')
            .twitter('')
            .gender('M')
            .imageSource('')
            .bio('');

        //TODO:
        //Person.prototype = function () {
        //    var
        //        attendanceList = function () {
        //            return this.datacontext().attendance.getByPersonId(this.personId());
        //        }
        //    return {
        //        attendanceList: attendanceList
        //    }
        //}()

        // Timeslot
        // ----------------------------------------------
        var TimeSlot = function () {
            var self = this;
            self.datacontext = datacontext;
            self.id = ko.observable();
            self.start = ko.observable();
            self.duration = ko.observable();
            self.dateOnly = ko.computed(function () {
                return self.start() ? moment(self.start()).format('MM-DD-YYYY') : '';
            }, self);
            //self.displayDate = ko.computed(function () {
            //    return self.start() ? moment(self.start()).format('ddd MMM DD') : '';
            //}, self);
            self.fullStart = ko.computed(function () {
                return self.start() ? moment(self.start()).format('dddd hh:mm a') : '';
            }, self);
            self.shortStart = ko.computed(function () {
                return self.start() ? moment(self.start()).format('ddd hh:mm a') : '';
            }, self);
            self.dayStart = ko.computed(function () {
                return self.start() ? moment(self.start()).format('dddd MMM Do') : '';
            }, self);
            return self;
        };

        var timeSlotNullo = new TimeSlot()
            .id(0)
            .start(new Date(2012, 4, 18, 1, 0, 0, 0))
            .duration(60);

        // Track
        // ----------------------------------------------
        var Track = function () {
            var self = this;
            self.datacontext = datacontext;
            self.id = ko.observable();
            self.name = ko.observable();
            return self;
        };

        var trackNullo = new Track()
            .id(0)
            .name('Not a track');

        return {

            imageBasePath: imageBasePath,
            unknownPersonImageSource: unknownPersonImageSource,

            datacontext: datacontext,

            Attendance: Attendance,
            attendanceNullo: attendanceNullo,

            Person: Person,
            personNullo: personNullo,

            Room: Room,
            roomNullo: roomNullo,

            Session: Session,
            sessionNullo: sessionNullo,

            TimeSlot: TimeSlot,
            timeSlotNullo: timeSlotNullo,

            Track: Track,
            trackNullo: trackNullo
        };
    });