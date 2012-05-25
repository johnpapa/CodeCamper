// Depends on
//  Knockout
//  sort.js
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
        return self;
    }

    app.filter.SessionFilter.prototype = function () {
        var tagDelimiter = '|',
            escapedTagDelimiter = '\\|',
            searchTest = function(searchText, session) {
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
            favoriteTest = function(favoriteOnly, session) {
                if (favoriteOnly) {
                    //var list = session.attendance();
                    //for (var i = 0; i < list.length; i++) {
                    //    if (list[i].personId() === userId) return true;
                    //}
                    return session.isFavorite()
                    //return session.attendance().personId() === userId
                } else {
                    return true; // don't care if favorite or not
                }
            },
            timeSlotTest = function(minTimeSlot, maxTimeSlot, session) {
                // Return true if it meets the filter criteria. Otherwise, return false
                if (minTimeSlot && minTimeSlot > session.timeslot().start()) return false;
                if (maxTimeSlot && maxTimeSlot < session.timeslot().start()) return false;
                return true;
            },
            predicate = function (self, session) {
                var match = false;
                // Return true if all of these meet the filter criteria. Otherwise, return false
                if (searchTest(self.searchText(), session)
                    && (favoriteTest(self.favoriteOnly(), session))
                    && (timeSlotTest(self.minTimeSlot(), self.maxTimeSlot(), session))) {
                    match = true;
                }
                return match;
            };
            //execute2 = function (datacontext, result) {
            //    var
            //        sessions = ko.observableArray([]),
            //        self = this;

            //    $.when(datacontext.sessions.getData({
            //        results: sessions,
            //        sortFunction: app.sort.sessionSort
            //    }))
            //    .done(function () {
            //        // using underscore, as another option
            //        //var filteredArray = _.filter(sessions(), function (session) {
            //        //    return predicate(self, session);
            //        //})
            //        var filteredArray = ko.utils.arrayFilter(sessions(), function (session) {
            //            var match = predicate(self, session);
            //            return match;
            //        });
            //        result(filteredArray);
            //        toastr.info(sessions().length + ' filtered down to ' + filteredArray.length)
            //        return self;
            //    })
            //};
        return {
            predicate: predicate
        }
    }()
})(ko)