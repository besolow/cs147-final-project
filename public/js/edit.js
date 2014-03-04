'use strict';

var tags = [];

$(document).ready(function() {

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

    $("#addtag-text").keydown(function(e) {
        if(e.which === 13) {
            $("#addtag").click();
            e.preventDefault();
        }
    });

    $("#entryText").focus(function(e) {
        $("#addtag").click();
    });

    var tagSuggestions = new Bloodhound({
      datumTokenizer: function(d) { return Bloodhound.tokenizers.whitespace(d.tag); },
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      limit: 10,
      prefetch: {
        url: '/tag_suggest.json',
        ttl: 0,
        filter: function(list) {
          return $.map(list, function(suggestion) { return { tag: suggestion }; });
        }
      }
    });

    tagSuggestions.initialize();

    $('#addtag-text').typeahead(null, {
      name: 'suggestions',
      displayKey: 'tag',
      source: tagSuggestions.ttAdapter()
    });

    $('#entrySubmitBtn').click(function(e) {
        /* if text present then don't show error message */
        if($("#entryText").val()!="") {
            e.stopImmediatePropagation();
            e.preventDefault();
            /* hacky test to only log click events on new entry */
            if(document.title != 'Edit') {
              var emotion = $("#emotionField").val();
              var emotionValue = (emotion == 'default') ? 'no' : 'yes';
              ga("send", "event", "save", "click", emotionValue, {
                'hitCallback': function() {
                  $(".entry-form").submit();
                }
              });
            }
        }
    })
 
})