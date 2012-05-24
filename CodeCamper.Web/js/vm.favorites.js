// Depends on 
//	Knockout
// 	toastr
//	my.datacontext
//
// Description
//  vm.favorites is the ViewModel for a view displaying just the sessions
//  that the current user has marked as favorites.
//  The user can further filter this subset of Sessions by additional criteria,
//  the same filter criteria that can be applied to all sessions.
//
// ----------------------------------------------
var my = my || {};
my.vm = my.vm || {}

my.vm.favorites = (function (ko, toastr, datacontext) {

    //TODO: setup filters
    // sessionFilter always limits to favorite sessions of the current user
    //var sessionFilter = (new my.filters.SessionFilter()).favoriteOnly = true;
    
    //sessionFilter.execute(datacontext, sessions); // populate with favorite sessions

    var timeslots = ko.observableArray(),
        sessions = ko.observableArray(), //.trackReevaluations(),
        days = ko.computed(function() {
            var result = _.reduce(timeslots(), function(memo, slot) {
                var date = moment(moment(slot.start()).format('MM-DD-YYYY')).toDate(),
                    day = moment(date).format('ddd MMM DD')

                if (!memo.index[day.toString()]) {
                    // This is created so i dont have to loop through the array each time again
                    memo.index[day.toString()] = true
                    memo.slots.push({ date: date, day: day })
                }
                return memo
            }, { index: { }, slots: [] })

            sortedDays = result.slots.sort(function(a, b) { return a.date > b.date })
            return sortedDays
        }),
        activate = function() { //routeData) { //TODO: routeData is not used. Remove it later.
            datacontext.timeslots.getData({ results: timeslots });
        },
        loadByDate = function(data) {
            //TODO: filter the filteredSessions by date
            datacontext.sessions.getData({ results: sessions });
            toastr.warning('TODO: load by date still needs a filter');

            //$('#busy1').activity();
            //$.when(datacontext.sessions.getData({ results: sessions }))
            //    .always(function() {
            //        toastr.success('done loading')
            //        $('#busy1').activity(false);
            //    })


        },
        debugInfo = my.debugInfo(sessions);
    return {
        sessions: sessions,
        timeslots: timeslots,
        days: days,
        activate: activate,
        loadByDate: loadByDate,
        debugInfo: debugInfo
    }
})(ko, toastr, my.datacontext);