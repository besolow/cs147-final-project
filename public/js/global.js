'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
    initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
    console.log("Javascript connected!");
    $("#search-button").click(function(e) {
        e.preventDefault();
        $("#search-bar").slideToggle(function() {
            $('body').toggleClass('lower-body');
        });
    });

    $("#addtag").click(function(e) { 
        e.preventDefault();
        var newtag = $("#addtag-text").val();
        if (newtag!=""){
            $("#tags").append('<span class="label label-default">'+newtag+'</span>&nbsp;');
        }
    });

}
