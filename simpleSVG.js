//<script src="https://d3js.org/d3.v5.min.js"></script>
var height = 400;
var width = 400;
var padding = 40;

var svg=d3.select('body').append("svg")
	.attr('height', height+2*padding).attr('width', width+2*padding)
	.append("g").attr("transform", "translate(" + padding + "," + padding + ")");