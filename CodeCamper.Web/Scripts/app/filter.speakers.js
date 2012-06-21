// Depends on
//  Knockout
//  utils.js
//  config.js
// ----------------------------------------------
define(['ko', 'utils', 'config'],
    function (ko, utils, config) {

        // Ctor for a SpeakersFilter
        var Speakers = function() {
            var self = this;
            self.searchText = ko.observable().extend({ throttle: config.throttle });
            return self;
        };

        Speakers.prototype = function () {
            var
                searchTest = function (searchText, speaker) {
                    try {
                        if (!searchText) return true; // always succeeds if no search text
                        var srch = utils.regExEscape(searchText.toLowerCase());
                        if (speaker.firstName().toLowerCase().search(srch) !== -1) return true;
                        if (speaker.lastName().toLowerCase().search(srch) !== -1) return true;
                    }
                    catch(err)
                    {
                        config.logger.error('filter failed for expression ' + searchText + '. ' + err.message);
                    }
                    return false;
                },
            
                predicate = function (self, speaker) {
                    // Return true if all of these meet the filter criteria. Otherwise, return false
                    var match = searchTest(self.searchText(), speaker);
                    return match;
                };

            return {
                predicate: predicate
            };
        }();
        
    return {
        Speakers: Speakers
    };
})