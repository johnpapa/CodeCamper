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
my.presenter = (function($) {
    var
        options = {
            fadeOut: 100,
            floatIn: 500,
            offset: '15px',
            ease: 'swing'
        },
        resetViews = function() {
            $('.view').css({
                marginLeft: options.offset,
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
            }, options.floatIn, options.ease);
        },
        transitionTo = function(view) {
            var $view = $(view);
            var $activeViews = $('.view-active');
            if ($activeViews.length){
                $activeViews .fadeOut(options.fadeOut, function() {
                    resetViews();
                    entranceThemeTransition($view);
                });
                $('.view').removeClass('view-active');
            }else{
                resetViews();
                entranceThemeTransition($view);
            }
        };
    return {
        options: options,
        transitionTo: transitionTo
    }
})(jQuery);
