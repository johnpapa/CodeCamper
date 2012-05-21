// Depends on 
//	jQuery
// 	Knockout
// ----------------------------------------------

my.model = my.model || {};

my.model.mapper = (function () {
    var
        mapRoom = function (raw) {
            return new my.model.Room()
                .id(raw.Id)
                .name(raw.Name);
        },
        mapSession = function (raw) {
                return new my.model.Session()
                .id(raw.Id)
                //.speaker(mapSpeaker(raw.speaker))
                //.imageName(raw.imageName)
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
        mapSpeaker = function (raw) {
            return new my.model.Speaker()
                .id(raw.Id)
                .firstName(raw.FirstName)
                .lastName(raw.LastName)
                .email(raw.Email)
                .blog(raw.Blog)
                .twitter(raw.Twitter)
                .gender(raw.Gender)
                .bio(raw.Bio);
        },
        mapTimeSlot = function (raw) {
            return new my.model.TimeSlot()
                .id(raw.Id)
                .start(raw.Start)
                .duration(raw.Duration);
        },
        mapTrack = function (raw) {
            return new my.model.Track()
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