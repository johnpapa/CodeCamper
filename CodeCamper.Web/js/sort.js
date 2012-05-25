// Depends on
// ----------------------------------------------

// Sorting
// ----------------------------------------------
app.sort = app.sort || {};

app.sort.sessionSort = function (sessionA, sessionB) {
    if (sessionA.timeslot().start() === sessionB.timeslot().start()) {
        return sessionA.track().name() > sessionB.track().name() ? 1 : -1
    } else {
        return sessionA.timeslot().start() > sessionB.timeslot().start() ? 1 : -1
    }
}

app.sort.timeslotSort = function (slotA, slotB) {
    return slotA.start() > slotB.start() ? 1 : -1
}

app.sort.date = function (a, b) {
    return a.date() > b.date() ? 1 : -1
}

// Manipulation
// ----------------------------------------------
app.group = app.group || {};

app.group.timeslotsToDays = function (timeslots) {
    var result = _.reduce(timeslots, function (memo, slot) {
        
        var date = moment(slot.start()).format('MM-DD-YYYY'),
                    day = moment(date).format('ddd MMM DD')

        if (!memo.index[day.toString()]) {
            // This is created so i dont have to loop through the array each time again
            memo.index[day.toString()] = true
            memo.slots.push({
                date: date,
                day: day,
                isSelected: ko.observable()
            })
        }
        return memo
    }, { index: {}, slots: [] })

    sortedDays = result.slots.sort(app.sort.generic)
    return sortedDays
};
