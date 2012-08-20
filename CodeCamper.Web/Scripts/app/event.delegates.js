define('event.delegates',
    ['jquery', 'ko', 'config'],
    function ($, ko, config) {
        var
            sessionBriefSelector = '.session-brief',
            favoriteSelector = 'button.markfavorite',
            
            bindEventToList = function (rootSelector, selector, callback, eventName) {
                var eName = eventName || 'click';
                $(rootSelector).on(eName, selector, function () {
                    //var context = ko.contextFor(this);
                    //var session = context.$data;
                    var session = ko.dataFor(this);
                    callback(session);
                    return false;
                });
            },

            favoritesListItem = function (callback, eventName) {
                bindEventToList(config.viewIds.favorites, sessionBriefSelector, callback, eventName);
            },

            sessionsListItem = function (callback, eventName) {
                bindEventToList(config.viewIds.sessions, sessionBriefSelector, callback, eventName);
            },
            
            favoritesFavorite = function (callback, eventName) {
                bindEventToList(config.viewIds.favorites, favoriteSelector, callback, eventName);
            },

            sessionsFavorite = function (callback, eventName) {
                bindEventToList(config.viewIds.sessions, favoriteSelector, callback, eventName);
            };

        return {
            favoritesListItem: favoritesListItem,
            favoritesFavorite: favoritesFavorite,
            sessionsListItem: sessionsListItem,
            sessionsFavorite: sessionsFavorite
        };
    });

