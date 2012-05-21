// Depends on 
//	Knockout
// 	toastr
//	my.dataservice.session
// ----------------------------------------------
var my = my || {};
my.vm = my.vm || {}

my.vm.favorites = (function (ko, toastr, datacontext, dataservice, model) {
    var
        sessions = ko.observableArray(),
        timeslots = datacontext.timeslots, //ko.observableArray(),
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
            // Option 3) Right now I am copying the timeslots from the datacontext to this viewmodel
            //timeslots(datacontext.timeslots().map(function (ts) { return model.mapper.mapTimeSlot(ts) }))
            timeslots = datacontext.timeslots
        },
        getSessions = function () {
            dataservice.session.getSessions('favorites',
                {
                    success: getSessionsCallback,
                    error: function () { toastr.error('oops!'); }
                })
        },
        getSessionsCallback = function (rawsessions) {
            sessions(rawsessions.map(function (s) { return my.model.mapper.mapSession(s) }));
            toastr.success('received with ' + sessions().length + ' elements');
        },
        loadByDate = function (data) {
            // filter the filteredSessions by date
            getSessions();
            toastr.warning('load by date not implemented');
        },
        loadByTrack = function (data) {
            toastr.warning('load by track not implemented');
        },
        debugInfo = ko.computed(function () {
            //return JSON.stringify(ko.toJS(timeslots), null, 2)
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
})(ko, toastr, my.datacontext, my.dataservice, my.model);