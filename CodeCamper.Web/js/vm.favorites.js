// Depends on 
//	Knockout
// 	toastr
//	my.dataservice.session
// ----------------------------------------------
my.vm = my.vm || {}

my.vm.favorites = (function (ko, toastr, datacontext, dataservice, model) {
    var
        sessions = ko.observableArray(),
        timeslots = ko.observableArray(),
        days = ko.computed(function () {
            var index = { },
                result = []

            ko.utils.arrayForEach(timeslots(), function(slot) {
                var date = moment(moment(slot.start()).format('YYYY MM DD')).toDate(),
                    day = moment(date).format('ddd MMM DD').toString()
                if (!index[day]) {
                    result.push({date: date,day: day})
                    index[day] = true
                }
                //return result
            })
            sortedDays = result.sort(function (a, b) { return a.date > b.date })
            console.log(sortedDays)
            return sortedDays
        }),
        activate = function (routeData) { //TODO: routeData is not used. Remove it later.

            //timeslots(datacontext.timeslots())
            timeslots(datacontext.timeslots().map(function (ts) { return model.mapper.mapTimeSlot(ts) }))

            dataservice.session.getSessions('favorites',
                {
                    success: loadSessions,
                    error: function () { toastr.error('oops!'); }
                })
        },
        loadSessions = function (data) {
            sessions(data.sessions.map(function (s) { return my.model.mapper.mapSession(s) }));
            toastr.success('received with ' + sessions().length + ' elements');
        },
        loadByDate = function (data) {
            toastr.info('load by date');
        },
        loadByTrack = function (data) {
            toastr.info('load by track');
        },
        debugInfo = ko.computed(function () {
            return JSON.stringify(ko.toJS(timeslots), null, 2)
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