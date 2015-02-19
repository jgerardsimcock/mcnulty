
//We need margins
var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;


var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .5);

var y = d3.scale.linear()
    .range([height, 0]);


/////
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");


var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var x_line = svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

var y_line = svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end");

// scaling
var response = ["number of calls","total sales"];
var converts = [40000, 4000];
x.domain(response)
y.domain([0, d3.max(converts)])


      //.text("Frequency");


function drawBars(response, converts, barclass) {
  // x.domain(data.map(function(d) { return d.letter; }));
  // y.domain([0, d3.max(data, function(d) { return d.frequency; })]);
  
  var drawArea = svg.append("g")
  
  // svg.selectAll(".bar")
  //     .data(data)
  //   .enter().append("rect")
  //     .attr("class", "bar")
  //     .attr("x", function(d) { return x(d.letter); })
  //     .attr("width", x.rangeBand())
  //     .attr("y", function(d) { return y(d.frequency); })
  //     .attr("height", function(d) { return height - y(d.frequency); });

 var data = [{"response": response[0], "num":converts[0]},
             {"response": response[1], "num":converts[1]}]


 var bar = drawArea.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("x", function(d) { return x(d.response); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.num); })
      .attr("height", function(d) { return height - y(d.num); })
      .attr("class", barclass)
      .attr("rx", 15)
      .attr("ry", 15);

  var text = drawArea.selectAll("text")
      .data(data)
      .enter().append("text")
      .text(function(d) {return d.num;})
      .attr("x", function(d,i) {return (i+1) * (width/data.length) - 200; })
      .attr("y", function(d) { return y(d.num) +20; })
      .attr("text-anchor", "middle")
      .attr("dy", ".75em")
      .attr("font-family", "Garamond")
      .attr("font-size", "25px")
      .attr("fill", "white")

}

function changeBars(response, converts){
 

  var data = [{"response": response[0], "num":converts[0]},
               {"response": response[1], "num":converts[1]}]

    
 

    var bars = svg.selectAll("rect")
        .data(data)
        .transition()
        .delay(200)
        .attr("x", function(d) { return x(d.response); })
        .attr("width", x.rangeBand())
        .attr("y", function(d) { return y(d.num); })
        .attr("height", function(d) { return height - y(d.num); })
        .attr("rx", 15)
        .attr("ry", 15);


  // var y_new = d3.scale.linear()
  //              .range([height, 0]);

  x.domain(response)
  y.domain([0, 1000])

  var y_new_Axis = d3.svg.axis()
    .scale(y)
    .orient("left")

 
 svg.selectAll("g.y.axis")
        .transition()
        .delay(1500)
        .call(yAxis)


// var text = bars.selectAll("text")
//         .data(data)
//         .transition()
//         .duration(2000)
//         .text(function(d) {return d.num;})
//         .attr("x", function(d,i) {return (i+1) * (width/data.length) - 200; })
//         .attr("y", function(d) { return y(d.num) + 20; })
//         .attr("text-anchor", "middle")
//         .attr("dy", ".75em")
//         .attr("font-family", "Garamond")
//         .attr("font-size", "25px")
//         .attr("fill", "white")


  bars.transition()
      .delay(3000)
      .ease("elastic")
      .attr("x", function(d) { return x(d.response); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.num); })
      .attr("height", function(d) { return height - y(d.num); });


}


// Draw Bars 1
response = ["number of calls","total sales"];
converts = [40000, 4000];
drawBars(response, converts, "bar1");
// Draw Bars 2
d3.selectAll("rect").on('mouseover', function(d) {
   console.log("YO MOMMA")
   changeBars(["number of calls","total sales"], [1000, 900]);
  
 });
// Draw Bars 3
//response = ["yes", "no"];
//converts = [10000, 700];
//drawBars(response, converts, "bar1");



function type(d) {
  d.frequency = +d.frequency;
  return d;
}