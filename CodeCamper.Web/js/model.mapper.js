// Depends on
//
// ----------------------------------------------
app.model = app.model || {};

app.model.mapper = (function () {
    var
        mapAttendance = function (raw, item) {
            item = item || new app.model.Attendance().personId(raw.PersonId).sessionId(raw.SessionId);
            return item
                .rating(raw.Rating)
                .text(raw.Text);
        },
        mapRoom = function (raw, item) {
            item = item || new app.model.Room().id(raw.Id);
            return item
                .name(raw.Name);
        },
        mapSession = function (raw, item) {
            // Always assume raw has been passed
            item = item || new app.model.Session().id(raw.Id);
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
        mapSpeaker = function (raw, item) {
            item = item || new app.model.Speaker().id(raw.Id);
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
            item = item || new app.model.TimeSlot().id(raw.Id);
            return item
                .start(new Date(raw.Start))
                .duration(raw.Duration);
        },
        mapTrack = function (raw, item) {
            item = item || new app.model.Track().id(raw.Id);
            return item
                    .name(raw.Name);
        };
    return {
        mapAttendance: mapAttendance,
        mapRoom: mapRoom,
        mapSession: mapSession,
        mapSpeaker: mapSpeaker,
        mapTimeSlot: mapTimeSlot,
        mapTrack: mapTrack
    };
})();