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
            var temp = []
            for (var i = 0; i < timeslots().length; i++) {
                if (temp.indexOf(timeslots()[i].dateOnly()) < 0) {
                    temp.push(timeslots()[i].dateOnly())
                }
            }
            justdays = ko.utils.arrayGetDistinctValues(temp).sort()
            for (var i = 0; i < justdays.length; i++) {
                oldVal = justdays[i]
                justdays[i] = {
                    dateOnly: oldVal,
                    formattedDate: moment(oldVal).format('ddd MMM DD')
                }
            }
            return justdays
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