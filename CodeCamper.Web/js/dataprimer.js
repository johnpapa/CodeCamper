// Depends on
//  toastr
//	dataservice
//  datacontext
//
// Conventions
//	1) bootstrapper should prime the data services 
//      by running dataPrimer.init
// ----------------------------------------------
var my = my || {}

my.dataprimer = (function ($, toastr, dataservice, datacontext, model) {
    var
        fetchLookups = function () {
            // Eager-Fetch lookup data
            return $.Deferred(function (def) {
                dataservice.lookup.getLookups(
                    {
                        success:
                            function (data) {
                                datacontext.rooms(data.Rooms.map(function (r) { return model.mapper.mapRoom(r) }))
                                datacontext.timeslots(data.TimeSlots.map(function (ts) { return model.mapper.mapTimeSlot(ts) }))
                                datacontext.tracks(data.Tracks.map(function (t) { return model.mapper.mapTrack(t) }))
                                def.resolve(data)
                            },
                        error: function () {
                            toastr.error('problem fetching lookup data');
                            def.reject
                        }
                    })
            }).promise();
        },
        fetchSpeakers = function () {
            return $.Deferred(function (def) {
                dataservice.person.getSpeakers(
                    {
                        success:
                            function (speakers) {
                                datacontext.speakers(speakers.map(function (s) { return model.mapper.mapSpeaker(s) }))
                                def.resolve(speakers)
                            },
                        error: function () {
                            toastr.error('problem fetching speaker data');
                            def.reject
                        }
                    })
            }).promise();
        },
        fetchSessionBriefs = function () {
            return $.Deferred(function (def) {
                dataservice.session.getSessionBriefs(
                    {
                        success:
                            function (sessions) {
                                datacontext.sessions(sessions.map(function (s) { return model.mapper.mapSession(s) }))
                                //TODO: need to get SessionBrief and Attendance and Speaker (which is brief of Person)
                                def.resolve(sessions)
                            },
                        error: function () {
                            toastr.error('problem fetching session data');
                            def.reject
                        }
                    })
            }).promise();
        }
    return {
        fetchlookups: fetchLookups,
        fetchSessionBriefs: fetchSessionBriefs,
        fetchSpeakers: fetchSpeakers
    }
})(jQuery, toastr, my.dataservice, my.datacontext, my.model)