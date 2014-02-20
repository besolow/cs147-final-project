'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
    console.log("page ready");
    addGraph();
})

//fake data for now
var emotions = [
  {"emotion":"happy", "count":5},
  {"emotion":"tired", "count":2},
  {"emotion":"sad", "count":4},
];


//this is just playing around with d3 api
var w = 300;
var h = 400;
var data = emotions.slice();
// var x = d3.scale.linear()
//     .domain([0, d3.max(data.count)])
//     .range([0, w]);
function addGraph() {
  console.log("adding svg");
  var canvas = d3.select(".container")
               .append("svg")
               .attr("width", w)
               .attr("height", h);

console.log("adding things");

  canvas.selectAll("rect")
     .data(data)
     .enter()
       .append("rect")
       .on("click", function(d){click(d)})
       .attr("y", function(d,i) {return i * 50;})
       .attr("width", function(d) {return d.count * 30;})
       .attr("height", 48)
       .attr("fill", "#E94E77");

  canvas.selectAll("text")
      .data(data)
      .enter()
          .append("text")
          .attr("fill", "white")
           .attr("x", 10)
           .attr("y", function(d,i) {return i * 50 + 24;})
           .text(function (d) {return d.emotion; })

  function click(d) {
    console.log(d.emotion);
    window.location.href="/search?queryString="+d.emotion+"&queryField=emotion";
  }
}