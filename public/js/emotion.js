'use strict';


// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
    var emotions = JSON.parse($("#emotionJSON").val());
    addGraph(emotions);
})

//fake data for now
//var emotions = [
 // {"emotion":"happy", "count":5},
 // {"emotion":"tired", "count":2},
 // {"emotion":"sad", "count":4},
//];


//this is just playing around with d3 api
var w = 300;
var h = 400;
// var x = d3.scale.linear()
//     .domain([0, d3.max(data.count)])
//     .range([0, w]);
function addGraph(emotions) {
  var data = emotions.slice();
  for(var i = 0; i < data.length; i++) {
    if (data[i]['_id']=='default') {
      data.splice(i, 1);
      break;
    }
  }
  console.log(data);
  console.log("adding svg");
  var canvas = d3.select(".container")
               .append("svg")
               .attr("width", w)
               .attr("height", h);

  canvas.selectAll("rect")
     .data(data)
     .enter()
       .append("rect")
       .on("click", function(d){click(d)})
       .attr("y", function(d,i) {return i * 50;})
       .attr("width", function(d) {return d.count * 30;})
       .attr("height", 45)
       .attr("fill", "white");

  canvas.selectAll("text")
      .data(data)
      .enter()
          .append("text")
          .attr("fill", "#196966")
           .attr("x", function(d) {return (d.count * 30)+5;})
           .attr("y", function(d,i) {return i * 50 + 25;})
           .text(function (d) {return d._id+" ("+d.count+")"; })

  function click(d) {
    console.log(d._id);
    window.location.href="/search?queryString="+d._id+"&queryField=emotion";
  }
}