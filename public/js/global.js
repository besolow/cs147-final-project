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

}
