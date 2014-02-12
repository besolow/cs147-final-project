'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
    initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
    $("#search-button").click(function(e) {
        e.preventDefault();
        $("#search-bar").fadeToggle(function() {
            $("#sort-bar").toggle();
        });
    });

    
    $("#addtag").click(function(e) { 
        e.preventDefault();
        var newtag = $("#addtag-text").val();
        if (newtag!=""){
            $(".tags").append('<span class="label label-default">'+newtag+'</span> ');
            $("#hiddenTags").val($("#hiddenTags").val()+"|"+newtag);
            $("#addtag-text").val("");
        }
    });



    $(".thumbnail").dotdotdot();

}
