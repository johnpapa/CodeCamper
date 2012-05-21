// Depends on 
//  my.datacontext (for reference links)
//
// ----------------------------------------------
var my = my || {};
my.model = my.model || {};

my.model.Room = function () {
    var self = this;
    self.id = ko.observable();
    self.name = ko.observable();
    return self;
};

my.model.Track = function () {
    var self = this;
    self.id = ko.observable();
    self.name = ko.observable();
    return self;
};

my.model.TimeSlot = function () {
    var self = this;
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
    // Reach into datacontext and get the sessions for this, and then map them ???
    //self.sessions = ko.computed(function () {  });
    return self;
};

my.model.Speaker = function () {
    var self = this;
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
    self.id = ko.observable();
    self.title = ko.observable();
    self.code = ko.observable();
    self.speakerId = ko.observable();
    self.speaker = ko.computed(function () {
        // return ko.utils.arrayFirst( ...
        if (!self.speakerId() || !my.datacontext || !my.datacontext.speakers())
            return;

        return _.find(my.datacontext.speakers(),
            function (s) {
                return s.id() === self.speakerId()
            });
    });
    self.trackId = ko.observable();
    self.track = ko.computed(function () {
        return _.find(my.datacontext.tracks(), 
            function (t) {
                return t.id() === self.trackId()
            });
    });
    self.timeslotId = ko.observable();
    self.timeslot = ko.computed(function () {
        return _.find(my.datacontext.timeslots(),
            function (ts) {
                return ts.id() === self.timeslotId()
            });
    });
    self.roomId = ko.observable();
    self.room = ko.computed(function () {
        return _.find(my.datacontext.rooms(),
            function (r) {
                return r.id() === self.roomId()
            });
    });
    self.level = ko.observable();
    self.tags = ko.observable();
    self.description = ko.observable();

    self.isFavorite = ko.observable(); //TODO: fix this

    //self.speaker = ko.observable(new my.model.Speaker());
    //self.imageName = ko.observable();
    //self.imageUrl = ko.computed(function () {
    //    return '../content/' + self.imageName();
    //});
    //self.track = ko.observable();
    //self.date = ko.observable();
    //self.shortTimeSlot = ko.computed(function () {
    //    return moment(self.date()).format('dddd hh:mm a');
    //}, self);

    return self;
};