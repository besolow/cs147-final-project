'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
    makePreviews();
})

/*
 * Function that is called when the document is ready.
 */
function makePreviews() {
    $(".thumbnail").dotdotdot();
}
