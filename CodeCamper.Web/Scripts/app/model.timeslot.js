define('model.timeslot',
    ['ko'],
    function (ko) {
        var TimeSlot = function () {
            var self = this;
            self.id = ko.observable();
            self.start = ko.observable();
            self.duration = ko.observable();
            self.dateOnly = ko.computed(function () {
                return self.start() ? moment(self.start()).format('MM-DD-YYYY') : '';
            }, self);
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

        TimeSlot.Nullo = new TimeSlot()
            .id(0)
            .start(new Date(1900, 1, 1, 1, 0, 0, 0))
            .duration(60);
        TimeSlot.Nullo.isNullo = true;

        return {
            TimeSlot: TimeSlot
        };
});
