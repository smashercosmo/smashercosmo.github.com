$(function(){

    window.requestAnimFrame = (function(){
        return  window.requestAnimationFrame       ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            window.oRequestAnimationFrame      ||
            window.msRequestAnimationFrame     ||
            function(/* function */ callback, /* DOMElement */ element){
                window.setTimeout(callback, 1000 / 60);
            };
    })();

    var $mainNav = $('.main-nav'),
        sticked = false;

    $mainNav.on('click', 'a', function(e){
        $(e.target).next('.popup').toggleClass('popup_opened');
        e.preventDefault();
    });

    $clonedNav = $mainNav.clone(true);
    $clonedNav.css({ position: 'fixed', top: 0, left: 0, opacity: 0 });
    $clonedNav.insertAfter($mainNav);

    function scroller(){
        var scrollTop = $(window).scrollTop();
        if(scrollTop >= 100 && !sticked){
            sticked = true;
            $mainNav.css({ opacity: 0 });
            $clonedNav.css({ opacity: 1 });

        } else if (scrollTop < 100 && sticked) {
            sticked = false;
            $mainNav.css({ opacity: 1 });
            $clonedNav.css({ opacity: 0  });
        }
    }

    scroller();

    window.addEventListener('touchmove', scroller, false);

});