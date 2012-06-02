define(['jquery', 'ko', 'router'],
    function ($, ko, router) {
        var
            navToSession = function (id) {
                router.navigateTo('#/sessions/' + id);
            },

            favoriteSessionBriefBinding = function (callback, eventName) {
                var eName = eventName || 'click';
                $('#favorites').on(eName, '.session-brief', function () {
                    //var context = ko.contextFor(this);
                    //var session = context.$data;
                    var session = ko.dataFor(this);
                    callback(session);
                    return false;
                });
            },

            sessionBriefBinding = function (callback, eventName) {
                var eName = eventName || 'click';
                $('#sessions').on(eName, '.session-brief', function () {
                    var session = ko.dataFor(this);
                    callback(session);
                    return false;
                });
            },

            favoriteSessionFavoriteBinding = function (callback, eventName) {
                var eName = eventName || 'click';
                $('#favorites').on(eName, '.markfavorite input[type=checkbox]', function () {
                    var session = ko.dataFor(this);
                    callback(session);
                    return false;
                });
            },

            sessionFavoriteBinding = function (callback, eventName) {
                var eName = eventName || 'click';
                $('#sessions').on(eName, '.markfavorite input[type=checkbox]', function () {
                    var session = ko.dataFor(this);
                    callback(session);
                    return false;
                });
            };

        return {
            navToSession: navToSession,
            favoriteSessionFavoriteBinding: favoriteSessionFavoriteBinding,
            favoriteSessionBriefBinding: favoriteSessionBriefBinding,
            sessionBriefBinding: sessionBriefBinding,
            sessionFavoriteBinding: sessionFavoriteBinding
        };
    });

