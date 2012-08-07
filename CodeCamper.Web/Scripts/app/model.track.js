define('model.track',
    ['ko'],
    function (ko) {
        var Track = function () {
            var self = this;
            self.id = ko.observable();
            self.name = ko.observable();
            self.isNullo = false;
            return self;
        };

        Track.Nullo = new Track().id(0).name('Not a track');
        Track.Nullo.isNullo = true;

        return Track;
});
