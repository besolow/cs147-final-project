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



function addGraph(emotions) {
  var data = emotions.slice();
  for(var i = 0; i < data.length; i++) {
    if (data[i]['_id']=='default') {
      data.splice(i, 1);
      break;
    }
  }
  var w = 400;
  var h = 400;
  var x = d3.scale.linear()
    .domain([0, d3.max(data, function(d) {return d.count; })])
    .range([0, w-150]);

  console.log(data);
  console.log("adding svg");
  var canvas = d3.select(".container").append("svg")
                .attr("width", w)
                .attr("height", h)
              .append("g")
                //.attr("transform", "translate(20,0)");

  var bars = canvas.selectAll(".bar")
     .data(data)
     .enter().append("g")
     .attr("class", "bar")
     //.attr("transform", function(d, i ) {return "translate("+0+","+(i*50) + ")"});

  bars.append("rect")
   .on("click", function(d){click(d)})
   .attr("y", function(d,i) {return i * 50;})
   .attr("width", 0)
   .attr("height", 45)
   .attr("fill", "white")
   .transition()
    .duration(300)
    //.ease("quad")
    .attr("width", function(d) {return x(d.count); });

  bars.append("text")
       .attr("x", function(d) {return x(d.count); })
       .attr("dx", 10)
       .attr("y", function(d,i) {return i * 50 + 25;})
       .attr("text-anchor", "start")
       .attr("fill", "#196966")
       .text(function (d) {return d._id+" ("+d.count+")"; });



  function click(d) {
    console.log(d._id);
    window.location.href="/search?queryString="+d._id+"&queryField=emotion";
  }
}