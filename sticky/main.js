$(function(){

    var $mainNav = $('.main-nav'),
        sticked = false;

    $mainNav.on('click', 'a', function(e){
        $(e.target).next('.popup').toggleClass('popup_opened');
        e.preventDefault();
    });

    $clonedNav = $mainNav.clone(true);
    $clonedNav.css({ position: 'fixed', top: 0, left: 0, visibility: 'hidden' });
    $clonedNav.insertAfter($mainNav);

    function scroller(){
        var scrollTop = $(window).scrollTop();
        if(scrollTop >= 100 && !sticked){
            sticked = true;
            $mainNav.css({ visibility: 'hidden' });
            $clonedNav.css({ visibility: 'visible' });

        } else if (scrollTop < 100 && sticked) {
            sticked = false;
            $mainNav.css({ visibility: 'visible' });
            $clonedNav.css({ visibility: 'hidden' });
        }
    }

    scroller();

    window.addEventListener('scroll', scroller, false);

});