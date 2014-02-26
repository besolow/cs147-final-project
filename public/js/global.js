'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
    initializePage();
})
var tags = [];
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

    
    $("#addtag").click(function(e) { 
        e.preventDefault();
        var newtag = $("#addtag-text").val();
        if (newtag!="" && $.inArray(newtag, tags)==-1){
            tags.push(newtag);
            $(".tags").append('<span class="label label-default">'+newtag+'</span> ');
            $("#hiddenTags").val($("#hiddenTags").val()+"|"+newtag);
        }
        $("#addtag-text").val("");
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

    $("#addtag-text").keydown(function(e) {
        if(e.which === 13) {
            $("#addtag").click();
            e.preventDefault();
        }
    });

    $("#terms").popover('hide');



   

}
