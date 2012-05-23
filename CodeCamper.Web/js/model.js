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

my.model.Track = function () {
    var self = this;
    self.datacontext = my.datacontext;
    self.id = ko.observable();
    self.name = ko.observable();
    return self;
};

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
    self.dayStart = ko.computed(function () {
        return moment(self.start()).format('dddd MMM Do');
    }, self);
    return self;
};

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
