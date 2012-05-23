// Depends on
//  Knockout
// 	toastr
//  my.dataservice
//  my.model
// ----------------------------------------------
var my = my || {};

my.datacontext = (function(ko, toastr, dataservice, model) {
    var
        itemsToArray = function (obj, observables) {
            if (!observables) return;
            for (var prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    observables.push(obj[prop]);
                }
            }
        },
        mapToContext = function(dtoList, items, results, mapperFunction) {
            // Loop through the raw dto list and populate a dictionary of the items
            items = _.reduce(dtoList, function(memo, dto) {
                var existingItem = items[dto.Id];
                memo[dto.Id] = mapperFunction(dto, existingItem)
                return memo;
            }, { });
            itemsToArray(items, results);
            toastr.success('received with ' + dtoList.length + ' elements');
            return items; // must return these
        },
        //rooms = ko.observableArray(),
        //tracks = ko.observableArray(),
        //timeslots = ko.observableArray(),
        //sessions = function () {
        //    var self = this,
        //        items = {},
        //        getById = function (id) {
        //            // Could return a "NULLO" if it dont exist (an empty object)
        //            return !!id && !!items[id] ? items[id] : null;
        //        },
        //        getData = function (options) { //filterFunction, forceRefresh) {
        //            var results = options.results,
        //                filterFunction = options.filterFunction,
        //                forceRefresh = options.forceRefresh,
        //                callbacks = options.callbacks
        //            if (!items || !my.utils.hasProperties(items) || forceRefresh) {
        //                // TODO: deal with the filter
        //                dataservice.session.getSessions({
        //                    success: function (dtoList) {
        //                        items = mapToContext(dtoList, items, results, model.mapper.mapSession);
        //                        if (callbacks && callbacks.success) {
        //                            callbacks.success();
        //                        }
        //                    },
        //                    error: function () {
        //                         toastr.error('oops! sessions could not be retrieved');
        //                         if (callbacks && callbacks.error) {
        //                             callbacks.error();
        //                         }
        //                    }
        //                })
        //            }
        //            else {
        //                itemsToArray(items, results);
        //            }
        //        };
        //    return {
        //        getById: getById,
        //        getData: getData
        //    }
        //}(),
        //speakers = function () {
        //    var self = this,
        //        items = {},
        //        getById = function (id) {
        //            return !!id && !!items[id] ? items[id] : null;
        //        },
        //        getData = function (options) { //filterFunction, forceRefresh) {
        //            var results = options.results,
        //                filterFunction = options.filterFunction,
        //                forceRefresh = options.forceRefresh,
        //                callbacks = options.callbacks
        //       //getData = function (callback, results, filterFunction, forceRefresh) {
        //            if (!items || !my.utils.hasProperties(items) || forceRefresh) {
        //                // TODO: deal with the filter
        //                dataservice.person.getSpeakers({
        //                    success: function (dtoList) {
        //                        items = mapToContext(dtoList, items, results, model.mapper.mapSpeaker);
        //                        if (callbacks && callbacks.success) { callbacks.success(); }
        //                    },
        //                    error: function () {
        //                        toastr.error('oops! speakers could not be retrieved');
        //                        if (callbacks && callbacks.error) { callbacks.error(); }
        //                    }
        //                })
        //            }
        //            else {
        //                itemsToArray(items, results);
        //            }
        //        };
        //    return {
        //        getById: getById,
        //        getData: getData
        //    }
        //}(),
        

        ContextList = function (getFunction, mapperFunction, nullo) {
            var 
                items = {},
                getById = function (id) {
                    return !!id && !!items[id] ? items[id] : nullo;
                },
                getData = function (options) {
                    var results = options && options.results,
                        filterFunction = options && options.filterFunction,
                        forceRefresh = options && options.forceRefresh
                    if (!items || !my.utils.hasProperties(items) || forceRefresh) {
                        // TODO: deal with the filter
                        return $.Deferred(function (def) {
                            getFunction({
                                success: function (dtoList) {
                                    items = mapToContext(dtoList, items, results, mapperFunction);
                                    def.resolve(dtoList)
                                },
                                error: function () {
                                    toastr.error('oops! data could not be retrieved'); //TODO: get rid of this
                                    def.reject
                                }
                            })
                        }).promise();
                    }
                    else {
                        itemsToArray(items, results);
                    }
                };
            return {
                getById: getById,
                getData: getData
            }
        },

        sessions = new ContextList(dataservice.session.getSessions, model.mapper.mapSession, model.sessionNullo),
        speakers = new ContextList(dataservice.person.getSpeakers, model.mapper.mapSpeaker, model.speakerNullo),
        rooms = new ContextList(dataservice.lookup.getRooms, model.mapper.mapRoom, model.roomNullo),
        timeslots = new ContextList(dataservice.lookup.getTimeslots, model.mapper.mapTimeSlot, model.timeSlotNullo),
        tracks = new ContextList(dataservice.lookup.getTracks, model.mapper.mapTrack, model.trackNullo),


        //TODO: handle persons
        persons = ko.observableArray()



    return {
        rooms: rooms,
        tracks: tracks,
        timeslots: timeslots,
        sessions: sessions,
        persons: persons,
        speakers: speakers
    }
})(ko, toastr, my.dataservice, my.model);
