// Depends on
//  Knockout
// ----------------------------------------------
var my = my || {};

my.datacontext = (function () {
    var
        rooms = ko.observableArray(),
        tracks = ko.observableArray(),
        timeslots = ko.observableArray(),
        //_timeslots,
        //timeslots = function (data) {
        //    if (data) _timeslots = data
        //    return _timeslots
        //},
        // sessions (which is either filled all the way or just partially for briefs. same object tho)
        sessions = ko.observableArray(),
        persons = ko.observableArray(),
        // speakers (filter over persons)
        //speakers = ko.computed(function () { return persons; })
        //TODO: filter these
        speakers = ko.observableArray()
        
    return {
        rooms: rooms,
        tracks: tracks,
        timeslots: timeslots,
        sessions: sessions,
        persons: persons,
        speakers: speakers
    }
})()