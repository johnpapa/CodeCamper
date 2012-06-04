define(['ko'],
function (ko) {
    
    ko.bindingHandlers.escape = {
        update: function (element, valueAccessor) {
            var command = valueAccessor();
            $(element).keyup(function (event) {
                if (event.keyCode === 27) { // <ESC>
                    command();
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

    ko.bindingHandlers.fadeVisible = {
        init: function(element, valueAccessor) {
            // Start visible/invisible according to initial value
            var shouldDisplay = valueAccessor();
            $(element).toggle(shouldDisplay);
        },

        update: function(element, valueAccessor, allBindingsAccessor) {
            // On update, fade in/out
            var shouldDisplay = valueAccessor(),
                allBindings = allBindingsAccessor(),
                duration = allBindings.fadeDuration || 500; // 500ms is default duration unless otherwise specified

            shouldDisplay ? $(element).fadeIn(duration) : $(element).fadeOut(duration);
        }
    };

    ko.bindingHandlers.slideVisible = {
        init: function(element, valueAccessor) {
            // Start visible/invisible according to initial value
            $(element).toggle(valueAccessor());
        },
        update: function(element, valueAccessor, allBindingsAccessor) {
            var// First get the latest data that we're bound to
                value = valueAccessor(),
                // Now get the other bindings in the same data-bind attr
                allBindings = allBindingsAccessor(),
                // Next, whether or not the supplied model property is observable, get its current value
                valueUnwrapped = ko.utils.unwrapObservable(value),
                // 400ms is default duration unless otherwise specified
                duration = allBindings.slideDuration || 400;

            // Now manipulate the DOM element
            if (valueUnwrapped == true) {
                $(element).slideDown(duration); // Make the element visible
            } else {
                $(element).slideUp(duration); // Make the element invisible
            }
        }
    };

    ko.bindingHandlers.starRating = {
        init: function(element, valueAccessor) {
            $(element).addClass("starRating");
            for (var i = 0; i < 5; i++) {
                $("<span>").appendTo(element);
            }
            // Handle mouse events on the stars
            $("span", element).each(function(index) {
                $(this).hover(
                    function() {
                        $(this).prevAll().add(this).addClass("hoverChosen");
                    },
                    function() {
                        $(this).prevAll().add(this).removeClass("hoverChosen");
                    }).click(function() {
                        var ratingObservable = valueAccessor(); // Get the associated observable
                        ratingObservable(index + 1); // Write the new rating to it
                    });
            });
        },

        update: function(element, valueAccessor) {
            // Give the first x stars the "chosen" class, where x <= rating
            var ratingObservable = valueAccessor();
            $("span", element).each(function(index) {
                $(this).toggleClass("chosen", index < ratingObservable());
            });
        }
    };
});