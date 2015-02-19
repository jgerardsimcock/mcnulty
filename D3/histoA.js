var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;


var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");
    //.ticks(10, "%");

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// scaling
var response = ["yes", "no"];
var converts = [40000, 4000];
x.domain(response)
y.domain([0, d3.max(converts)])

svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end");
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


 drawArea.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.response); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.num); })
      .attr("height", function(d) { return height - y(d.num); })
      .attr("class", barclass);


}

// Draw Bars 1
response = ["yes", "no"];
converts = [40000, 4000];
drawBars(response, converts, "bar1");
// Draw Bars 2
response = ["yes", "no"];
converts = [30000, 1000];
drawBars(response, converts, "bar2");
// Draw Bars 3
//response = ["yes", "no"];
//converts = [10000, 700];
//drawBars(response, converts, "bar1");


function type(d) {
  d.frequency = +d.frequency;
  return d;
}