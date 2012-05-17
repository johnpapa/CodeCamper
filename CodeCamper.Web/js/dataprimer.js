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
        init = function () {
            dataservice.session.init()
            dataservice.lookup.init()
        },
        fetchLookups = function () {
            // Eager-Fetch lookup data
            //var def = $.Deferred()
            return $.Deferred(function (def) {
                dataservice.lookup.getLookups(
                    {
                        success:
                            function (data) {
                                datacontext.rooms = data.Rooms
                                datacontext.timeslots(data.TimeSlots)
                                datacontext.tracks = data.Tracks
                                def.resolve(data)
                            },
                        error: function () {
                            toastr.error('problem fetching lookup data');
                            def.reject
                        }
                    })
            }).promise();

            //dataservice.lookup.getLookups(
            //    {
            //        success:
            //            function (data) {
            //                datacontext.rooms = data.Rooms
            //                datacontext.timeslots(data.TimeSlots)
            //                datacontext.tracks = data.Tracks
            //            },
            //        error: function () {
            //            toastr.error('problem fetching lookup data');
            //        }
            //    })
        }
    return {
        init: init,
        fetchlookups: fetchLookups
    }
})(toastr, my.dataservice, my.datacontext)