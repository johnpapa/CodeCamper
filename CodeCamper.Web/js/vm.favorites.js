// Depends on 
//	Knockout
// 	toastr
//	app.datacontext
//  app.filter
//  app.sort
//
// Description
//  vm.favorites is the ViewModel for a view displaying just the sessions
//  that the current user has marked as favorites.
//  The user can further filter this subset of Sessions by additional criteria,
//  the same filter criteria that can be applied to all sessions.
//
// ----------------------------------------------
app.vm = app.vm || {}

app.vm.favorites = (function (ko, toastr, datacontext, filter, sort) {
    var selectedDate,
        searchText = ko.observable().extend({ throttle: 400 }),
        sessionFilter = new filter.SessionFilter(),
        timeslots = ko.observableArray(),
        sessions = ko.observableArray(), //.trackReevaluations(),
        days = ko.computed(function() {
            var result = _.reduce(timeslots(), function(memo, slot) {
                var date = moment(slot.start()).format('MM-DD-YYYY'), 
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
            //TODO: add sort function 
            datacontext.timeslots.getData({ results: timeslots });
        },
        setFilter = function() {
            var day = new Date(selectedDate),
                maxDate = moment(new Date(day)).add('days', 1).add('seconds', -1).toDate()

            sessionFilter.minTimeSlot(day)
            sessionFilter.maxTimeSlot(maxDate)
            sessionFilter.favoriteOnly(true) //TODO: implement this
            sessionFilter.searchText(searchText())
        },
        loadByDate = function(data) {
            if (data && data.date) {
                selectedDate = data.date
            }
            if (!selectedDate) return
            
            setFilter()
            datacontext.sessions.getData({
                results: sessions,
                filter: sessionFilter,
                sortFunction: sort.sessionSort
            });
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
})(ko, toastr, app.datacontext, app.filter, app.sort);

app.vm.favorites.searchText.subscribe(function() {
    app.vm.favorites.loadByDate()
})
