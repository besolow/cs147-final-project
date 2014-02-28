'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
    initializePage();
})
/*
 * Function that is called when the document is ready.
 */
function initializePage() {
    var $searchBar = $("#search-bar");
    var $sortBar = $("#sort-bar");

    $("#search-button").click(function(e) {
        e.preventDefault();
        //search is showing, so hide it
        if($searchBar.is(":visible")) {
            $sortBar.fadeIn(function() {
                $searchBar.hide();
            });
        //search bar hidden so show it
        } else {
            $searchBar.show();
            $sortBar.fadeOut();
            $("#search-input").focus();
        }
    });

    
    
    
    //make tags clickable to view by tag
    $(".tag-link").click(function(e) {
        e.preventDefault();
        var tagName = $(this).text();
        if (tagName != undefined || tagName != null) {
            window.location = '/search?queryField=tag&queryString=' + tagName;
        }
    });

    $("#tag-sort-pop").click(function(e) {
        e.preventDefault();
        window.location = '/tags/pop';
        //$.get("/tag_sort/pop", displaySortResult);
    });

    $("#tag-sort-abc").click(function(e) {
        e.preventDefault();
        window.location = '/tags/abc';
        //$.get("/tag_sort/abc", displaySortResult);
    });


    $("#terms").popover('hide');

}
