define('vm.speaker',
    ['ko', 'datacontext', 'config', 'router', 'messenger'],
    function (ko, datacontext, config, router, messenger) {

        var currentSpeakerId = ko.observable(),
            logger = config.logger,
            speaker = ko.observable(),
            speakerSessions = ko.observableArray(),
            validationErrors = ko.observableArray([]), // Override this after we get a session

            activate = function(routeData, callback) {
                messenger.publish.viewModelActivated({ canleaveCallback: canLeave });
                currentSpeakerId(routeData.id);
                getSpeaker(callback);
            },
            cancel = ko.asyncCommand({
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
            canEdit = ko.computed(function() {
                return speaker() && config.currentUser() && config.currentUser().id() === speaker().id();
            }),
            canLeave = function() {
                return canEdit() ? !isDirty() && isValid() : true;
            },
            getSpeaker = function(completeCallback, forceRefresh) {
                var callback = function() {
                    if (completeCallback) {
                        completeCallback();
                    }
                    validationErrors = ko.validation.group(speaker());
                };

                datacontext.persons.getFullPersonById(
                    currentSpeakerId(), {
                        success: function(s) {
                            speaker(s);
                            callback();
                        },
                        error: function() {
                            callback();
                        }
                    },
                    forceRefresh
                );
            },
            goBack = ko.asyncCommand({
                execute: function(complete) {
                    router.navigateBack();
                    complete();
                },
                canExecute: function(isExecuting) {
                    return !isDirty();
                }
            }),
            isDirty = ko.computed(function() {
                if (canEdit()) {
                    return speaker().dirtyFlag().isDirty();
                }
                return false;
            }),
            isValid = ko.computed(function() {
                return canEdit() ? validationErrors().length === 0 : true;
            }),
            save = ko.asyncCommand({
                execute: function(complete) {
                    if (canEdit()) {
                        $.when(
                            datacontext.persons.updateData(
                                speaker(), {
                                    success: function() {
                                    },
                                    error: function() {
                                    }
                                }
                            )
                        ).always(function() {
                            complete();
                        });
                        return;
                    } else {
                        complete();
                    }
                },
                canExecute: function(isExecuting) {
                    return isDirty() && isValid();
                }
            }),
            tmplName = function() {
                return canEdit() ? 'speaker.edit' : 'speaker.view';
            };

        return {
            activate: activate,
            cancel: cancel, //Command
            canEdit: canEdit,
            canLeave: canLeave,
            goBack: goBack,
            isDirty: isDirty,
            isValid: isValid,
            save: save, //Command
            speaker: speaker,
            speakerSessions: speakerSessions,
            tmplName: tmplName
        };
    });