// Depends on 
//  my.datacontext (for reference links)
//
// ----------------------------------------------
var my = my || {};
my.model = my.model || {};

my.model.Room = function () {
    var self = this;
    self.datacontext = my.datacontext;
    self.id = ko.observable();
    self.name = ko.observable();
    return self;
};

my.model.roomNullo = new my.model.Room()
                .id(0)
                .name('Not a room');

my.model.Track = function () {
    var self = this;
    self.datacontext = my.datacontext;
    self.id = ko.observable();
    self.name = ko.observable();
    return self;
};

my.model.trackNullo = new my.model.Track()
                .id(0)
                .name('Not a track');

my.model.TimeSlot = function () {
    var self = this;
    self.datacontext = my.datacontext;
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

my.model.timeSlotNullo = new my.model.TimeSlot()
                .id(0)
                .start(new Date(2012, 4, 18, 1, 0, 0, 0))
                .duration(60);

my.model.Speaker = function () {
    var self = this;
    self.datacontext = my.datacontext;
    self.id = ko.observable();
    self.firstName = ko.observable();
    self.lastName = ko.observable();
    self.fullName = ko.computed(function () {
        return self.firstName() + ' ' + self.lastName();
    }, self);
    self.imageName = ko.computed(function () {
        return '../content/' + self.firstName() + '.jpg';
    }, self);
    self.email = ko.observable();
    self.blog = ko.observable();
    self.twitter = ko.observable();
    self.gender = ko.observable();
    self.bio = ko.observable();
    return self;
};

my.model.speakerNullo = new my.model.Speaker()
                .id(0)
                .firstName('Not a')
                .lastName('Person')
                .email('')
                .blog('')
                .twitter('')
                .gender('M')
                .bio('');

my.model.Session = function () {
    var self = this;
    self.datacontext = my.datacontext;
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
    self.isFavorite = ko.observable(); //TODO: fix isFavorite
    return self;
};

my.model.sessionNullo = new my.model.Session()
                .id(0)
                .title('Not a Session')
                .code('XYZ123')
                .speakerId(0)
                .trackId(0)
                .timeslotId(0)
                .roomId(0)
                .description('')
                .isFavorite(false) //TODO: fix this
                .level('')
                .tags('');

my.model.Session.prototype = function () {
    var
        speaker = function () {
            return this.datacontext.speakers.getById(this.speakerId());
        },
        room = function () {
            return this.datacontext.rooms.getById(this.roomId());
        },
        timeslot = function () {
            return this.datacontext.timeslots.getById(this.timeslotId());
        },
        track = function () {
            return this.datacontext.tracks.getById(this.trackId());
        }
    return {
        speaker: speaker,
        room: room,
        timeslot: timeslot,
        track: track
    }
}()
