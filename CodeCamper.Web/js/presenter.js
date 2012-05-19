// Depends on 
//  jQuery
//
// Conventions
//  1) all HTML tags that represent views must use the CSS class .view
//
// Example:
// 	$('#showA').click(function() { my.presenter.transitionTo('#A') } );
// 	$('#showB').click(function() { my.presenter.transitionTo('#B') } );
// 	my.presenter.transitionTo('#A');
// ----------------------------------------------
var my = my || {};

my.presenter = (function ($) {
    var
        transitionOptions = {
            fadeOut: 100,
            floatIn: 500,
            offset: '15px',
            ease: 'swing'
        },
        resetViews = function() {
            $('.view').css({
                marginLeft: transitionOptions.offset,
                opacity: 0
            })
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
        transitionTo = function($view, route) {
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
            var $prevNavElements = $('nav > ul > li > a[href="' + route + '"]')
                .closest('nav')
                .find('a.activeNav')
                .removeClass('activeNav');
            //TODO: find all NAV links by CSS classname instead. "It's impenetrable and brittle" ... Ward Bell
            // $('.wardbells').removeClass('activeNav')
            if (route) {
                // Highlight the selected nav that matches the route
                // TODO: same thing here. add the .wardbell CSS class
                $('nav > ul > li > a[href="' + route + '"]').addClass('activeNav');
            }
        }
    return {
        transitionOptions: transitionOptions,
        transitionTo: transitionTo
    }
})(jQuery);
