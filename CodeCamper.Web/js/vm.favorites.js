// Depends on 
//	Knockout
// 	toastr
//	my.datacontext
// ----------------------------------------------
var my = my || {};
my.vm = my.vm || {}

// vm.favorites is the ViewModel for a view displaying just the sessions
// that the current user has marked as favorites.
// The user can further filter this subset of Sessions by additional criteria,
// the same filter criteria that can be applied to all sessions.
my.vm.favorites = (function (ko, toastr, datacontext) {

    // sessionFilter always limits to favorite sessions of the current user
    var sessionFilter = (new my.filters.SessionFilter()).favoriteOnly = true;
       
    var sessions = ko.observableArray();
    sessionFilter.execute(datacontext, sessions); // populate with favorite sessions

    var timeslots = datacontext.timeslots, //ko.observableArray(),
        days = ko.computed(function () {
            var
                result = _.reduce(timeslots(), function (memo, slot) {
                    var
                        date = moment(moment(slot.start()).format('MM-DD-YYYY')).toDate(),
                        day = moment(date).format('ddd MMM DD')

                    if (!memo.index[day.toString()]) {
                        // This is created so i dont have to loop through the array each time again
                        memo.index[day.toString()] = true 
                        memo.slots.push({ date: date, day: day })
                    }
                    return memo
                }, { index: {}, slots: [] })

            sortedDays = result.slots.sort(function (a, b) { return a.date > b.date })
            return sortedDays
        }),
        activate = function (routeData) { //TODO: routeData is not used. Remove it later.

            // TODO: do we point to datacontext or copy it?
            // Just point to and filter the timeslots from the datacontext. Let's try this.
            // Option 1) set the observableArray to an observableArray
            // timeslots = datacontext.timeslots
            // Option 2) other option is to filter them
            //  timeslots = ko.computed(function () {
            //      return datacontext.timeslots // add a filter
            //  })
            // Option 3) copy the timeslots from the datacontext to this viewmodel. ick
            //timeslots(datacontext.timeslots().map(function (ts) { return model.mapper.mapTimeSlot(ts) }))
            //timeslots = datacontext.timeslots

            datacontext.getTimeslots(timeslots)

            datacontext.getSessions(sessions)
        },
        loadByDate = function (data) {
            // filter the filteredSessions by date
            datacontext.getSessions(sessions)
            //sessions = ko.utils.arrayFilter(sessions(), function (s) { return s.date === data.chosenDate; })
            toastr.warning('load by date not implemented');
        },
        loadByTrack = function (data) {
            toastr.warning('load by track not implemented');
        },
        debugInfo = ko.computed(function () {
            //new in KO 2.1. it used to be JSON.stringify(ko.toJS(timeslots), null, 2)
            return ko.toJSON(my.vm.favorites, null, 2)
        });
    return {
        sessions: sessions,
        timeslots: timeslots,
        days: days,
        activate: activate,
        loadByTrack: loadByTrack,
        loadByDate: loadByDate,
        debugInfo: debugInfo
    }
})(ko, toastr, my.datacontext);