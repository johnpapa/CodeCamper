// Depends on
//  Knockout
// 	toastr
//  my.dataservice
//  my.model
// ----------------------------------------------
var app = app || {};

app.datacontext = (function(ko, toastr, dataservice, model) {
    var
        itemsToArray = function (obj, observableArray) {
            if (!observableArray) return;
            var underlyingArray = observableArray();
            
            for (var prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    underlyingArray.push(obj[prop]);
                    //observables.push(obj[prop]);
                }
            }
            observableArray.valueHasMutated();
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
        ContextList = function (getFunction, mapperFunction, nullo) {
            var 
                items = {},
                getById = function (id) {
                    return !!id && !!items[id] ? items[id] : nullo;
                },
                getData = function (options) {
                //return $.Deferred(function (def) {
                    var results = options && options.results,
                        filterFunction = options && options.filterFunction,
                        forceRefresh = options && options.forceRefresh
                    if (!items || !app.utils.hasProperties(items) || forceRefresh) {
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
                        //def.resolve(results)
                    }
                //}).promise();
                };
            return {
                getById: getById,
                getData: getData
            }
        },
        sessions = new ContextList(dataservice.session.getSessionBriefs, model.mapper.mapSession, model.sessionNullo);
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
})(ko, toastr, app.dataservice, app.model);