define('model.attendance',
    ['ko'],
    function (ko) {

        var
            _dc = null,

            attendanceMakeId = function (personId, sessionId) {
                return (personId + ',' + sessionId);
            },

            Attendance = function () {
                var self = this;
                self.sessionId = ko.observable();
                self.personId = ko.observable();

                // id is string compound key {personId,sessionId} like '3,10'    
                self.id = ko.computed({
                    read: function () {
                        return attendanceMakeId(self.personId(), self.sessionId());
                    },
                    write: function (value) {
                        var idparts = value.split(',');
                        self.personId(parseInt(idparts[0]));
                        self.sessionId(parseInt(idparts[1]));
                    }
                }),

                self.rating = ko.observable();
                self.text = ko.observable();
                self.isNullo = false;
                self.dirtyFlag = new ko.DirtyFlag([self.rating, self.text]);
                return self;
            };

        Attendance.Nullo = new Attendance()
            .sessionId(0)
            .personId(0)
            .rating(0)
            .text('');

        Attendance.Nullo.isNullo = true;
        Attendance.Nullo.dirtyFlag().reset();

        Attendance.makeId = attendanceMakeId;

        Attendance.datacontext = function (dc) {
            if(dc) { _dc = dc; }
            return _dc;
        };

        Attendance.prototype = function () {
            var
                dc = Attendance.datacontext,
                person = function () {
                    return dc().persons.getLocalById(self.personId());
                },
                session = function () {
                    return dc().sessions.getLocalById(self.sessionId());
                };
            return {
                isNullo: false,
                person: person,
                session: session
            };
        }();

        return {
            Attendance: Attendance
        };
});

