define(function () {

    var
    sessionSort = function (sessionA, sessionB) {
        if (sessionA.timeslot().start() === sessionB.timeslot().start()) {
            return sessionA.track().name() > sessionB.track().name() ? 1 : -1;
        } else {
            return sessionA.timeslot().start() > sessionB.timeslot().start() ? 1 : -1;
        }
    },

    speakerSort = function (speakerA, speakerB) {
        // sort first then last
        return speakerA.fullName() > speakerB.fullName() ? 1 : -1;
    },

    timeslotSort = function (slotA, slotB) {
        return slotA.start() > slotB.start() ? 1 : -1;
    },

    trackSort = function (trackA, trackB) {
        return trackA.name() > trackB.name() ? 1 : -1;
    };

    return {
        sessionSort: sessionSort,
        speakerSort: speakerSort,
        timeslotSort: timeslotSort,
        trackSort: trackSort
    };
});