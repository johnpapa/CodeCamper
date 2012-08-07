define('model',
    [
        'model.attendance',
        'model.person',
        'model.room',
        'model.session',
        'model.timeslot',
        'model.track'
    ],
    function (attendance, person, room, session, timeslot, track) {
        var
            model = {
                Attendance: attendance.Attendance,
                Person: person.Person,
                Room: room.Room,
                Session: session.Session,
                TimeSlot: timeslot.TimeSlot,
                Track: track.Track
            };

        model.setDataContext = function(dc) {
            model.Attendance.datacontext(dc);
            model.Person.datacontext(dc);
            model.Session.datacontext(dc);
        };

        return model;
    });