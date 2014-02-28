'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
    $(".emotions").click(function(e){
        var emotion = $(this).closest('.emotions').attr('id');
        $("#emotionField").val(emotion);
        $(".emotions").css('color', "#000");
        $(this).css('color', '#196966');
    });
})
