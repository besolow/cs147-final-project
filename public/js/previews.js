'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
    initPage();
})

/*
 * Function that is called when the document is ready.
 */
function initPage() {
    var queryDict = {};
    window.location.search.substr(1).split("&").forEach(function(item) {queryDict[item.split("=")[0]] = item.split("=")[1]})
    $(".thumbnail").dotdotdot();
}
