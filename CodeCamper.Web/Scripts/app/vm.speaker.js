define('vm.speaker',
    ['ko', 'datacontext', 'config', 'router', 'messenger'],
    function (ko, datacontext, config, router, messenger) {

        var
            // Properties
            currentSpeakerId = ko.observable(),
            logger = config.logger,
            speaker = ko.observable(),
            speakerSessions = ko.observableArray(),
            validationErrors = ko.observableArray(), // Override this after we get a session

            // Knockout Computeds
            canEdit = ko.computed(function () {
                return speaker() && config.currentUser() && config.currentUser().id() === speaker().id();
            }),

            isDirty = ko.computed(function () {
                return canEdit() ? speaker().dirtyFlag().isDirty() : false;
            }),

            isValid = ko.computed(function () {
                return canEdit() ? validationErrors().length === 0 : true;
            }),

            // Methods
            activate = function (routeData, callback) {
                messenger.publish.viewModelActivated({ canleaveCallback: canLeave });
                currentSpeakerId(routeData.id);
                getSpeaker(callback);
            },

            cancelCmd = ko.asyncCommand({
                execute: function(complete) {
                    var callback = function() {
                        complete();
                        logger.success(config.toasts.retreivedData);
                    };
                    getSpeaker(callback, true);
                },
                canExecute: function(isExecuting) {
                    return isDirty();
                }
            }),

            canLeave = function () {
                return canEdit() ? !isDirty() && isValid() : true;
            },

            getSpeaker = function (completeCallback, forceRefresh) {
                var callback = function() {
                    if (completeCallback) { completeCallback(); }
                    validationErrors = ko.validation.group(speaker());
                };

                datacontext.persons.getFullPersonById(
                    currentSpeakerId(), {
                        success: function(s) {
                            speaker(s);
                            callback();
                        },
                        error: callback
                    },
                    forceRefresh
                );
            },

            goBackCmd = ko.asyncCommand({
                execute: function(complete) {
                    router.navigateBack();
                    complete();
                },
                canExecute: function(isExecuting) {
                    return !isDirty();
                }
            }),

            saveCmd = ko.asyncCommand({
                execute: function(complete) {
                    if (canEdit()) {
                        $.when(datacontext.persons.updateData(speaker()))
                            .always(complete);
                    } else {
                        complete();
                    }
                },
                canExecute: function(isExecuting) {
                    return isDirty() && isValid();
                }
            }),

            tmplName = function () {
                return canEdit() ? 'speaker.edit' : 'speaker.view';
            };

        return {
            activate: activate,
            cancelCmd: cancelCmd,
            canEdit: canEdit,
            canLeave: canLeave,
            goBackCmd: goBackCmd,
            isDirty: isDirty,
            isValid: isValid,
            saveCmd: saveCmd,
            speaker: speaker,
            speakerSessions: speakerSessions,
            tmplName: tmplName
        };
    });