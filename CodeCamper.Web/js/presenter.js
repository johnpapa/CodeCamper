// Depends on 
//  jQuery
//
// Conventions
//  1) all HTML tags that represent views must use the CSS class .view
//      Active views will have .view-active class added to them.
//  2) all immediate parent containers of all nav links/routes must have 
//      a class to group them, so they can be styled. 
//      ex: route-top or route-left
//      Active routes will have .viewroute active class added to them.
//
// Example:
// 	$('#showA').click(function() { app.presenter.transitionTo('#A') } );
// 	$('#showB').click(function() { app.presenter.transitionTo('#B') } );
// 	app.presenter.transitionTo('#A');
//
// ----------------------------------------------
app.presenter = (function ($) {
    var
        transitionOptions = {
            fadeOut: 100,
            floatIn: 500,
            offset: '15px',
            ease: 'swing'
        },

        resetViews = function () {
            $('.view').css({
                marginLeft: transitionOptions.offset,
                opacity: 0
            });
        },

        entranceThemeTransition = function ($view) {
            $view.css({
                display: 'block',
                visibility: "visible"
            }).addClass('view-active').animate({
                marginLeft: 0,
                opacity: 1
            }, transitionOptions.floatIn, transitionOptions.ease);
        },

        transitionTo = function ($view, route, group) {
            var $activeViews = $('.view-active');
            if ($activeViews.length){
                $activeViews.fadeOut(transitionOptions.fadeOut, function () {
                    resetViews();
                    entranceThemeTransition($view);
                });
                $('.view').removeClass('view-active');
            }else{
                resetViews();
                entranceThemeTransition($view);
            }
            
            // Reset top level nav links
            //var $prevNavElements = $('nav > ul > li > a[href="' + route + '"]')
            //    .closest('nav')
            //    .find('a.route-active')
            //    .removeClass('route-active');
            //TODO: find all NAV links by CSS classname instead. "It's impenetrable and brittle" ... Ward Bell
            $(group + '.route-active').removeClass('route-active');
            if (route) {
                // Highlight the selected nav that matches the route
                // TODO: same thing here. add the .wardbell CSS class
                //$('nav > ul > li > a[href="' + route + '"]').addClass('route-active');
                $(group).has('a[href="' + route + '"]').addClass('route-active');
            }
        };
    
    return {
        transitionOptions: transitionOptions,
        transitionTo: transitionTo
    };
})(jQuery);
