var width = 710, height = 710;
var g = 9.81; //so length is in meters 
var l = 0.5; //length of pendulum
var margin = {top: -20, right: 30, bottom: 40, left: 40};
var thetaInit = 0.8;
var xBall = l*Math.sin(thetaInit);
var yBall = -l*Math.cos(thetaInit);
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
    .domain([-1.5, 1.5])
    .range([0, width]);

svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xAxis));

var yAxis = d3.scaleLinear()
    .domain([-1.5, 1.5])
    .range([height, 0]);

svg.append("g")
    .call(d3.axisLeft(yAxis));

var rod = svg.append('line')  /* put before circle code so it doesn't go over the circle */
    .attr('id', 'rod')
    .attr('x2', xAxis(0))
    .attr('y2', yAxis(0))
    .attr('x1', xAxis(xBall))
    .attr('y1', yAxis(yBall))
    .attr('stroke', '#FFFFFF')
    .attr('stroke-width', '2px');

var ball = svg.append('circle')
    .attr('id', 'ball')
    .attr('cx', xAxis(xBall))
    .attr('cy', yAxis(yBall))
    .attr('r', 10)
    .style('fill', '#FFFFFF');

var update = function () {
    context.beginPath();
    context.strokeStyle = '#0026FF';

    context.moveTo(xAxis(xBall) + margin.left, yAxis(yBall) + margin.top);    
    t += .005;
    var theta = thetaInit * Math.cos(Math.sqrt(g / l) * t);
    xBall = l*Math.sin(theta);
    yBall = -l*Math.cos(theta);

    context.lineTo(xAxis(xBall) + margin.left, yAxis(yBall) + margin.top);
    context.stroke();    


    d3.select('#rod')
        .attr('y2', yAxis(0))
        .attr('x2', xAxis(0))
        .attr('y1', yAxis(yBall))
        .attr('x1', xAxis(xBall));

    d3.select('#ball')
        .attr('cx', xAxis(xBall))
        .attr('cy', yAxis(yBall));
}

var runApp = setInterval(function () { update(); }, 5);