define(['jquery', 'ko', 'config'],
    function ($, ko, config) {
        var
            bindClickEventToSessionList = function (rootSelector, callback, eventName) {
                var eName = eventName || 'click';
                var selector = '.session-brief';
                $(rootSelector).on(eName, selector, function () {
                    //var context = ko.contextFor(this);
                    //var session = context.$data;
                    var session = ko.dataFor(this);
                    callback(session);
                    return false;
                });
            },

            favoritesListItem = function (callback, eventName) {
                bindClickEventToSessionList(config.viewIds.favorites, callback, eventName);
            },

            sessionsListItem = function (callback, eventName) {
                bindClickEventToSessionList(config.viewIds.sessions, callback, eventName);
            },

            bindClickEventToFavorite = function (rootSelector, callback, eventName) {
                var eName = eventName || 'click';
                //var selector = '.markfavorite input[type=checkbox]';
                var selector = 'button.markfavorite';
                $(rootSelector).on(eName, selector, function () {
                    var session = ko.dataFor(this);
                    callback(session);
                    return false;
                });
            },

            favoritesFavorite = function (callback, eventName) {
                bindClickEventToFavorite(config.viewIds.favorites, callback, eventName);
            },

            sessionsFavorite = function (callback, eventName) {
                bindClickEventToFavorite(config.viewIds.sessions, callback, eventName);
            };

        return {
            favoritesListItem: favoritesListItem,
            favoritesFavorite: favoritesFavorite,
            sessionsListItem: sessionsListItem,
            sessionsFavorite: sessionsFavorite
        };
    });

