define('vm.speaker',
    ['ko', 'datacontext', 'config', 'router', 'messenger'],
    function (ko, datacontext, config, router, messenger) {

        var
            // Properties
            currentSpeakerId = ko.observable(),
            logger = config.logger,
            speaker = ko.observable(),
            speakerSessions = ko.observableArray(),

            validationErrors = ko.computed(function () {
                // We don;t have a speaker early on. So we return an empty [].
                // Once we get a speaker, we want to point to its validation errors.
                var valArray = speaker() ? ko.validation.group(speaker())() : [];
                return valArray;
            })

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
                    return !isExecuting && isDirty();
                }
            }),

            canLeave = function () {
                return canEdit() ? !isDirty() && isValid() : true;
            },

            getSpeaker = function (completeCallback, forceRefresh) {
                var callback = function() {
                    if (completeCallback) { completeCallback(); }
                };
                datacontext.persons.getFullPersonById(
                    currentSpeakerId(), {
                        success: function (s) {
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
                    return !isExecuting && !isDirty();
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
                    return !isExecuting && isDirty() && isValid();
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