define('filter.sessions',
    ['ko', 'utils', 'config'],
    function(ko, utils, config) {

        var SessionFilter = function() {
            var self = this;
            self.favoriteOnly = ko.observable(false);
            self.minDate = ko.observable();
            self.maxDate = ko.observable();
            self.searchText = ko.observable().extend({ throttle: config.throttle });
            self.speaker = ko.observable(); // object
            self.timeslot = ko.observable(); // object
            self.track = ko.observable(); // object
            return self;
        };

        SessionFilter.prototype = function () {
            var tagDelimiter = '|',
                escapedTagDelimiter = '\\|',
                searchTest = function(searchText, session) {
                        if (!searchText) return true; // always succeeds if no search text
                        var srch = utils.regExEscape(searchText.toLowerCase());
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
                        return match;
                    } else {
                        return true; // don't care if favorite or not
                    }
                },

                timeSlotTest = function (minDate, maxDate, session) {
                    // Return true if it meets the filter criteria. Otherwise, return false
                    if (minDate && minDate > session.timeslot().start()) return false;
                    if (maxDate && maxDate < session.timeslot().start()) return false;
                    return true;
                },

                modelTest = function (timeslot, speaker, track, session) {
                    // Return true if it meets the filter criteria. Otherwise, return false
                    if (timeslot && timeslot.id() !== session.timeslot().id()) return false;
                    if (speaker && speaker.id() !== session.speaker().id()) return false;
                    if (track && track.id() !== session.track().id()) return false;
                    return true;
                },

                predicate = function (self, session) {
                    // Return true if all of these meet the filter criteria. Otherwise, return false
                    var match = searchTest(self.searchText(), session)
                        && favoriteTest(self.favoriteOnly(), session)
                        && timeSlotTest(self.minDate(), self.maxDate(), session)
                        && modelTest(self.timeslot(), self.speaker(), self.track(), session);
                    return match;

                    //PAPA: testing only. 
                    //var matchSearch = searchTest(self.searchText(), session),
                    //    matchFav = favoriteTest(self.favoriteOnly(), session),
                    //    matchTime = timeSlotTest(self.minDate(), self.maxDate(), session),
                    //    matchModels = modelTest(self.timeslot(), self.speaker(), self.track(), session);
                    //console.log('search filter matched: ' + matchSearch);
                    //console.log('favorites filter matched: ' + matchFav);
                    //console.log('time filter matched: ' + matchTime);
                    //console.log('models filter matched: ' + matchModels);
                    //console.log('MATCH === ' + matchSearch && matchFav && matchTime && matchModels);
                    //return matchSearch && matchFav && matchTime && matchModels;
                };

            return {
                predicate: predicate
            };
        }();

        return SessionFilter;
    });