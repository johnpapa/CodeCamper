define('model.session',
    ['ko', 'config'],
    function (ko, config) {
        var Session = function () {
            var self = this;
            self.id = ko.observable();
            self.title = ko.observable().extend({ required: true });
            self.code = ko.observable().extend({ required: true });
            self.speakerId = ko.observable();
            self.trackId = ko.observable();
            self.timeslotId = ko.observable();
            self.roomId = ko.observable();
            self.level = ko.observable().extend({ required: true });
            self.tags = ko.observable();
            self.description = ko.observable();
            self.isFavoriteRefresh = ko.observable();

            self.sessionHash = ko.computed(function () {
                return config.hashes.sessions + '/' + self.id();
            });

            self.tagsFormatted = ko.computed({
                read: function () {
                    var text = self.tags();
                    return text ? text.replace(/\|/g, ', ') : text;
                },

                write: function (value) {
                    self.tags(value.replace(/\, /g, '|'));
                }
            }),

            self.isFavorite = ko.computed({
                read: function () {
                    self.isFavoriteRefresh(); // This exists so we can notify the isFavorite to reevaluate
                    var match = self.attendance().sessionId() === self.id();
                    return !!match;
                },

                // Chicken and the egg kind of situation (attendance or datacontext are setup later)
                // The 'deferEvalation' flag will prevent it from running immediately
                // and it will wait until something actually tries to access its value.
                deferEvaluation: true,

                write: function (value) {
                    //TODO:  explain this
                    // Made this a no-op because without the write, 
                    // when the checkbox is clicked it fires the click event twice 
                    // and sets the computed = true (not the function)
                    return;
                },

                owner: self
            }),

            self.isUnlocked = ko.computed({
                read: function () {
                    var
                        attendance = self.attendance(),
                        unlocked = !(attendance.rating() > 0 || (attendance.text() && attendance.text().length > 0));

                    self.isFavoriteRefresh(); // This exists so we can notify the isUnlocked to reevaluate

                    return unlocked;
                },
                deferEvaluation: true
            }),

            self.isBrief = ko.observable(true);
            self.dirtyFlag = new ko.DirtyFlag([
                self.title,
                self.code,
                self.speakerId,
                self.trackId,
                self.timeslotId,
                self.roomId,
                self.level,
                self.tags,
                self.description]);
            return self;
        };

        Session.Nullo = new Session()
            .id(0)
            .title('Not a Session')
            .code('')
            .speakerId(0)
            .trackId(0)
            .timeslotId(0)
            .roomId(0)
            .description('')
            .level('')
            .tags('');
        Session.Nullo.isNullo = true;
        Session.Nullo.isBrief = function () { return false; }; // nullo is never brief
        Session.Nullo.dirtyFlag().reset();

        var _dc = null;
        Session.datacontext = function (dc) {
            if (dc) { _dc = dc; }
            return _dc;
        };


        Session.prototype = function () {
            var
                dc = Session.datacontext,
                attendance = function () {
                    return dc().attendance.getLocalSessionFavorite(this.id());
                },

                room = function () {
                    return dc().rooms.getLocalById(this.roomId());
                },

                speaker = function () {
                    return dc().persons.getLocalById(this.speakerId());
                },

                timeslot = function () {
                    return dc().timeslots.getLocalById(this.timeslotId());
                },

                track = function () {
                    return dc().tracks.getLocalById(this.trackId());
                };

            return {
                isNullo: false,
                attendance: attendance,
                speaker: speaker,
                room: room,
                timeslot: timeslot,
                track: track
            };
        }();

        return {
            Session: Session
        };
});