define('dataprimer',
    ['ko', 'datacontext', 'config'],
    function (ko, datacontext, config) {

        var logger = config.logger,
            
            fetch = function() {
                return $.Deferred(function (def) {

                    var data = {
                        rooms: ko.observable(),
                        tracks: ko.observable(),
                        timeslots: ko.observable(),
                        attendance: ko.observable(),
                        persons: ko.observable(),
                        sessions: ko.observable()
                    };

                    $.when(
                        datacontext.rooms.getData({ results: data.rooms }),
                        datacontext.timeslots.getData({ results: data.timeslots }),
                        datacontext.tracks.getData({ results: data.tracks }),
                        datacontext.attendance.getData({ param: config.currentUserId, results: data.attendance }),
                        datacontext.persons.getSpeakers({ results: data.persons }),
                        datacontext.sessions.getData({ results: data.sessions }),
                        datacontext.persons.getFullPersonById(config.currentUserId,
                            {
                                success: function(person) {
                                    config.currentUser(person);
                                }
                            }, true)
                    )

                    .pipe(function () {
                        // Need sessions and speakers in cache before
                        // speakerSessions models can be made (client model only)
                        datacontext.speakerSessions.refreshLocal();
                    })

                    .pipe(function() {
                        logger.success('Fetched data for: '
                            + '<div>' + data.rooms().length + ' rooms </div>'
                            + '<div>' + data.tracks().length + ' tracks </div>'
                            + '<div>' + data.timeslots().length + ' timeslots </div>'
                            + '<div>' + data.attendance().length + ' attendance </div>'
                            + '<div>' + data.persons().length + ' persons </div>'
                            + '<div>' + data.sessions().length + ' sessions </div>'
                            + '<div>' + (config.currentUser().isNullo ? 0 : 1) + ' user profile </div>'
                        );
                    })

                    .fail(function () { def.reject(); })

                    .done(function () { def.resolve(); });

                }).promise();
            };

        return {
            fetch: fetch
        };
    });