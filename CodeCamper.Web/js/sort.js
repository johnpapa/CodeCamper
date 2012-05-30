// Depends on
// ----------------------------------------------

// Sorting
// ----------------------------------------------
app.sort = app.sort || {};

app.sort.sessionSort = function (sessionA, sessionB) {
    if (sessionA.timeslot().start() === sessionB.timeslot().start()) {
        return sessionA.track().name() > sessionB.track().name() ? 1 : -1;
    } else {
        return sessionA.timeslot().start() > sessionB.timeslot().start() ? 1 : -1;
    }
};

app.sort.speakerSort = function (speakerA, speakerB) {
    // sort first then last
    return speakerA.fullName() > speakerB.fullName() ? 1 : -1;
};

app.sort.timeslotSort = function (slotA, slotB) {
    return slotA.start() > slotB.start() ? 1 : -1;
};

app.sort.trackSort = function (trackA, trackB) {
    return trackA.name() > trackB.name() ? 1 : -1;
};

// Manipulation
// ----------------------------------------------
app.group = app.group || {};

app.group.timeslotsToDays = function (timeslots) {
    var result = _.reduce(timeslots, function (memo, slot) {
        
        var date = moment(slot.start()).format('MM-DD-YYYY'),
                    day = moment(date).format('ddd MMM DD');
        if (!memo.index[day.toString()]) {
            // This is created so i dont have to loop through the array each time again
            memo.index[day.toString()] = true;
            memo.slots.push({
                date: date,
                day: day,
                isSelected: ko.observable()
            });
        }
        return memo;
    }, { index: {}, slots: [] });
    var sortedDays = result.slots.sort(function (a, b) {
        return a.date > b.date ? 1 : -1;
    });
    return sortedDays;
};
