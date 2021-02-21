var width = 550, height = 550;
var g = 9.81; //so length is in meters 
var l = 1.2; //length of pendulum
var margin = {top: -20, right: 30, bottom: 40, left: 40};
var thetaInit = 50 * (Math.PI/180);
var theta = 50 * (Math.PI/180);
var thetaDot = 0;
var xBallSmallAngle = l*Math.sin(thetaInit);
var yBallSmallAngle = -l*Math.cos(thetaInit);
var xBallExact = l*Math.sin(thetaInit); 
var yBallExact = -l*Math.cos(thetaInit);
var t = 0;
var stepSize = 0.01;
var paused = 1;

$("#pauseButton").click(function() {
    paused = !paused;
    if (paused) {
        $("#pauseButton").html("Play");
    }
    else {
        $("#pauseButton").html("Pause");       
    }
});


$("#thetaSlider").on("change", function() {
    paused = 1;
    $("#pauseButton").html("Play");
    theta = $(this).val() * (Math.PI/180);
    thetaInit = theta;
    theta = $(this).val() * (Math.PI/180);
    thetaInit = theta;
    $("#thetaInfo").html("<i>&#952;</i>: " + $(this).val());    
    reset();
});

/*$("#lengthSlider").on("input", function() {
    l = $(this).val();
    $("#lengthInfo").html("Length: " + $(this).val());
}); */ //comment out cuz buggy for now fix later

function reset() {

    paused = 1;
    thetaDot = 0;
    xBallSmallAngle = l*Math.sin(thetaInit);
    yBallSmallAngle = -l*Math.cos(thetaInit);
    xBallExact = l*Math.sin(thetaInit);
    yBallExact = -l*Math.cos(thetaInit);
    d3.select('#rodExact')
        .attr('y2', yAxis(0))
        .attr('x2', xAxis(0))
        .attr('y1', yAxis(yBallExact))
        .attr('x1', xAxis(xBallExact));

    d3.select('#ballExact')
        .attr('cx', xAxis(xBallExact))
        .attr('cy', yAxis(yBallExact));

    d3.select('#rodSmallAngle')
        .attr('y2', yAxis(0))
        .attr('x2', xAxis(0))
        .attr('y1', yAxis(yBallSmallAngle))
        .attr('x1', xAxis(xBallSmallAngle));

    d3.select('#ballSmallAngle')
        .attr('cx', xAxis(xBallSmallAngle))
        .attr('cy', yAxis(yBallSmallAngle));
  
    t = 0;
}

function uDot(t, theta, thetaDot) { //first ODE
    return(thetaDot);
}

function vDot(t, theta, thetaDot) { //second ODE
    return( (-g/l) * Math.sin(theta) );
}

function RK4() {
        k0 = stepSize * uDot(t, theta, thetaDot);
        l0 = stepSize * vDot(t, theta, thetaDot);
        k1 = stepSize * uDot(t+(0.5*stepSize), theta+(0.5*k0), thetaDot+(0.5*l0) );
        l1 = stepSize * vDot(t+(0.5*stepSize), theta+(0.5*k0), thetaDot+(0.5*l0) );
        k2 = stepSize * uDot(t+(0.5*stepSize), theta+(0.5*k1), thetaDot+(0.5*l1) );
        l2 = stepSize * vDot(t+(0.5*stepSize), theta+(0.5*k1), thetaDot+(0.5*l1) );
        k3 = stepSize * uDot(t + stepSize, theta+k2, thetaDot+l2);
        l3 = stepSize * vDot(t + stepSize, theta+k2, thetaDot+l2);
        theta = theta + (1/6) * (k0 + 2*k1 + 2*k2 + k3);
        thetaDot = thetaDot + (1/6) * (l0 + 2*l1 + 2*l2 + l3);
    }

d3.select("canvas").attr("width", width).attr("height", height);

var canvas = d3.select("canvas");

var context = canvas.node().getContext("2d");

var svg = d3.select("#pendulumSmallAngle")
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

/*Create legend*/
svg.append("circle").attr("cx",xAxis(-1.2)).attr("cy",yAxis(1.2)).attr("r", 6).style("fill", "#FFFFFF");
svg.append("circle").attr("cx",xAxis(-1.2)).attr("cy",yAxis(1)).attr("r", 6).style("fill", "#8a8a8a");
svg.append("text").attr("x", xAxis(-1.15)).attr("y", yAxis(1.2)).text("Small Angle Approximation").style("font-size", "19px").style("fill", "white").attr("alignment-baseline","middle");
svg.append("text").attr("x", xAxis(-1.15)).attr("y", yAxis(1)).text("Exact Solution").style("font-size", "19px").style("fill", "white").attr("alignment-baseline","middle");


var rodSmallAngle = svg.append('line')  /* put before circle code so it doesn't go over the circle */
    .attr('id', 'rodSmallAngle')
    .attr('x2', xAxis(0))
    .attr('y2', yAxis(0))
    .attr('x1', xAxis(xBallSmallAngle))
    .attr('y1', yAxis(yBallSmallAngle))
    .attr('stroke', '#FFFFFF')
    .attr('stroke-width', '2px');

var ballSmallAngle = svg.append('circle')
    .attr('id', 'ballSmallAngle')
    .attr('cx', xAxis(xBallSmallAngle))
    .attr('cy', yAxis(yBallSmallAngle))
    .attr('r', 10)
    .style('fill', '#FFFFFF');

var rodExact = svg.append('line')  
    .attr('id', 'rodExact')
    .attr('x2', xAxis(0))
    .attr('y2', yAxis(0))
    .attr('x1', xAxis(xBallExact))
    .attr('y1', yAxis(yBallExact))
    .attr('stroke', '#8a8a8a')
    .attr('stroke-width', '2px');

var ballExact = svg.append('circle')
    .attr('id', 'ballExact')
    .attr('cx', xAxis(xBallExact))
    .attr('cy', yAxis(yBallExact))
    .attr('r', 10)
    .style('fill', '#8a8a8a');    



var update = function () {
   
    t += .01;
    let thetaSmallAngle = thetaInit * Math.cos(Math.sqrt(g / l) * t);
    RK4();
    xBallSmallAngle = l*Math.sin(thetaSmallAngle);
    yBallSmallAngle = -l*Math.cos(thetaSmallAngle);
    xBallExact = l*Math.sin(theta);
    yBallExact = -l*Math.cos(theta);

    d3.select('#rodExact')
        .attr('y2', yAxis(0))
        .attr('x2', xAxis(0))
        .attr('y1', yAxis(yBallExact))
        .attr('x1', xAxis(xBallExact));

    d3.select('#ballExact')
        .attr('cx', xAxis(xBallExact))
        .attr('cy', yAxis(yBallExact));

    d3.select('#rodSmallAngle')
        .attr('y2', yAxis(0))
        .attr('x2', xAxis(0))
        .attr('y1', yAxis(yBallSmallAngle))
        .attr('x1', xAxis(xBallSmallAngle));

    d3.select('#ballSmallAngle')
        .attr('cx', xAxis(xBallSmallAngle))
        .attr('cy', yAxis(yBallSmallAngle));


    }
        

var runApp = setInterval(function () { 
    if (!paused) {
    update(); } 
                }, 15);