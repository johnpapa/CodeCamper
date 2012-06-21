define(['jquery', 'underscore', 'ko', 'model', 'model.mapper', 'dataservice', 'config', 'utils'],
    function ($, _, ko, model, modelmapper, dataservice, config, utils) {
        var
            logger = config.logger,

            getCurrentUserId = function () {
                return config.currentUser().id();
            },

            itemsToArray = function (items, observableArray, filter, sortFunction) {
                if (!observableArray) return;

                var underlyingArray = utils.mapMemoToArray(items);

                if (filter) {
                    underlyingArray = _.filter(underlyingArray, function(o) {
                        var match = filter.predicate(filter, o);
                        return match;
                    });
                }
                if (sortFunction) {
                    underlyingArray.sort(sortFunction);
                }
                //logger.info('Fetched, filtered and sorted ' + underlyingArray.length + ' records');
                observableArray(underlyingArray);
            },

            mapToContext = function (dtoList, items, results, mapper, filter, sortFunction) {
                // Loop through the raw dto list and populate a dictionary of the items
                items = _.reduce(dtoList, function (memo, dto) {
                    // ToDo: Just like mapDtoToContext ... refactor it
                    var id = mapper.getDtoId(dto);
                    var existingItem = items[id];
                    memo[id] = mapper.fromDto(dto, existingItem);
                    return memo;
                }, { });
                itemsToArray(items, results, filter, sortFunction);
                //logger.success('received with ' + dtoList.length + ' elements');
                return items; // must return these
            },

            EntitySet = function(getFunction, mapper, nullo) {
                var
                    items = {},

                    // returns the model item produced by merging dto into context
                    mapDtoToContext = function (dto) {
                        var id = mapper.getDtoId(dto);
                        var existingItem = items[id];
                        items[id] = mapper.fromDto(dto, existingItem);
                        return items[id];
                    },

                    add = function (newObj) {
                        items[newObj.id()] = newObj;
                    },

                    removeById = function (id) {
                        delete items[id];
                    },

                    getLocalById = function (id) {
                        //TODO: only place we set to NULLO
                        return !!id && !!items[id] ? items[id] : nullo; //{ isNullo: true }; //nullo; 
                    },

                    getData = function (options) {
                        return $.Deferred(function(def) {
                            var results = options && options.results,
                                sortFunction = options && options.sortFunction,
                                filter = options && options.filter,
                                forceRefresh = options && options.forceRefresh,
                                param = options && options.param,
                                getFunctionOverride = options && options.getFunctionOverride;

                            getFunction = getFunctionOverride || getFunction;

                            if (!items || !utils.hasProperties(items) || forceRefresh) {
                                getFunction({
                                    success: function(dtoList) {
                                        items = mapToContext(dtoList, items, results, mapper, filter, sortFunction);
                                        def.resolve(dtoList);
                                    },
                                    error: function() {
                                        logger.error('oops! data could not be retrieved'); //TODO: get rid of this
                                        def.reject();
                                    }
                                }, param);
                            } else {
                                itemsToArray(items, results, filter, sortFunction);
                                def.resolve(results);
                            }
                        }).promise();
                    };
                
                return {
                    mapDtoToContext: mapDtoToContext,
                    add: add,
                    getLocalById: getLocalById,
                    getData: getData,
                    removeById: removeById
                };
            },

            SessionSpeakerEntitySet = function () {
                var
                    items = {},

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

                    getLocalById = function (personId) {
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
                            $.when(sessions.getData({ results: sessionResults, forceRefresh: forceRefresh })
                                .done(function() {
                                    if (sessionResults() && sessionResults().length) {
                                        var underlyingArraySessions = sessionResults();
                                        // create the items memo of items[speakerId] = [sessionId_1, sessionId_1, sessionId_n]
                                        items = _.reduce(underlyingArraySessions, function (memo, s) {
                                            memo[s.speakerId()] = memo[s.speakerId()] || [];
                                            memo[s.speakerId()].push(s.id());
                                            return memo;
                                        }, items);
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
                    getLocalById: getLocalById,
                    getData: getData,
                    removeById: removeById,
                    removeSessionById: removeSessionById
                };
            },

            attendance = new EntitySet(dataservice.attendance.getAttendance, modelmapper.attendance, model.attendanceNullo),
            rooms = new EntitySet(dataservice.lookup.getRooms, modelmapper.room, model.roomNullo),
            sessions = new EntitySet(dataservice.session.getSessionBriefs, modelmapper.session, model.sessionNullo),
            persons = new EntitySet(dataservice.person.getPersons, modelmapper.person, model.personNullo),
            timeslots = new EntitySet(dataservice.lookup.getTimeslots, modelmapper.timeSlot, model.timeSlotNullo),
            tracks = new EntitySet(dataservice.lookup.getTracks, modelmapper.track, model.trackNullo),
            sessionSpeakers = new SessionSpeakerEntitySet();

            // Attendance extensions
            attendance.addModel = function (sessionModel, callbacks) {
                var attendanceModel = new model.Attendance()
                        .sessionId(sessionModel.id())
                        .personId(getCurrentUserId()),
                        attendanceModelJson = ko.toJSON(attendanceModel);

                return $.Deferred(function (def) {
                    dataservice.attendance.addAttendance({
                        success: function (dto) {
                            if (!dto) {
                                logger.error('oops! data could not be posted'); //TODO: revise error message
                                if (callbacks && callbacks.error) { callbacks.error(); }
                                def.reject();
                                return;
                            }
                            var newAtt = modelmapper.attendance.fromDto(dto); // Map DTO to Model
                            attendance.add(newAtt); // Add to the datacontext
                            sessionModel.isFavoriteRefresh.notifySubscribers(); // Trigger re-evaluation of isFavorite
                            logger.success('Added attendance!'); //TODO: 
                            if (callbacks && callbacks.success) {
                                def.resolve(dto);
                                callbacks.success(newAtt);
                            }
                        },
                        error: function (response) {
                            logger.error('oops! data could not be posted'); //TODO: revise error message
                            if (callbacks && callbacks.error) {
                                def.reject(response);
                                callbacks.error();
                            }
                            return;
                        }
                    }, attendanceModelJson);
                }).promise();
            };

            attendance.updateModel = function (sessionModel, callbacks) {
                var
                    attendanceModel = sessionModel.attendance(),
                    attendanceModelJson = ko.toJSON(attendanceModel);
                    
                return $.Deferred(function(def) {
                    dataservice.attendance.updateAttendance({
                        success: function (response) {
                            logger.success('Updated attendance!'); 
                            if (callbacks && callbacks.success) {
                                attendanceModel.dirtyFlag().reset();
                                def.resolve(response);
                                callbacks.success();
                            }
                        },
                        error: function (response) {
                            logger.error('oops! data could not be posted'); //TODO: revise error message
                            if (callbacks && callbacks.error) {
                                def.reject(response);
                                callbacks.error();
                            }
                            return;
                        }
                    }, attendanceModelJson)
                }).promise();
            };
                
            attendance.deleteModel = function (sessionModel, callbacks) {
                var attendanceModel = sessionModel.attendance();
                return $.Deferred(function (def) {
                    dataservice.attendance.deleteAttendance({
                        success: function (response) {
                            attendance.removeById(attendanceModel.id());
                            sessionModel.isFavoriteRefresh.notifySubscribers(); // Trigger re-evaluation of isFavorite
                            logger.success('Deleted attendance!'); //TODO: 
                            if (callbacks && callbacks.success) {
                                def.resolve(response);
                                callbacks.success();
                            }
                        },
                        error: function (response) {
                            logger.error('oops! data could not be deleted'); //TODO: revise error message
                            if (callbacks && callbacks.error) {
                                def.reject(response);
                                callbacks.error();
                            }
                            return;
                        }
                    }, attendanceModel.personId(), attendanceModel.sessionId());
                }).promise();
            };

            // Extend Attendance entityset with ability to get attendance for the current user (aka, the favorite)
            // This is a "Local" method, so it gets it from the DC only, no promise returned, no callbacks.
            attendance.getLocalSessionFavorite = function (sessionId) {
                var
                    id = model.Attendance.makeId(getCurrentUserId(), sessionId),
                    att = attendance.getLocalById(id);
                return att;
            },

            // Extend Attendance entityset with ability to get attendance for the current user (aka, the favorite)
            attendance.getSessionFavorite = function (sessionId, callbacks, forceRefresh) {
                return $.Deferred(function (def) {
                    var
                        id = model.Attendance.makeId(getCurrentUserId(), sessionId),
                        att = attendance.getLocalById(id);

                    if (att.isNullo || forceRefresh) {
                        // get fresh from database
                        dataservice.attendance.getAttendance(
                            {
                                success: function (dto) {
                                    // updates the session returned from getLocalById() above
                                    att = attendance.mapDtoToContext(dto);
                                    if (callbacks && callbacks.success) { callbacks.success(att); }
                                    def.resolve(dto);
                                },
                                error: function (response) {
                                    logger.error('oops! could not retrieve attendance ' + sessionId); //TODO: revise error message
                                    if (callbacks && callbacks.error) { callbacks.error(response); }
                                    def.reject(response);
                                }
                            },
                            getCurrentUserId(),
                            sessionId
                        );
                    } else {
                        if (callbacks && callbacks.success) { callbacks.success(att); }
                        def.resolve(att);
                    }
                }).promise();
            };
        
            // extend Sessions enttityset 
            sessions.getFullSessionById = function(id, callbacks, forceRefresh) {
                return $.Deferred(function (def) {
                    var session = sessions.getLocalById(id);
                    if (session.isNullo || session.isBrief() || forceRefresh) {
                        // if nullo or brief, get fresh from database
                        dataservice.session.getSession({
                            success: function (dto) {
                                // updates the session returned from getLocalById() above
                                session = sessions.mapDtoToContext(dto);
                                session.isBrief(false); // now a full session
                                //logger.success('merged full session'); //TODO: revise message
                                if (callbacks && callbacks.success) { callbacks.success(session); }
                                def.resolve(dto);
                            },
                            error: function (response) {
                                logger.error('oops! could not retrieve session ' + id); //TODO: revise error message
                                if (callbacks && callbacks.error) { callbacks.error(response); }
                                def.reject(response);
                            }
                        },
                        id);
                    }
                    else {
                        if (callbacks && callbacks.success) { callbacks.success(session); }
                        def.resolve(session);
                    }
                }).promise();
            };

            sessions.updateSession = function (sessionModel, callbacks) {
                var
                    sessionJson = ko.toJSON(sessionModel);

                return $.Deferred(function (def) {
                    dataservice.session.updateSession({
                        success: function (response) {
                            logger.success('Updated session!');
                            if (callbacks && callbacks.success) {
                                sessionModel.dirtyFlag().reset();
                                def.resolve(response);
                                callbacks.success();
                            }
                        },
                        error: function (response) {
                            logger.error('oops! data could not be posted'); //TODO: revise error message
                            if (callbacks && callbacks.error) {
                                def.reject(response);
                                callbacks.error();
                            }
                            return;
                        }
                    }, sessionJson)
                }).promise();
            };

            // extend Persons entitySet 
            persons.getSpeakers = function (options) {
                _.extend(options, {
                    getFunctionOverride: dataservice.person.getSpeakers
                });
                return persons.getData(options);
            },

            persons.getFullPersonById = function (id, callbacks, forceRefresh) {
                return $.Deferred(function (def) {
                    var person = persons.getLocalById(id);
                    if (person.isNullo || person.isBrief() || forceRefresh) {
                        // if nullo or brief, get fresh from database
                        dataservice.person.getPerson({
                            success: function (dto) {
                                // updates the person returned from getLocalById() above
                                person = persons.mapDtoToContext(dto);
                                person.isBrief(false); // now a full session
                                //logger.success('merged full person'); //TODO: revise message
                                callbacks.success(person);
                                def.resolve(dto);
                            },
                            error: function (response) {
                                logger.error('oops! could not retrieve person ' + id); //TODO: revise error message
                                if (callbacks && callbacks.error) { callbacks.error(response); }
                                def.reject(response);
                            }
                        },
                        id);
                    } else {
                        callbacks.success(person);
                        def.resolve(person);
                    }
                    //return person; // immediately return cached person (nullo, brief, or full)
                }).promise();
            };
        
        return {
            attendance: attendance,
            persons: persons,
            rooms: rooms,
            sessions: sessions,
            sessionSpeakers: sessionSpeakers,
            timeslots: timeslots,
            tracks: tracks
    };
});