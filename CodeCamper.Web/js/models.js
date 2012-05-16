// Depends on 
//	jQuery
// 	Knockout
// ----------------------------------------------

my.models = my.models || {};

my.models.Speaker = function () {
    var self = this;
    self.firstName = ko.observable();
    self.lastName = ko.observable();
    self.fullName = ko.computed(function () {
        return self.firstName() + ' ' + self.lastName();
    }, self);
    return self;
};

my.models.Session = function () {
    var self = this;
    self.id = ko.observable();
    self.speaker = ko.observable(new my.models.Speaker());
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

my.modelMappers = (function () {
    var
        mapSpeaker = function (raw) {
            return new my.models.Speaker()
                .firstName(raw.firstName)
                .lastName(raw.lastName);
        },
        mapSession = function (raw) {
            return new my.models.Session()
                .id(raw.id)
                .speaker(mapSpeaker(raw.speaker))
                .imageName(raw.imageName)
                .code(raw.code)
                .title(raw.title)
                .description(raw.description)
                .track(raw.track)
                .date(raw.date)
                .isFavorite(raw.isFavorite)
                .tags(raw.tags);
        };
    return {
        mapSession: mapSession,
        mapSpeaker: mapSpeaker
    }
})();

