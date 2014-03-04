'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
    $(".emotions").click(function(e){
        var emotion = $(this).closest('.emotions').attr('id');
        $("#emotionField").val(emotion);
        var html = $(this).closest('.emotions').html();
        $("#emotionDrop").html(html);
    });

    $(".emotionsT").click(function(e){
        var emotion = $(this).closest('.emotionsT').attr('id');
        $("#emotionField").val(emotion);
        $(".emotionsT").css('color', "#333");
        $(this).css('color', '#196966');
    });
})

