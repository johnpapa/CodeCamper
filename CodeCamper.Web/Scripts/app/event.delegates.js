define(['jquery', 'ko', 'config'],
    function ($, ko, config) {
        var
            favoritesListItem = function (callback, eventName) {
                var eName = eventName || 'click';
                $(config.viewIds.favorites).on(eName, '.session-brief', function() {
                    //var context = ko.contextFor(this);
                    //var session = context.$data;
                    var session = ko.dataFor(this);
                    callback(session);
                    return false;
                });
            },

            sessionsListItem = function (callback, eventName) {
                var eName = eventName || 'click';
                $(config.viewIds.sessions).on(eName, '.session-brief', function () {
                    var session = ko.dataFor(this);
                    callback(session);
                    return false;
                });
            },

            favoritesFavorite = function (callback, eventName) {
                var eName = eventName || 'click';
                $(config.viewIds.favorites).on(eName, '.markfavorite input[type=checkbox]', function () {
                    var session = ko.dataFor(this);
                    callback(session);
                    return false;
                });
            },

            sessionsFavorite = function (callback, eventName) {
                var eName = eventName || 'click';
                $(config.viewIds.sessions).on(eName, '.markfavorite input[type=checkbox]', function () {
                    var session = ko.dataFor(this);
                    callback(session);
                    return false;
                });
            };

        return {
            favoritesListItem: favoritesListItem,
            favoritesFavorite: favoritesFavorite,
            sessionsListItem: sessionsListItem,
            sessionsFavorite: sessionsFavorite
        };
    });

