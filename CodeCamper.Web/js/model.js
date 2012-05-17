// Depends on 
//	jQuery
// 	Knockout
// ----------------------------------------------

my.model = my.model || {};

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
    return self;
};

my.model.Speaker = function () {
    var self = this;
    self.firstName = ko.observable();
    self.lastName = ko.observable();
    self.fullName = ko.computed(function () {
        return self.firstName() + ' ' + self.lastName();
    }, self);
    return self;
};

my.model.Session = function () {
    var self = this;
    self.id = ko.observable();
    self.speaker = ko.observable(new my.model.Speaker());
    self.imageName = ko.observable();
    self.imageUrl = ko.computed(function () {
        return '../content/' + self.imageName();
    });
    self.code = ko.observable();
    self.title = ko.observable();
    self.description = ko.observable();
    self.track = ko.observable();
    self.date = ko.observable();
    self.tags = ko.observable();
    self.isFavorite = ko.observable();
    self.shortTimeSlot = ko.computed(function () {
        return moment(self.date()).format('dddd hh:mm a');
    }, self);
    return self;
};