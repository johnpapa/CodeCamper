define(['model'],
    function (model) {
        var mapAttendance = function (raw, item) {
            item = item || new model.Attendance().personId(raw.PersonId).sessionId(raw.SessionId);
            return item
            .rating(raw.Rating)
            .text(raw.Text);
        },
        mapRoom = function (raw, item) {
            item = item || new model.Room().id(raw.Id);
            return item
                .name(raw.Name);
        },
        mapSession = function (raw, item) {
            // Always assume raw has been passed
            item = item || new model.Session().id(raw.Id);
            return item
                .title(raw.Title)
                .code(raw.Code)
                .speakerId(raw.SpeakerId)
                .trackId(raw.TrackId)
                .timeslotId(raw.TimeSlotId)
                .roomId(raw.RoomId)
                .description(raw.Description)
                .level(raw.Level)
                .tags(raw.Tags);
        },
        mapPerson = function (raw, item) {
            item = item || new model.Person().id(raw.Id);
            return item
                .firstName(raw.FirstName)
                .lastName(raw.LastName)
                .email(raw.Email)
                .blog(raw.Blog)
                .twitter(raw.Twitter)
                .gender(raw.Gender)
                .imageSource(raw.ImageSource)
                .bio(raw.Bio);
        },
        mapTimeSlot = function (raw, item) {
            item = item || new model.TimeSlot().id(raw.Id);
            return item
                .start(moment(raw.Start).toDate())
                //.start(new Date(raw.Start))
                .duration(raw.Duration);
        },
        mapTrack = function (raw, item) {
            item = item || new model.Track().id(raw.Id);
            return item
                .name(raw.Name);
        };
        return {
            mapAttendance: mapAttendance,
            mapRoom: mapRoom,
            mapSession: mapSession,
            mapPerson: mapPerson,
            mapTimeSlot: mapTimeSlot,
            mapTrack: mapTrack
        };
    });