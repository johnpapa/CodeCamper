// Depends on
//  Underscore
//  Knockout
//  moment
// ----------------------------------------------

// Grouping
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