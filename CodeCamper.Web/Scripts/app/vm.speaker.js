define(['ko', 'datacontext', 'config', 'messenger', 'sort', 'router'],
    function (ko, datacontext, config, messenger, sort, router) {

        var
            logger = config.logger,
            currentSpeakerId = ko.observable(),
            speaker = ko.observable(),
            sessions = ko.observableArray(),
            
            tmplName = function() {
                return canEdit() ? 'speaker.edit' : 'speaker.view';
            },
            
            canEdit = ko.computed(function () {
                return speaker() && config.currentUser().id() === speaker().id();
            }),

            validationErrors = ko.observableArray([]), // Override this after we get a session

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
                    return isDirty() && validationErrors().length === 0;
                }
            }),

            canLeave = function () {
                return !isDirty() || validationErrors().length === 0;
            },

            activate = function (routeData) {
                config.logger.info('here');
                messenger.publish.viewModelActivated({ canleaveCallback: canLeave });

                currentSpeakerId(routeData.id);
                getSpeaker();
                //getSessions();
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
                            callback();
                        },
                        error: function () {
                            callback();
                        }
                    },
                    forceRefresh
                );
            },
            
            getSessions = function () {
                //if (!sessions().length) {
                //    datacontext.sessions.getData({
                //        results: sessions,
                //        sortFunction: sort.sessionSort
                //    });
                //}
            },

            init = function () {
            };

        // Initialization
        init();

        return {
            activate: activate,
            cancel: cancel,
            canEdit: canEdit,
            canLeave: canLeave,
            goBack: goBack,
            //sessions: sessions,
            speaker: speaker,
            save: save,
            tmplName: tmplName,
            isDirty: isDirty
        };
    });