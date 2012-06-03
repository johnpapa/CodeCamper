define(['jquery', 'underscore', 'ko', 'model', 'model.mapper', 'dataservice', 'config', 'utils'],
    function ($, _, ko, model, mapper, dataservice, config, utils) {
        var
            logger = config.logger,

            itemsToArray = function (items, observableArray, filter, sortFunction) {
                if (!observableArray) return;

                observableArray([]); // clear the old observableArray

                var underlyingArray = utils.mapMemoToArray(items);

                if (filter) {
                    underlyingArray = _.filter(underlyingArray, function (o) {
                        var match = filter.predicate(filter, o);
                        return match;
                    });
                }
                if (sortFunction) {
                    underlyingArray.sort(sortFunction);
                }
                logger.info('Fetched, filtered and sorted ' + underlyingArray.length + ' records');
                observableArray(underlyingArray);
                //observableArray.valueHasMutated() /// dont need it since we blow away the old observable contents
            },

            mapToContext = function (dtoList, items, results, mapperFunction, filter, sortFunction, propName) {
                // Loop through the raw dto list and populate a dictionary of the items
                items = _.reduce(dtoList, function (memo, dto) {
                    // If propName is passed, use it. Otherwise use id
                    var id = propName ? dto[propName] : dto.Id;
                    var existingItem = items[id];
                    memo[id] = mapperFunction(dto, existingItem);
                    return memo;
                }, {});
                itemsToArray(items, results, filter, sortFunction);
                logger.success('received with ' + dtoList.length + ' elements');
                return items; // must return these
            },

            EntitySet = function (getFunction, mapperFunction, nullo, propName) {
                var items = {},
                    add = function (newObj, keyName) {
                        // If keyName is passed, use it. Otherwise use id property
                        var id = keyName ? newObj[keyName]() : newObj.id();
                        items[id] = newObj;
                    },
                    removeById = function (id, keyName) {
                        // If keyName is passed, use it. Otherwise use id property
                        // Causes observables to be notified (ex: unmarking a favorite)
                        if (keyName) {
                            items[id][keyName](0);
                        } else {
                            items[id].id(0);
                        }
                        // WB: Don't set to nullo; no nullos in datacontext; delete it from items
                        //items[id] = nullo; 
                        delete items[id];
                    },
                    getById = function (id) {
                        return !!id && !!items[id] ? items[id] : nullo;
                    },
                    getData = function (options) {
                        return $.Deferred(function (def) {
                            var results = options && options.results,
                                sortFunction = options && options.sortFunction,
                                filter = options && options.filter,
                                forceRefresh = options && options.forceRefresh,
                                param = options && options.param;
                            //overrideGetFunction = options && options.overrideGetFunction;
                            if (!items || !utils.hasProperties(items) || forceRefresh) {
                                //return $.Deferred(function(def) {
                                getFunction({
                                    success: function (dtoList) {
                                        items = mapToContext(dtoList, items, results, mapperFunction, filter, sortFunction, propName);
                                        def.resolve(dtoList);
                                    },
                                    error: function () {
                                        logger.error('oops! data could not be retrieved'); //TODO: get rid of this
                                        def.reject();
                                    }
                                }, param);
                                //}).promise();
                            } else {
                                itemsToArray(items, results, filter, sortFunction);
                                def.resolve(results);
                            }
                        }).promise();
                    };
                return {
                    add: add,
                    getById: getById,
                    getData: getData,
                    removeById: removeById
                };
            },

            SessionSpeakerEntitySet = function () {
                var items = {},
                    add = function (personId, sessionIds) {
                        // adds a new property for the personId passed in with an array of session ids
                        items[personId] = sessionIds;
                    },
                    removeById = function (personId) {
                        // Removes an entire array of session ids for the personId passed in
                        // Causes observables to be notified (ex: unmarking a favorite)
                        items[personId] = [];
                    },
                    removeSessionById = function (personId, sessionId) {
                        // Removes 1 session id for the personId passed in
                        // Causes observables to be notified (ex: unmarking a favorite)
                        items[personId] = _.without(items[personId], sessionId);
                    },
                    getById = function (personId) {
                        // Gets an array of session ids for the personId passed in
                        return !!personId && !!items[personId] ? items[personId] : [];
                    },
                    crossMatchSpeakers = function (observableArray, filter, sortFunction) {
                        if (!observableArray) return;
                        // clear out the results observableArray
                        observableArray([]);

                        var underlyingArray = observableArray();
                        // get an array of persons
                        for (var prop in items) {
                            if (items.hasOwnProperty(prop)) {
                                underlyingArray.push(persons.getById(prop));
                            }
                        }
                        if (filter) {
                            underlyingArray = _.filter(underlyingArray, function (o) {
                                var match = filter.predicate(filter, o);
                                return match;
                            });
                        }
                        if (sortFunction) {
                            underlyingArray.sort(sortFunction);
                        }
                        observableArray(underlyingArray);
                    },
                    getData = function (options) {
                        var results = options && options.results,
                            sortFunction = options && options.sortFunction,
                            filter = options && options.filter,
                            forceRefresh = options && options.forceRefresh;
                        if (!results) {
                            results = ko.observableArray([]);
                        }
                        if (!items || !utils.hasProperties(items) || forceRefresh) {
                            // create the memo for it and go get the Person objects from the DC
                            var sessionResults = ko.observableArray([]);
                            $.when(sessions.getData({ results: sessionResults })
                            .done(function () {
                                if (sessionResults() && sessionResults().length) {
                                    var underlyingArraySessions = sessionResults();
                                    // create the items memo of items[speakerId] = [sessionId_1, sessionId_1, sessionId_n]
                                    for (var i = 0; i < underlyingArraySessions.length; i++) {
                                        var s = underlyingArraySessions[i];
                                        items[s.speakerId()] = items[s.speakerId()] || [];
                                        items[s.speakerId()].push(s.id());
                                    }
                                    crossMatchSpeakers(results, filter, sortFunction);
                                } else {
                                    logger.error('oops! data could not be retrieved'); //TODO: get rid of this
                                    return;
                                }

                            }));
                        } else {
                            crossMatchSpeakers(results, filter, sortFunction);
                        }
                    };
                return {
                    add: add,
                    getById: getById,
                    getData: getData,
                    removeById: removeById,
                    removeSessionById: removeSessionById
                };
            },

            attendance = new EntitySet(dataservice.attendance.getAttendance, mapper.mapAttendance, model.attendanceNullo, 'SessionId'),
            rooms = new EntitySet(dataservice.lookup.getRooms, mapper.mapRoom, model.roomNullo),
            sessions = new EntitySet(dataservice.session.getSessionBriefs, mapper.mapSession, model.sessionNullo),
            persons = new EntitySet(dataservice.person.getSpeakers, mapper.mapPerson, model.personNullo),
            timeslots = new EntitySet(dataservice.lookup.getTimeslots, mapper.mapTimeSlot, model.timeSlotNullo),
            tracks = new EntitySet(dataservice.lookup.getTracks, mapper.mapTrack, model.trackNullo),

            sessionSpeakers = new SessionSpeakerEntitySet(),

            attendanceCud = {
                addAttendance: function (sessionModel, callbacks) {
                    var attendanceModel = new model.Attendance()
                            .sessionId(sessionModel.id())
                            .personId(config.currentUser().id()),
                            attendanceModelJson = ko.toJSON(attendanceModel);
                    //var data2 = JSON.stringify(attendanceModel);
                    dataservice.attendance.addAttendance({
                        success: function (dto) {
                            if (!dto) {
                                logger.error('oops! data could not be posted'); //TODO: revise error message
                                if (callbacks && callbacks.error) { callbacks.error(); }
                                return;
                            }
                            var newAtt = mapper.mapAttendance(dto); // Map DTO to Model
                            attendance.add(newAtt, 'sessionId'); // Add to the datacontext
                            sessionModel.isFavoriteUpdate.notifySubscribers(); // Trigger re-evaluation of isFavorite
                            logger.success('Added attendance!'); //TODO: 
                            if (callbacks && callbacks.success) { callbacks.success(newAtt); }
                        },
                        error: function (response) {
                            logger.error('oops! data could not be posted'); //TODO: revise error message
                            if (callbacks && callbacks.error) { callbacks.error(); }
                            return;
                        }
                    }, attendanceModelJson);
                },
                updateAttendance: function() {
                    //TODO: implement updateAttendance
                    logger.warning('implement updateAttendance');
                },
                deleteAttendance: function (sessionModel, callbacks) {
                    var attendanceModel = sessionModel.attendance();
                    dataservice.attendance.deleteAttendance({
                        success: function (response) {
                            attendance.removeById(attendanceModel.sessionId(), 'sessionId'); // Add to the datacontext
                            sessionModel.isFavoriteUpdate.notifySubscribers(); // Trigger re-evaluation of isFavorite
                            logger.success('Deleted attendance!'); //TODO: 
                            if (callbacks && callbacks.success) { callbacks.success(); }
                        },
                        error: function (response) {
                            logger.error('oops! data could not be deleted'); //TODO: revise error message
                            if (callbacks && callbacks.error) { callbacks.error(); }
                            return;
                        }
                    }, attendanceModel.personId(), attendanceModel.sessionId());
                }
            };

            //TODO: In dataContext:
            // 1) I have not tested forceRefresh = true. it might work :D
            // 2) Need to add code for allowing the datacontext.persons to get a real person vs speaker (brief).
            // 3) Add code for allowing datacontext.sessions to get a real session, not a brief

        return {
            attendance: attendance,
            persons: persons,
            rooms: rooms,
            sessions: sessions,
            sessionSpeakers: sessionSpeakers,
            timeslots: timeslots,
            tracks: tracks,
            attendanceCud: attendanceCud
    };
});