// Depends on
//  Knockout
// ----------------------------------------------
app.filter = app.filter || {};

(function (ko) {

    // Ctor for a SessionFilter
    app.filter.SessionFilter = function () {
        var self = this;
        self.searchText = ko.observable('');
        self.minTimeSlot = ko.observable();
        self.maxTimeSlot = ko.observable();
        self.favoriteOnly = ko.observable(false);
        // assume user is ko.observable
        self.currentUserId = ko.computed(function () { return app.currentUser ? app.currentUser().id() : 0 });
        return self;
    }

    app.filter.SessionFilter.prototype = function () {
        var tagDelimiter = '|',
            escapedTagDelimiter = '\\|',

            searchTest = function (searchText, session) {
                if (!searchText) return true; // always succeeds if no search text
                var srch = searchText.toLowerCase();
                if (session.title().toLowerCase().search(srch) !== -1) return true;
                if (session.speaker().firstName().toLowerCase().search(srch) !== -1) return true;
                if (session.speaker().lastName().toLowerCase().search(srch) !== -1) return true;
                if (session.track().name().toLowerCase().search(srch) !== -1) return true;
                if ((tagDelimiter + session.tags().toLowerCase() + tagDelimiter)
                    .search(escapedTagDelimiter + srch + escapedTagDelimiter) !== -1) return true;
                return false;
            },

            favoriteTest = function (favoriteOnly, userId, session) {
                if (favoriteOnly) {
                    var list = session.attendanceList();
                    for (var i = 0; i < list.length; i++) {
                        if (list[i].personId() === userId) return true;
                    }
                    return false; // not a favorite of the current user
                } else {
                    return true; // don't care if favorite or not
                }
            },

            timeSlotTest = function (minTimeSlot, maxTimeSlot, session) {
                // Return true if it meets the filter criteria. Otherwise, return false
                if (minTimeSlot && minTimeSlot > session.timeslot().start()) return false;
                if (maxTimeSlot && maxTimeSlot < session.timeslot().start()) return false;
                return true;
            },

            predicate = function (self, session) {
                var match = false;
                // Return true if all of these meet the filter criteria. Otherwise, return false
                if (searchTest(self.searchText(), session) &&
                //if (!favoriteTest(self.favoriteOnly(), self.currentUserId(), session)) return false;
                    timeSlotTest(self.minTimeSlot(), self.maxTimeSlot(), session)) {
                        match = true;
                }
                return match;
            };

            // result is a ko.observableArray, updated by the filter execution
            execute = function (datacontext, result) {
                var
                    sessions = ko.observableArray([]),
                    self = this;

                $.when(datacontext.sessions.getData({ results: sessions }))
                .done(function () {
                    // using underscore, as another option
                    //var filteredArray = _.filter(sessions(), function (session) {
                    //    return predicate(self, session);
                    //})
                    var filteredArray = ko.utils.arrayFilter(sessions(), function (session) {
                        var match = predicate(self, session);
                        return match;
                    });
                    result(filteredArray);
                    toastr.info(sessions().length + ' filtered down to ' + filteredArray.length)
                    //return sessions;
                })
            };
        return {
            execute: execute
        }
    }()
})(ko)