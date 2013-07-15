$.ajaxPrefilter(function (options, originalOptions, jqXHR) {
    var ajaxEvents = ['success', 'error'],
        deferred = new $.Deferred(),
        callbacks, original = {};

    // we need to save original ajax callbacks for the future use
    $.each(ajaxEvents, function (i, event) { original[event] = options[event] || $.noop; });

    callbacks = {
        success: function (data) {
            if (data.outcome === 'success') {
                original.success.call(jqXHR, data);
                deferred.resolveWith(jqXHR, [data]);
            } else {
                original.error.call(jqXHR, data);
                deferred.rejectWith(jqXHR, [data]);
            }
        },
        error: function(data){
            original.error.call(jqXHR, data);
            deferred.rejectWith(jqXHR, [data]);
        }
    };

    $.extend(options, callbacks);
    $.extend(jqXHR, deferred.promise());
});

/* ------------------------------------------------ REQUESTS START -------------------------------------------------- */

function demoRun(url, albumId){
    $.ajax({
        type: 'POST',
        url: url,
        data: {
            album_id: albumId,
            command: 'album_save',
            album_title: 'Dark Side Of The Moon'
        },
        success: function(data){
            alert(data.album.band);
        },
        error: function(data){
            if(this.status === 200) alert(data.error);
            else alert(this.statusText);
        }
    });
}

function successDemoRun(){ demoRun('api/albums', 1) }

function errorDemoRun(){ demoRun('api/albums', 450) }

function notFoundDemoRun(){ demoRun('api/undefined', 450) }

/* ------------------------------------------------ REQUESTS END ---------------------------------------------------- */

$(function(){

    $('.success-demo-run').on('click', successDemoRun);
    $('.error-demo-run').on('click', errorDemoRun);
    $('.not-found-demo-run').on('click', notFoundDemoRun);

});
