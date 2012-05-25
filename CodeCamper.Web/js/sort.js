// Depends on
// ----------------------------------------------
app.sort = app.sort || {};

app.sort.sessionSort = function (sessionA, sessionB) {
    if (sessionA.timeslot().start() === sessionB.timeslot().start()) {
        return sessionA.track().name() > sessionB.track().name() ? 1 : -1
    } else {
        return sessionA.timeslot().start() > sessionB.timeslot().start() ? 1 : -1
    }
}