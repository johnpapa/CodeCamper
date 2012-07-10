define('vm.speaker',
    ['ko', 'datacontext', 'config', 'messenger', 'sort', 'router'],
    function (ko, datacontext, config, messenger, sort, router) {

        var
            logger = config.logger,
            currentSpeakerId = ko.observable(),
            speaker = ko.observable(),
            speakerSessions = ko.observableArray(),
            
            tmplName = function() {
                return canEdit() ? 'speaker.edit' : 'speaker.view';
            },
            
            canEdit = ko.computed(function () {
                return speaker() && config.currentUser() && config.currentUser().id() === speaker().id();
            }),

            validationErrors = ko.observableArray([]), // Override this after we get a session

            isValid = ko.computed(function () {
                return canEdit() ? validationErrors().length === 0 : true;
            }),

            isDirty = ko.computed(function () {
                if (canEdit()) {
                    return speaker().dirtyFlag().isDirty();
                }
                return false;
            }),

            goBack = ko.asyncCommand({
                execute: function (complete) {
                    router.navigateBack();
                    complete();
                },
                canExecute: function (isExecuting) {
                    return !isDirty();
                }
            }),

            cancel = ko.asyncCommand({
                execute: function (complete) {
                    var callback = function () {
                        complete();
                        logger.success('Refreshed');
                    };
                    getSpeaker(callback, true);
                },
                canExecute: function (isExecuting) {
                    return isDirty();
                }
            }),

            save = ko.asyncCommand({
                execute: function (complete) {
                    if (canEdit()) {
                        $.when(
                            datacontext.persons.updateData(
                                speaker(), {
                                    success: function () { },
                                    error: function () { }
                                }
                            )
                        ).always(function () {
                            complete();
                        });
                        return;
                    } else {
                        complete();
                    }
                },
                canExecute: function (isExecuting) {
                    return isDirty() && isValid();
                }
            }),

            canLeave = function () {
                if (canEdit()) {
                    return !isDirty() && isValid();
                } else {
                    return true;
                }
            },

            activate = function (routeData, callback) {
                messenger.publish.viewModelActivated({ canleaveCallback: canLeave });

                currentSpeakerId(routeData.id);
                getSpeaker(callback);
            },
            
            getSpeaker = function (completeCallback, forceRefresh) {
                var callback = function () {
                    if (completeCallback) {
                        completeCallback();
                    }
                    validationErrors = ko.validation.group(speaker());
                };

                datacontext.persons.getFullPersonById(
                    currentSpeakerId(), {
                        success: function (s) {
                            speaker(s);
                            // Cause the speakerSession computed to reevaluate
                            speaker().personRefresh.notifySubscribers();
                            //getLocalSpeakerSessions();
                            callback();
                        },
                        error: function () {
                            callback();
                        }
                    },
                    forceRefresh
                );
            },
            
            init = function () {
            };

        init();

        return {
            activate: activate,
            cancel: cancel,
            canEdit: canEdit,
            canLeave: canLeave,
            goBack: goBack,
            save: save,
            speaker: speaker,
            speakerSessions: speakerSessions,
            tmplName: tmplName,
            isDirty: isDirty
        };
    });