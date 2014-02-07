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

}
