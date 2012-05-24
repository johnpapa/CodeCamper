// Depends on
//  Knockout
// 	toastr
//  app.dataservice
//  app.model
// ----------------------------------------------
var app = app || {};
app.filters = app.filters || {};

(function (ko) {

    // Ctor for a SessionFilter
    app.filters.SessionFilter = function () {
        this.self = this;
        self.searchText = ko.observable("");
        self.minTimeSlot = ko.observable();
        self.maxTimeSlot = ko.observable();
        self.favoriteOnly = ko.observable(false);
        // assume user is ko.observable
        self.currentUserId = ko.computed( function() { return app.CurrentUser().Id() }); 
    }

    var tagDelimiter = "|",

        searchTest = function (searchText, session) {
            if (!searchText) return true; // always succeeds if no search text
            var srch = searchText.toLowerCase();
            if (session.title().toLowerCase().search(srch) !== -1) return true;
            if (session.speaker().firstName.toLowerCase.search(srch) !== -1) return true;
            if (session.speaker().lastName.toLowerCase.search(srch) !== -1) return true;
            if (session.track().name.toLowerCase.search(srch) !== -1) return true;
            if ((tagDelimiter + session.tags().toLowerCase() + tagDelimiter)
                .search(tagDelimiter + srch + tagDelimiter) !== -1) return true;
        },

        favoriteTest = function (favoriteOnly, userId, session) {
            if (favoriteOnly) {
                var list = session.attendanceList();
                for (var i = 0; i < list.length; i++) {
                    if (list[i].personId === userId) return true;
                }
                return false; // not a favorite of the current user
            } else {
                return true; // don't care if favorite or not
            }
        },

        timeSlotTest = function (minTimeSlot, maxTimeSlot, session) {
            if (minTimeSlot && minTimeSlot.start > session.timeSlot.start) return false;
            if (maxTimeSlot && maxTimeSlot.start < session.timeSlot.start) return false;
            return true;
        },

        predicate = function (self, session) {
            if (!searchTest(self.searchText, session)) return false;
            if (!favoriteTest(self.favoriteOnly, self.currentUserId, session)) return false;
            if (!timeSlotTest(self.minTimeSlot, self.maxTimeSlot, session)) return false;
        };

    // result is a ko.observableArray, updated by the filter execution
    app.filters.SessionFilter.execute = function (dataContext, result) {
        var sessions = dataContext.sessions; // ToDo: prepare for async
        result(ko.utils.arrayFilter(sessions, function (session) {
            return predicate(self, session);
        }));
        return self;
    };

 
})(ko)