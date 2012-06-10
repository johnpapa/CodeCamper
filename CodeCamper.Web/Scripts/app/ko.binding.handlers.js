define(['jquery', 'ko'],
function ($, ko) {

    ko.utils.wrapAccessor = function (accessor) {
        return function () {
            return accessor;
        };
    };
    
    ko.bindingHandlers.escape = {
        update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
            var command = valueAccessor();
            $(element).keyup(function (event) {
                if (event.keyCode === 27) { // <ESC>
                    command.call(viewModel, viewModel, event);
                }
            });
        }
    };

    ko.bindingHandlers.hidden = {
        update: function (element, valueAccessor) {
            var value = ko.utils.unwrapObservable(valueAccessor());
            ko.bindingHandlers.visible.update(element, function () { return !value; });
        }
    };

    ko.bindingHandlers.starRating = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
            var allBindings = allBindingsAccessor();

            // Create the span's (only do in init)
            for (var i = 0; i < 5; i++) {
                $('<span>').appendTo(element);
            }

            ko.bindingHandlers.starRating.update(element, valueAccessor, allBindingsAccessor, viewModel);
        },

        update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
            // Give the first x stars the 'chosen' class, where x <= rating
            var ratingObservable = valueAccessor(),
                allBindings = allBindingsAccessor(),
                enable = (allBindings.enable !== undefined) ? ko.utils.unwrapObservable(allBindings.enable) : true;

            // Toggle the appropriate CSS classes
            if (enable) {
                $(element).addClass('starRating').removeClass('starRating-readonly');
            }else {
                $(element).removeClass('starRating').addClass('starRating-readonly');
            }
            
            // Wire up the event handlers, if enabled
            if (enable) {
                // Handle mouse events on the stars
                $('span', element).each(function (index) {
                    var $star = $(this);

                    $star.hover(
                        function () {
                            $star.prevAll().add(this).addClass('hoverChosen');
                        },
                        function () {
                            $star.prevAll().add(this).removeClass('hoverChosen');
                        });

                    $star.click(function () {
                        //var ratingObservable = valueAccessor(); // Get the associated observable
                        ratingObservable(index + 1); // Write the new rating to it
                    });
                });
            }
            
            // Toggle the chosen CSS class (fills in the stars for the rating)
            $('span', element).each(function (index) {
                $(this).toggleClass('chosen', index < ratingObservable());
            });
        }
    };


    ko.bindingHandlers.command = {
        init: function(element, valueAccessor, allBindingsAccessor, viewModel) {
            var
                value = valueAccessor(),
                commands = value.execute ? { click: value } : value,
                events = {};
            
            for (var command in commands) {
                events[command] = commands[command].execute;
            }

            ko.bindingHandlers.event.init(
                element,
                ko.utils.wrapAccessor(events),
                allBindingsAccessor,
                viewModel);
        },

        update: function(element, valueAccessor, allBindingsAccessor, viewModel) {
            var
                commands = valueAccessor(),
                canExecute = commands.canExecute
                    || (commands.click ? commands.click.canExecute : null);

            if (!canExecute) {
                return;
            }

            ko.bindingHandlers.enable.update(
                element,
                ko.utils.wrapAccessor(canExecute()),
                allBindingsAccessor,
                viewModel);
        }
    };

    ko.bindingHandlers.activity = {
        init: function(element, valueAccessor, allBindingsAccessor) {
            ko.utils.domNodeDisposal.addDisposeCallback(element, function() {
                $(element).activityEx(false);
            });
        },

        update: function(element, valueAccessor) {
            var activity = valueAccessor()();
            typeof activity !== 'boolean' || $(element).activityEx(activity);
        }
    };
});