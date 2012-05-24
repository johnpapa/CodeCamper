// Depends on
//
// ----------------------------------------------
app.model = app.model || {};

app.model.mapper = (function () {
    var
        mapRoom = function (raw, item) {
            item = item || new app.model.Room().id(raw.Id);
            return item
                .id(raw.Id)
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
                .isFavorite(!!raw.IsFavorite) //TODO: fix this
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
                .id(raw.Id)
                .start(new Date(raw.Start))
                .duration(raw.Duration);
        },
        mapTrack = function (raw, item) {
            item = item || new app.model.Track().id(raw.Id);
            return item
                    .id(raw.Id)
                    .name(raw.Name);
        };
    return {
        mapRoom: mapRoom,
        mapSession: mapSession,
        mapSpeaker: mapSpeaker,
        mapTimeSlot: mapTimeSlot,
        mapTrack: mapTrack
    }
})();