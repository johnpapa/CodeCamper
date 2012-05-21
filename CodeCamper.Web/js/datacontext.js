// Depends on
//  Knockout
// 	toastr
//  my.dataservice
//  my.model
// ----------------------------------------------
var my = my || {};

my.datacontext = (function (ko, toastr, dataservice, model) {
    var
        rooms = ko.observableArray(),
        tracks = ko.observableArray(),
        timeslots = ko.observableArray(),
        // sessions (which is either filled all the way or just partially for briefs. same object tho)
        sessions = ko.observableArray(),
        persons = ko.observableArray(),
        // speakers (filter over persons)
        //speakers = ko.computed(function () { return persons; })
        //TODO: filter these
        speakers = ko.observableArray(),
        
        getSessions = function (sessionsOut) {
            if (sessions().length) {
                sessionsOut = sessions;
                return sessions;
            }
            else {
                dataservice.session.getSessions({
                    success: function (rawsessions) {
                        sessions(rawsessions.map(function (s) { return model.mapper.mapSession(s) }));
                        sessionsOut = sessions;
                        return sessions;
                        toastr.success('received with ' + sessions().length + ' elements');
                    },
                    error: function () { toastr.error('oops! sessions could not be retrieved'); }
                })
            }
        },
        getTimeslots = function (timeslotsOut) {
            if (timeslots().length) {
                timeslotsOut = timeslots;
                return timeslots;
            }
            else {
                ds.lookup.getTimeslots({
                    success: function (rawtimeslots) {
                        timeslots(rawtimeslots.map(function (s) { return model.mapper.mapTimeSlot(ts) }));
                        timeslotsOut = timeslots;
                        toastr.success('received with ' + timeslots().length + ' elements');
                        return timeslots;
                    },
                    error: function () { toastr.error('oops! timeslots could not be retrieved'); }
                })
            }
        }
        
    return {
        rooms: rooms,
        tracks: tracks,
        timeslots: timeslots,
        sessions: sessions,
        persons: persons,
        speakers: speakers,
        
        getSessions: getSessions,
        getTimeslots: getTimeslots
    }
})(ko, toastr, my.dataservice, my.model)