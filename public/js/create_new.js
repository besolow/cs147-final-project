'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
    $(".emotions").click(function(e){
        var emotion = $(this).closest('.emotions').attr('id');
        console.log(emotion);
        $("#emotionField").val(emotion);
        var html = "I feel "+emotion+'<b class="caret"></b>';
        console.log(html);
        $("#emotionDrop").html(html);
        $(".emotions").css('color', "#333");
        $(this).css('color', '#196966');
    });
})


emotionDrop
