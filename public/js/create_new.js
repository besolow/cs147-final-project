'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
    $(".emotions").click(function(e){
        var emotion = $(this).closest('.emotions').attr('id');
        $("#emotionField").val(emotion);
        var html = "I feel "+emotion+'<b class="caret"></b>';
        $("#emotionDrop").html(html);
        $(".emotions").css('color', "#333");
        $(this).css('color', '#196966');
    });
})

