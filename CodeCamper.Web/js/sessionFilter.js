// Depends on
//  Knockout
//  sort.js
// ----------------------------------------------
app.filter = app.filter || {};

(function (ko) {

    // Ctor for a SessionFilter
    app.filter.SessionFilter = function() {
        var self = this;
        self.searchText = ko.observable('');
        self.room = ko.observable('');
        self.minTimeSlot = ko.observable();
        self.maxTimeSlot = ko.observable();
        self.favoriteOnly = ko.observable(false);
        return self;
    };

    app.filter.SessionFilter.prototype = function() {
        var
            tagDelimiter = '|',
            escapedTagDelimiter = '\\|',

            searchTest = function (searchText, session) {
                if (!searchText) return true; // always succeeds if no search text
                var srch = searchText.toLowerCase();
                if (session.title().toLowerCase().search(srch) !== -1) return true;
                if (session.speaker().firstName().toLowerCase().search(srch) !== -1) return true;
                if (session.speaker().lastName().toLowerCase().search(srch) !== -1) return true;
                if (session.track().name().toLowerCase().search(srch) !== -1) return true;
                if (session.room().name().toLowerCase().search(srch) !== -1) return true;
                if ((tagDelimiter + session.tags().toLowerCase() + tagDelimiter)
                    .search(escapedTagDelimiter + srch + escapedTagDelimiter) !== -1) return true;
                return false;
            },
            
            favoriteTest = function(favoriteOnly, session) {
                if (favoriteOnly) {
                    var match = session.isFavorite();
                    //match = session.attendance().sessionId() === session.id();
                    return match;
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
                // Return true if all of these meet the filter criteria. Otherwise, return false
                var matchSearch = searchTest(self.searchText(), session),
                    matchFavorite = favoriteTest(self.favoriteOnly(), session),
                    matchTimeslot = timeSlotTest(self.minTimeSlot(), self.maxTimeSlot(), session),
                    match = matchSearch && matchFavorite && matchTimeslot;
                return match;
            };

        return {
            predicate: predicate
        };
    }();
})(ko)