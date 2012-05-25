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
app.vm = app.vm || {}

app.vm.favorites = (function (ko, toastr, datacontext) {
    var
        sessionFilter = new app.filter.SessionFilter(),
        timeslots = ko.observableArray(),
        sessions = ko.observableArray(), //.trackReevaluations(),
        searchText = ko.observable(),
        days = ko.computed(function() {
            var result = _.reduce(timeslots(), function(memo, slot) {
                var date = moment(slot.start()).format('MM-DD-YYYY'), //.toDate(),
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
        setFilter = function (data) {
            if(data && data.date) {
                var day = new Date(data.date)
                sessionFilter.minTimeSlot(day)
                var maxDate = moment(new Date(day)).add('days', 1).add('seconds', -1).toDate()
                sessionFilter.maxTimeSlot(maxDate)
            }
            sessionFilter.favoriteOnly(true) //TODO: implement this
            sessionFilter.searchText(searchText())
        },
        loadByDate = function (data) {
            // sessionFilter always limits to favorite sessions of the current user
            setFilter(data)
            
            sessionFilter.execute(datacontext, sessions); // populate with favorite sessions

            //datacontext.sessions.getData({ results: sessions });

            //TODO: implement activity indicator (if needed)
            //$('#busy1').activity();
            //$.when(sessionFilter.execute(datacontext, sessions))
            //    .always(function() {
            //        toastr.success('done loading')
            //        $('#busy1').activity(false);
            //    })


        },
        debugInfo = app.debugInfo(sessions);
    return {
        sessions: sessions,
        timeslots: timeslots,
        searchText: searchText,
        days: days,
        activate: activate,
        loadByDate: loadByDate,
        debugInfo: debugInfo,
    }
})(ko, toastr, app.datacontext);