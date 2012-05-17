// Depends on 
//	jQuery
// 	Knockout
// ----------------------------------------------

my.model = my.model || {};

my.model.mapper = (function () {
    var
        mapTimeSlot = function (raw) {
            return new my.model.TimeSlot()
                .id(raw.Id)
                .start(raw.Start)
                .duration(raw.Duration);
        },
        mapSpeaker = function (raw) {
            return new my.model.Speaker()
                .firstName(raw.firstName)
                .lastName(raw.lastName);
        },
        mapSession = function (raw) {
            return new my.model.Session()
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
        mapTimeSlot: mapTimeSlot,
        mapSession: mapSession,
        mapSpeaker: mapSpeaker
    }
})();