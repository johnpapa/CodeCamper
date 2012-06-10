define(['ko'],
    function (ko) {

        var imageBasePath = '../content/images/',
            unknownPersonImageSource = 'unknown_person.jpg';

        // To avoid a circular model/datacontext reference
        // model.datacontext is set in Bootstrapper
        var _datacontext,
            datacontext = function(dc) {
                if (!!dc) {
                    _datacontext = dc;
                }
                return _datacontext;
            };       

        // Attendance
        // ----------------------------------------------
        var attendanceMakeId = function (personId, sessionId) {
            return (personId + "," + sessionId);
        };
            
        var Attendance = function () {
            var self = this;
            self.datacontext = datacontext;
            self.sessionId = ko.observable();
            self.personId = ko.observable();
            
            // id is string compound key {personId,sessionId} like "3,10"    
            self.id = ko.computed({
                read: function () {
                    return attendanceMakeId(self.personId(), self.sessionId());
                },
                write: function (value) {
                    var idparts = value.split(",");
                    self.personId(parseInt(idparts[0]));
                    self.sessionId(parseInt(idparts[1]));
                }
            }),
            
            self.rating = ko.observable();
            self.text = ko.observable();
            //self.dirtyFlag = new ko.DirtyFlag(self);
            self.dirtyFlag = new ko.DirtyFlag([self.rating, self.text]);
            return self;
        };

        var attendanceNullo = new Attendance()
            .sessionId(0)
            .personId(0)
            .rating(0)
            .text('');
        attendanceNullo.dirtyFlag().reset();
        attendanceNullo.isNullo = true;

        Attendance.makeId = attendanceMakeId;
        
        Attendance.prototype = function () {
            person = function () {
                return this.datacontext().persons.getLocalById(this.personId());
            },
            session = function () {
                return this.datacontext().sessions.getLocalById(this.sessionId());
            };
            return {
                isNullo: false,
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
            self.isNullo = false;
            return self;
        };

        var roomNullo = new Room()
            .id(0)
            .name('Not a room');
        roomNullo.isNullo = true;

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
            self.rating = ko.observable();
            self.description = ko.observable();
            self.isBusy = false; 
            self.isFavoriteUpdate = ko.observable(); 

            self.tagsFormatted = ko.computed(function () {
                var text = self.tags();
                return text ? text.replace(/\|/g, ', ') : text;
            }),

            self.isFavorite = ko.computed({
                read: function () {
                    var id = self.id();
                    self.isFavoriteUpdate(); // This exists so we can notify the isFavorite to reevaluate
                    var match = self.attendance() ? self.attendance().sessionId() === id : null;
                    return !!match;
                },

                 // Chicken and the egg kind of situation (attendance or datacontext are setup later)
                 // The "deferEvalation" flag will prevent it from running immediately
                 // and it will wait until something actually tries to access its value.
                deferEvaluation: true,
                
                write: function (value) {
                    //TODO:  explain this
                    // Made this a no-op because without the write, 
                    // when the checkbox is clicked it fires the click event twice 
                    // and sets the computed = true (not the function)
                    return;
                },
                owner: self
            }),

            self.isUnlocked = ko.computed({
                read: function () {
                    var
                        attendance = self.attendance(),
                        unlocked = !(attendance.rating() > 0 || (attendance.text() && attendance.text().length > 0));

                    self.isFavoriteUpdate(); // This exists so we can notify ifthe isFavorite to reevaluate

                    return unlocked;
                },
                deferEvaluation: true,
            }),

            self.isBrief = ko.observable(true);

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
        sessionNullo.isNullo = true;
        sessionNullo.isBrief = function() { return false; }; // nullo is never brief
        
        Session.prototype = function () {
            var
                attendance = function () {
                    return this.datacontext().attendance.getSessionFavorite(this.id());
                },
                
                room = function () {
                    return this.datacontext().rooms.getLocalById(this.roomId());
                },

                speaker = function () {
                    //TODO: do i get from persons or speakers?
                    return this.datacontext().persons.getLocalById(this.speakerId());
                },

                timeslot = function () {
                    return this.datacontext().timeslots.getLocalById(this.timeslotId());
                },

                track = function () {
                    return this.datacontext().tracks.getLocalById(this.trackId());
                };

            return {
                isNullo : false,
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
            self.isBrief = ko.observable(true);
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
        personNullo.isNullo = true;
        personNullo.isBrief = function () { return false; }; // nullo is never brief

        Person.prototype = function() {
            //TODO: Ward ... YAGNI or NOT?
            //var attendanceList = function () {
            //        return this.datacontext().attendance.getByPersonId(this.personId());
            //}
            return {
                //attendanceList: attendanceList,
                isNullo: false
            };
        }();

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
            self.isNullo = false;
            return self;
        };

        var timeSlotNullo = new TimeSlot()
            .id(0)
            .start(new Date(2012, 4, 18, 1, 0, 0, 0))
            .duration(60);
        timeSlotNullo.isNullo = true;

        // Track
        // ----------------------------------------------
        var Track = function () {
            var self = this;
            self.datacontext = datacontext;
            self.id = ko.observable();
            self.name = ko.observable();
            self.isNullo = false;
            return self;
        };

        var trackNullo = new Track()
            .id(0)
            .name('Not a track');
        Track.isNullo = true;

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