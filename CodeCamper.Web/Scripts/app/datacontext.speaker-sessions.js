define(['jquery', 'underscore', 'ko'],
    function ($, _, ko) {
        /*
         * A data "view" of speakers in cache and their cached sessions
         */
        var SpeakerSessions = function (persons, sessions) {
            
            var items,
                crossMatchSpeakers,
                // Rebuild this data "view" from the current state of the cache
                refreshLocal = function() {
                    items = _.reduce(sessions.getAllLocal(), function(memo, s) {
                        var speakerId = s.speakerId();
                        memo[speakerId] = memo[speakerId] || [];
                        memo[speakerId].push(s);
                        return memo;
                    }, { });
                },
                // Rebuild this data "view" from fresh server data.
                // Returns a promise to get fresh session and person data and
                // refresh this instance of SpeakerSessions.
                // caller can hang its own actions on the returned promise.
                forceDataRefresh = function () {
                   var self = this;
                   return $.when(
                        sessions.getData({ forceRefresh: true }),
                        persons.getSpeakers({ forceRefresh: true })
                    )
                    .done(self.refresh);
                },
                // Get an array of sessions, sorted by title,
                // for the speakerId (a person.id)
                getLocalSessionsBySpeakerId = function (speakerId) {
                    var speakerSessions,
                        results = !!speakerId && !!(speakerSessions = items[speakerId]) ? speakerSessions.slice() : [];

                    return results.sort(function(l, r) { return l.title() > r.title() ? 1 : -1; });
                },
                // Fills the 'results' observable array with speakers
                // optionally filtered and/or sorted
                getLocalSpeakers = function (results, options) {
                    if (!ko.isObservable(results) || results.length === undefined) {
                        throw new Error('must provide a results observable array');
                    }
                    var sortFunction = options && options.sortFunction,
                        filter = options && options.filter;

                    crossMatchSpeakers(results, filter, sortFunction);

                };
                        
            crossMatchSpeakers = function(observableArray, filter, sortFunction) {

                // clear out the results observableArray
                observableArray([]);

                var underlyingArray = observableArray();
                // get an array of persons
                for (var prop in items) {
                    if (items.hasOwnProperty(prop)) {
                        underlyingArray.push(persons.getLocalById(prop));
                    }
                }
                if (filter) {
                    underlyingArray = _.filter(underlyingArray, function(o) {
                        var match = filter.predicate(filter, o);
                        return match;
                    });
                }
                if (sortFunction) {
                    underlyingArray.sort(sortFunction);
                }
                observableArray(underlyingArray);
            };
            
            var init = function () { refreshLocal(); };
            init();

            return {
                getLocalSessionsBySpeakerId: getLocalSessionsBySpeakerId,
                getLocalSpeakers: getLocalSpeakers,
                refreshLocal: refreshLocal,
                forceDataRefresh: forceDataRefresh
            };
        };      
        return {
            SpeakerSessions: SpeakerSessions
        };
    });