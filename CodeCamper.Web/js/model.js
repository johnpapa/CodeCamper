// Depends on 
//  app.datacontext (for reference/navigation)
//
// ----------------------------------------------
app.model = app.model || {};

app.model.imageBasePath = '../content/';
app.model.unknownPersonImageSource = 'unknown_person.jpg';

// Attendance
// ----------------------------------------------
app.model.Attendance = function () {
    var self = this;
    self.datacontext = app.datacontext;
    self.sessionId = ko.observable();
    self.personId = ko.observable();
    self.rating = ko.observable();
    self.text = ko.observable();
    return self;
};

app.model.attendanceNullo = new app.model.Attendance()
                .sessionId(0)
                .personId(0)
                .rating(0)
                .text('');
app.model.Attendance.prototype = function () {
    var
        speaker = function () {
            return this.datacontext.speakers.getById(this.speakerId());
        },
        session = function () {
            return this.datacontext.sessions.getById(this.sessionId());
        };
    return {
        speaker: speaker,
        session: session
    };
}();

// Room
// ----------------------------------------------
app.model.Room = function () {
    var self = this;
    self.datacontext = app.datacontext;
    self.id = ko.observable();
    self.name = ko.observable();
    return self;
};

app.model.roomNullo = new app.model.Room()
                .id(0)
                .name('Not a room');

// Session
// ----------------------------------------------
app.model.Session = function () {
    var self = this;
    self.datacontext = app.datacontext;
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
            var match = self.datacontext && self.attendance ? self.attendance().sessionId() === id : null;
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
                var newObj = new app.model.Attendance()
                    .sessionId(self.id())
                    .personId(app.currentUser().id());
                self.datacontext.attendance.add(newObj, 'sessionId');

                // Explicitly set the flag so we can force the re-evauation of the read
                self.id.valueHasMutated()
            } else if (!value && this.datacontext) {
                // remove attendance
                self.datacontext.attendance.removeById(self.id(), 'sessionId');
            }
        },
        owner: self
    });
    
    return self;
};

app.model.sessionNullo = new app.model.Session()
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

app.model.Session.prototype = function () {
    var
        attendance = function () {
            return this.datacontext.attendance.getById(this.id());
        },
        room = function() {
            return this.datacontext.rooms.getById(this.roomId());
        },
        speaker = function() {
            return this.datacontext.speakers.getById(this.speakerId());
        },
        timeslot = function() {
            return this.datacontext.timeslots.getById(this.timeslotId());
        },
        track = function() {
            return this.datacontext.tracks.getById(this.trackId());
        };

    return {
        attendance: attendance,
        speaker: speaker,
        room: room,
        timeslot: timeslot,
        track: track
    };
}();

// Speaker
// ----------------------------------------------
app.model.Speaker = function () {
    var self = this;
    self.datacontext = app.datacontext;
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
            source = app.model.unknownPersonImageSource;
        }
        return app.model.imageBasePath + source;
    }, self);
    self.bio = ko.observable();
    return self;
};

app.model.speakerNullo = new app.model.Speaker()
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
//app.model.Speaker.prototype = function () {
//    var
//        attendanceList = function () {
//            return this.datacontext.attendance.getByPersonId(this.personId());
//        }
//    return {
//        attendanceList: attendanceList
//    }
//}()

// Timeslot
// ----------------------------------------------
app.model.TimeSlot = function () {
    var self = this;
    self.datacontext = app.datacontext;
    self.id = ko.observable();
    self.start = ko.observable();
    self.duration = ko.observable();
    self.dateOnly = ko.computed(function () {
        return moment(self.start()).format('YYYY-MM-DD');
    }, self);
    self.fullStart = ko.computed(function () {
        return moment(self.start()).format('dddd hh:mm a');
    }, self);
    self.shortStart = ko.computed(function () {
        return moment(self.start()).format('ddd hh:mm a');
    }, self);
    self.dayStart = ko.computed(function () {
        return moment(self.start()).format('dddd MMM Do');
    }, self);
    return self;
};

app.model.timeSlotNullo = new app.model.TimeSlot()
                .id(0)
                .start(new Date(2012, 4, 18, 1, 0, 0, 0))
                .duration(60);



// Track
// ----------------------------------------------
app.model.Track = function () {
    var self = this;
    self.datacontext = app.datacontext;
    self.id = ko.observable();
    self.name = ko.observable();
    return self;
};

app.model.trackNullo = new app.model.Track()
                .id(0)
                .name('Not a track');

