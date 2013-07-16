$(function(){

    var LONG_DURATION = 15,
        SHORT_DURATION = 5;

    var $wrapper = $('.wrapper'),
        $cloud = $('.cloud'),
        cloudHeight = $cloud.height(),
        wrapperHeight = $wrapper.height(),
        distance = wrapperHeight + cloudHeight,
        fastSpeed = SHORT_DURATION / distance,
        slowSpeed = LONG_DURATION / distance;

    function getDuration(duration){
        return duration + 's';
    }

    function changeAnimation(top, speed){
        top = parseInt(top);
        var duration = (wrapperHeight - top) * speed;

        $cloud.css({
            top: top,
            animation: 'none'
        });

        setTimeout(function(){
            $cloud.css({ animation: 'anim ' + getDuration(duration) + ' linear' });
        }, 0);
    }

    changeAnimation(-cloudHeight, slowSpeed);

    $cloud.on('webkitAnimationEnd', function(){
        changeAnimation(-cloudHeight, slowSpeed);
    });

    $wrapper
        .on('mouseenter', function(){
            changeAnimation($cloud.css('top'), fastSpeed);
        })
        .on('mouseleave', function(){
            changeAnimation($cloud.css('top'), slowSpeed);
        })

});