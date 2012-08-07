define('model.room',
    ['ko'],
    function (ko) {
        var Room = function () {
            var self = this;
            self.id = ko.observable();
            self.name = ko.observable();
            self.isNullo = false;
            return self;
        };

        Room.Nullo = new Room().id(0).name('Not a room');
        Room.Nullo.isNullo = true;

        return {
            Room: Room
        };
});
