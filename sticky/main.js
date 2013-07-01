$(function(){

    $mainNav = $('.main-nav');

    $mainNav.on('click', 'a', function(e){
        $(e.target).next('.popup').toggleClass('popup_opened');
    });

    $clonedNav = $mainNav.clone(true);
    $clonedNav.css({ position: 'fixed', top: 0, left: 0 });
    $clonedNav.insertAfter($mainNav);


});