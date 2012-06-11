//
// Helps with event delegation
//
/////////////////////////////////////////////////////////////////////
define(['jquery', 'ko', 'router'],
    function ($, ko, router) {
        var
            navigateBack = function () {
                router.navigateBack();
            },

            navigateToSession = function (id) {
                router.navigateTo('#/sessions/' + id);
            },

            favoritesListItem = function (callback, eventName) {
                var eName = eventName || 'click';
                $('#favorites').on(eName, '.session-brief', function() {
                    //var context = ko.contextFor(this);
                    //var session = context.$data;
                    var session = ko.dataFor(this);
                    callback(session);
                    return false;
                });
            },

            sessionsListItem = function (callback, eventName) {
                var eName = eventName || 'click';
                $('#sessions').on(eName, '.session-brief', function() {
                    var session = ko.dataFor(this);
                    callback(session);
                    return false;
                });
            },

            favoritesFavorite = function (callback, eventName) {
                var eName = eventName || 'click';
                $('#favorites').on(eName, '.markfavorite input[type=checkbox]', function() {
                    var session = ko.dataFor(this);
                    callback(session);
                    return false;
                });
            },

            sessionsFavorite = function (callback, eventName) {
                var eName = eventName || 'click';
                $('#sessions').on(eName, '.markfavorite input[type=checkbox]', function() {
                    var session = ko.dataFor(this);
                    callback(session);
                    return false;
                });
            };

        return {
            navigateBack: navigateBack,
            navigateToSession: navigateToSession,
            favoritesListItem: favoritesListItem,
            favoritesFavorite: favoritesFavorite,
            sessionsListItem: sessionsListItem,
            sessionsFavorite: sessionsFavorite
        };
    });

