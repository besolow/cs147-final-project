'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
    $('#aboutDiv').click(function(e){
        $('#about').toggle(200);
    });

    $('#supportDiv').click(function(e){
        $('#support').toggle(200);
    });

    $('#passDiv').click(function(e){
        $('#pass').toggle(200);
    });

    $('#termsDiv').click(function(e){
        $('#terms').toggle(200);
    });

})
