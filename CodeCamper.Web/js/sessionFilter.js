// Depends on
//  Knockout
//  sort.js
// ----------------------------------------------
app.filter = app.filter || {};

(function (ko, utils) {

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
                try {
                    if (!searchText) return true; // always succeeds if no search text
                    var srch = utils.regExEscape(searchText.toLowerCase());
                    if (session.title().toLowerCase().search(srch) !== -1) return true;
                    if (session.speaker().firstName().toLowerCase().search(srch) !== -1) return true;
                    if (session.speaker().lastName().toLowerCase().search(srch) !== -1) return true;
                    if (session.track().name().toLowerCase().search(srch) !== -1) return true;
                    if (session.room().name().toLowerCase().search(srch) !== -1) return true;
                    if ((tagDelimiter + session.tags().toLowerCase() + tagDelimiter)
                    .search(escapedTagDelimiter + srch + escapedTagDelimiter) !== -1) return true;
                }
                catch(err)
                {
                    app.config.logger.error('filter failed for expression ' + searchText + '. ' + err.message);
                }
                return false;
            },
            
            favoriteTest = function(favoriteOnly, session) {
                if (favoriteOnly) {
                    var match = session.isFavorite();
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
                var match = searchTest(self.searchText(), session)
                    && favoriteTest(self.favoriteOnly(), session)
                    && timeSlotTest(self.minTimeSlot(), self.maxTimeSlot(), session);
                return match;
                //TODO: testing only
                //var matchSearch = searchTest(self.searchText(), session),
                //    matchFav = favoriteTest(self.favoriteOnly(), session),
                //    matchTime = timeSlotTest(self.minTimeSlot(), self.maxTimeSlot(), session);
                //console.log('search filter matched: ' + matchSearch);
                //console.log('favorites filter matched: ' + matchFav);
                //console.log('time filter matched: ' + matchTime);
                //console.log('MATCH === ' + matchSearch && matchFav && matchTime);
                //return matchSearch && matchFav && matchTime;
            };

        return {
            predicate: predicate
        };
    }();
})(ko, app.utils)