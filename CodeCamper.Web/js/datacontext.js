// Depends on
//  
// ----------------------------------------------
var my = my || {};

my.datacontext = (function () {
    var
    // TODO: We decided to try (haha) to make all of these ko.observableArray()
        rooms,
        tracks,
        _timeslots,
        timeslots = function (data) {
            if (data) _timeslots = data
            return _timeslots
        }
    //timeslots = ko.observableArray()
    // speakers (filter over persons)
    // persons (filled all the way or half way)
    // sessions (which is either filled all the way or just partially for briefs. same object tho)
    return {
        rooms: rooms,
        tracks: tracks,
        timeslots: timeslots
    }
})()