var width = 710, height = 710;
var g = 9.81; //so length is in meters 
var margin = {top: -20, right: 30, bottom: 40, left: 40};
var x = 10;
var y = 4;
var theta0 = 1.8;
var t = 0;

d3.select("canvas").attr("width", width).attr("height", height);

var canvas = d3.select("canvas");

var context = canvas.node().getContext("2d");


var svg = d3.select("#pendulumApp")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

var xAxis = d3.scaleLinear()
    .domain([0, 20])
    .range([0, width]);

svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xAxis));

var yAxis = d3.scaleLinear()
    .domain([0, 20])
    .range([height, 0]);

svg.append("g")
    .call(d3.axisLeft(yAxis));

var rod = svg.append('line')  /* put before circle code so it doesn't go over the circle */
    .attr('id', 'rod')
    .attr('x2', xAxis(10))
    .attr('y2', yAxis(10))
    .attr('x1', xAxis(x))
    .attr('y1', yAxis(y))
    .attr('stroke', '#FFFFFF')
    .attr('stroke-width', '2px');

var ball = svg.append('circle')
    .attr('id', 'ball')
    .attr('cx', xAxis(x))
    .attr('cy', yAxis(y))
    .attr('r', 13)
    .style('fill', '#FFFFFF');

var update = function () {
    context.beginPath();
    context.strokeStyle = '#0026FF';
    context.moveTo(xAxis(x), yAxis(y))

    t += 0.1;
    var theta = theta0 * Math.cos(Math.sqrt(g / 10) * t);
    x = Math.sin(theta) + 10;
    y = -1 * (Math.cos(theta)) + 4;

    context.lineTo(xAxis(x), yAxis(y))
    context.stroke();

    d3.select('#rod')
        .attr('y2', yAxis(10))
        .attr('x2', xAxis(10))
        .attr('y1', yAxis(y))
        .attr('x1', xAxis(x));

    d3.select('#ball')
        .attr('cx', xAxis(x))
        .attr('cy', yAxis(y));
}

var runApp = setInterval(function () { update(); }, 20);


