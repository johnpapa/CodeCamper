define('model.person',
    ['ko', 'config'],
    function (ko, config) {
        var
            _dc = null,
            
            settings = {
                imageBasePath: '../content/images/photos/',
                unknownPersonImageSource: 'unknown_person.jpg',
                twitterUrl: 'http://twitter.com/',
                twitterRegEx: /[@]([A-Za-z0-9_]{1,15})/i,
                urlRegEx: /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/i
            },
            
            Person = function () {
                var self = this;
                self.id = ko.observable();
                self.firstName = ko.observable().extend({ required: true });
                self.lastName = ko.observable().extend({ required: true });
                self.fullName = ko.computed(function () {
                    return self.firstName() + ' ' + self.lastName();
                }, self);

                self.email = ko.observable().extend({ email: true });
                self.blog = ko.observable().extend({
                    pattern: {
                        message: 'Not a valid url',
                        params: settings.urlRegEx
                    }
                });
                self.twitter = ko.observable().extend({
                    pattern: {
                        message: 'Not a valid twitter id',
                        params: settings.twitterRegEx
                    }
                });
                self.twitterLink = ko.computed(function () {
                    return self.twitter() ? settings.twitterUrl + self.twitter() : '';
                });
                self.gender = ko.observable();
                self.imageSource = ko.observable();
                self.imageName = ko.computed(function () {
                    var source = self.imageSource();
                    if (!source) {
                        source = settings.unknownPersonImageSource;
                    }
                    return settings.imageBasePath + source;
                }, self);
                self.bio = ko.observable();

                self.speakerHash = ko.computed(function () {
                    return config.hashes.speakers + '/' + self.id();
                });

                self.speakerSessions = ko.computed({
                    read: function () {
                        return self.id() ? Person.datacontext().persons.getLocalSpeakerSessions(self.id()) : [];
                    },

                    // Delay the eval til the data needed for the computed is ready
                    deferEvaluation: true
                });

                self.isBrief = ko.observable(true);

                self.isNullo = false;

                self.dirtyFlag = new ko.DirtyFlag([
                    self.firstName,
                    self.lastName,
                    self.email,
                    self.blog,
                    self.twitter,
                    self.bio]);
                return self;
            };

        Person.Nullo = new Person()
            .id(0)
            .firstName('Not a')
            .lastName('Person')
            .email('')
            .blog('')
            .twitter('')
            .gender('M')
            .imageSource('')
            .bio('');
        Person.Nullo.isNullo = true;
        Person.Nullo.isBrief = function () { return false; }; // nullo is never brief
        Person.Nullo.dirtyFlag().reset();

        // static member
        Person.datacontext = function (dc) {
            if (dc) { _dc = dc; }
            return _dc;
        };

        return Person;
});