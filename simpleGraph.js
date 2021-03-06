//<script src="https://d3js.org/d3.v5.min.js"></script>
//creates an svg with optional scales & axis
var height = 400;
var width = 400;
var padding = 40;

var svg=d3.select('body').append("svg")
	.attr('height', height+2*padding).attr('width', width+2*padding)
	.append("g").attr("transform", "translate(" + padding + "," + padding + ")");
//arbitray biggest and smallest values
var extentX=[100, 500]
var extentY=[0, 200]

var xScale=d3.scaleLinear().domain(extentX).range([0,width]);
var yScale=d3.scaleLinear().domain(extentY).range([height,0]);

var xAxis = d3.axisBottom(xScale);
svg.append("g").call(xAxis).attr("transform", "translate(0, "+ (height) + ")");
svg.append("text").attr("x", width / 2).attr("y", height + 35).text("X-axis");

var yAxis = d3.axisLeft(yScale);
svg.append("g").call(yAxis);
svg.append("text").attr("transform", "rotate(270)")
.attr("x", -width / 2).attr("y", -25).text("Y-Axis");