define('presenter',
['jquery'],
    function($) {
        var
            transitionOptions = {
                fadeOut: 100,
                floatIn: 500,
                offset: '15px',
                ease: 'swing'
            },
            
            toggleActivity = function (show) {
                $('#busyindicator').activity(show);
            },

            resetViews = function () {
                $('.view').css({
                    marginLeft: transitionOptions.offset,
                    opacity: 0
                });
            },
            entranceThemeTransition = function($view) {
                $view.css({
                    display: 'block',
                    visibility: "visible"
                }).addClass('view-active').animate({
                    marginLeft: 0,
                    opacity: 1
                }, transitionOptions.floatIn, transitionOptions.ease);
            },
            transitionTo = function($view, route, group) {
                var $activeViews = $('.view-active');

                toggleActivity(true);

                if ($activeViews.length) {
                    $activeViews.fadeOut(transitionOptions.fadeOut, function() {
                        resetViews();
                        entranceThemeTransition($view);
                    });
                    $('.view').removeClass('view-active');
                } else {
                    resetViews();
                    entranceThemeTransition($view);
                }

                // Reset top level nav links
                // Find all NAV links by CSS classname 
                var $group = $(group);
                if ($group) {
                    $(group + '.route-active').removeClass('route-active');
                    if (route) {
                        // Highlight the selected nav that matches the route
                        $group.has('a[href="' + route + '"]').addClass('route-active');
                    }
                }

                toggleActivity(false);
            };
            
        
        return {
            toggleActivity: toggleActivity,
            transitionOptions: transitionOptions,
            transitionTo: transitionTo
        };
    });
