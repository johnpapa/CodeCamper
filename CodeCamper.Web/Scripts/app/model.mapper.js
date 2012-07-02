define('model.mapper',
['model'],
    function (model) {
        var
            attendance = {
                getDtoId: function(dto) {
                    return model.Attendance.makeId(dto.personId, dto.sessionId);
                },
                fromDto: function(dto, item) {
                    item = item || new model.Attendance();
                    item.personId(dto.personId)
                        .sessionId(dto.sessionId);
                    item.rating(dto.rating).text(dto.text);
                    item.dirtyFlag().reset();
                    return item;
                }
            },
        
            room = {
                getDtoId: function(dto) { return dto.id; },
                fromDto: function(dto, item) {
                    item = item || new model.Room().id(dto.id);
                    return item.name(dto.name);
                }
            },
        
            session = {
                getDtoId: function(dto) { return dto.id; },
                fromDto: function(dto, item) {
                    item = item || new model.Session().id(dto.id);
                    item.title(dto.title)
                        .code(dto.code)
                        .description(dto.description)
                        .speakerId(dto.speakerId)
                        .trackId(dto.trackId)
                        .timeslotId(dto.timeSlotId)
                        .roomId(dto.roomId)
                        .level(dto.level)
                        .tags(dto.tags);
                    item.dirtyFlag().reset();
                    item.isBrief(dto.description === undefined); // detect if brief or full session
                    return item;
                }
            },
        
            person = {
                getDtoId: function(dto) { return dto.id; },
                fromDto: function(dto, item) {
                    item = item || new model.Person().id(dto.id);
                    item.firstName(dto.firstName)
                        .lastName(dto.lastName)
                        .email(dto.email)
                        .blog(dto.blog)
                        .twitter(dto.twitter)
                        .gender(dto.gender)
                        .imageSource(dto.imageSource)
                        .bio(dto.bio);
                    item.dirtyFlag().reset();
                    item.isBrief(dto.bio === undefined); // detect if brief or full person
                    return item;
                }
            },
        
            timeSlot = {
                getDtoId: function(dto) { return dto.id; },
                fromDto: function(dto, item) {
                    item = item || new model.TimeSlot().id(dto.id);
                    return item
                        .start(moment(dto.start).toDate())
                        .duration(dto.duration);
                }
            },
        
            track = {
                getDtoId: function (dto) { return dto.id; },
                fromDto: function (dto, item) {
                    item = item || new model.Track().id(dto.id);
                    return item.name(dto.name);
                }
            };

        return {
            attendance: attendance,
            room: room,
            session: session,
            person: person,
            timeSlot: timeSlot,
            track: track
        };
    });