// Depends on
//  
// ----------------------------------------------
var my = my || {};

my.datacontext = (function () {
    var
        rooms,
        tracks,
        _timeslots,
        timeslots = function (data) {
            if (data) _timeslots = data
            return _timeslots
        }
    return {
        rooms: rooms,
        tracks: tracks,
        timeslots: timeslots
    }
})()