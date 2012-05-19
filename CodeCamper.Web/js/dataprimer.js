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

my.dataprimer = (function (toastr, dataservice, datacontext) {
    var
        fetchLookups = function () {
            // Eager-Fetch lookup data
            //var def = $.Deferred()
            return $.Deferred(function (def) {
                dataservice.lookup.getLookups(
                    {
                        success:
                            function (data) {
                                datacontext.rooms = data.Rooms
                                datacontext.timeslots(data.TimeSlots) //TODO: This guy should use my.model.mapper
                                datacontext.tracks = data.Tracks
                                //TODO: need to get SessionBrief and Attendance and Speaker (which is brief of Person)
                                def.resolve(data)
                            },
                        error: function () {
                            toastr.error('problem fetching lookup data');
                            def.reject
                        }
                    })
            }).promise();
        }
    return {
        fetchlookups: fetchLookups
    }
})(toastr, my.dataservice, my.datacontext)