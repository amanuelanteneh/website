var width = 540, height = 540; //width and height of canvas hardcoded
var margin = {top: -20, right: 30, bottom: 40, left: 40};
var g; 
var m = 1; //mass of pendulum 1
var M = 1; // ibid pendulum 2
var theta = 90.0 * (Math.PI/180);
var phi = 170.0 * (Math.PI/180);
var thetaDot = 0;
var phiDot = 0;

var t = 0;
var stepSize = .006;
var paused = 1;

$("#pauseButton1").click(function() { //to pause on click
    paused = !paused;
    if (paused) {
        $("#pauseButton1").html("Play");
    }
    else {
        $("#pauseButton1").html("Pause");       
    }
 });

$("#resetButton1").click( reset ); // to reset on click


function updateAngleDisplay() {
    $("#thetaInfo").html("<i>&#952;<sub>0</sub></i>: "+ (theta*(180/Math.PI)).toFixed(1) + "&#176;");
    $("#phiInfo").html("<i>&#966;<sub>0</sub></i>: "+ (phi*(180/Math.PI)).toFixed(1) + "&#176;");
}


function uDot(theta, thetaDot, phi, phiDot) { //first ODE
    return (thetaDot);
}

function vDot(theta, thetaDot, phi, phiDot) { //second ODE
    val = -g * (2 * m + M) * Math.sin(theta) - M * g * Math.sin(theta - (2 * phi)) - 2 * Math.sin(theta - phi) * M * ((phiDot * phiDot * ell) + thetaDot * thetaDot * l * Math.cos(theta - phi));

    val = val / (l * (2 * m + M - M * Math.cos(2 * theta - 2 * phi)));
    return (val);
}

function wDot(theta, thetaDot, phi, phiDot) { //third ODE
    return (phiDot);
}

function sDot(theta, thetaDot, phi, phiDot) { //fourth ODE
    val = 2 * Math.sin(theta - phi) * (thetaDot * thetaDot * l * (m + M) + g * (m + M) * Math.cos(theta) + phiDot * phiDot * ell * M * Math.cos(theta - phi));

    val = val / (ell * (2 * m + M - M * Math.cos(2 * theta - 2 * phi)));
    return (val);
}

function RK4() { /* 4th order Runge-Kutta solver for system of 4 equations with 4 variables */

    k0 = stepSize * uDot(theta, thetaDot, phi, phiDot);
    l0 = stepSize * vDot(theta, thetaDot, phi, phiDot);
    q0 = stepSize * wDot(theta, thetaDot, phi, phiDot);
    p0 = stepSize * sDot(theta, thetaDot, phi, phiDot);

    k1 = stepSize * uDot(theta + (0.5 * k0), thetaDot + (0.5 * l0), phi + (0.5 * q0), phiDot + (0.5 * p0));
    l1 = stepSize * vDot(theta + (0.5 * k0), thetaDot + (0.5 * l0), phi + (0.5 * q0), phiDot + (0.5 * p0));
    q1 = stepSize * wDot(theta + (0.5 * k0), thetaDot + (0.5 * l0), phi + (0.5 * q0), phiDot + (0.5 * p0));
    p1 = stepSize * sDot(theta + (0.5 * k0), thetaDot + (0.5 * l0), phi + (0.5 * q0), phiDot + (0.5 * p0));

    k2 = stepSize * uDot(theta + (0.5 * k1), thetaDot + (0.5 * l1), phi + (0.5 * q1), phiDot + (0.5 * p1));
    l2 = stepSize * vDot(theta + (0.5 * k1), thetaDot + (0.5 * l1), phi + (0.5 * q1), phiDot + (0.5 * p1));
    q2 = stepSize * wDot(theta + (0.5 * k1), thetaDot + (0.5 * l1), phi + (0.5 * q1), phiDot + (0.5 * p1));
    p2 = stepSize * sDot(theta + (0.5 * k1), thetaDot + (0.5 * l1), phi + (0.5 * q1), phiDot + (0.5 * p1));

    k3 = stepSize * uDot(theta + k2, thetaDot + l2, phi + q2, phiDot + p2);
    l3 = stepSize * vDot(theta + k2, thetaDot + l2, phi + q2, phiDot + p2);
    q3 = stepSize * wDot(theta + k2, thetaDot + l2, phi + q2, phiDot + p2);
    p3 = stepSize * sDot(theta + k2, thetaDot + l2, phi + q2, phiDot + p2);

    theta = theta + ((1 / 6) * (k0 + 2 * k1 + 2 * k2 + k3));
    thetaDot = thetaDot + ((1 / 6) * (l0 + 2 * l1 + 2 * l2 + l3));
    phi = phi + ((1 / 6) * (q0 + 2 * q1 + 2 * q2 + q3));
    phiDot = phiDot + ((1 / 6) * (p0 + 2 * p1 + 2 * p2 + p3));

}

function update() {
    context.beginPath(); // start path
    context.strokeStyle = '#1100ff'; //chose path color
    context.moveTo(xBall2 + margin.left, yBall2 + margin.top); //move context to current ball2 position

    t += .01;
    RK4(); //call Runge-Kutta to update angles and angle dots
    //updateAngleDisplay();
    //have to add xAxis(0) bc we're using pixel units 
    xBall1 = xAxis(0) + l*Math.sin(theta);
    yBall1 = yAxis(0) + l*Math.cos(theta);
    xBall2 = ell*Math.sin(phi) + xBall1;
    yBall2 = ell*Math.cos(phi) + yBall1; 

    
    context.lineTo(xBall2 + margin.left, yBall2 + margin.top); //draw line to new ball2 position
    context.stroke(); //actually draw line/end path

    //update pendulum positions
    d3.select('#rod1')
        .attr('y2', yAxis(0))
        .attr('x2', xAxis(0))
        .attr('y1', yBall1)
        .attr('x1', xBall1);

    d3.select('#ball1')
        .attr('cx', xBall1)
        .attr('cy', yBall1);

    d3.select('#rod2')
        .attr('y2', yBall1)
        .attr('x2', xBall1)
        .attr('y1', yBall2)
        .attr('x1', xBall2);

    d3.select('#ball2')
        .attr('cx', xBall2)
        .attr('cy', yBall2);

}

function dragBall1(event) {
    paused = 1;
    $("#pauseButton1").html("Play");
    context.clearRect(0, 0, width, height); //to clear path lines

    let x = d3.pointer(event, svg.node())[0];
    let y = d3.pointer(event, svg.node())[1]; 
    
    let cx = xAxis(0);
    let cy = yAxis(0);
    //MUST subtract xAxis(0) to get correct value of l and ell 
    
    let dx = x - cx;
    let dy = y - cy;

    let angle = Math.atan2(dy, dx); //get angle between +x axis and (dy, dx)
    
    //theta for this problem setup is -(atan2 - pi/2)
    theta = -1*(angle - (90*(Math.PI/180)));
    thetaDot = 0;
    phiDot = 0;
    xBall1 = cx + Math.cos(angle)*l;
    yBall1 = cy + Math.sin(angle)*l;

    xBall2 = ell * Math.sin(phi) + xBall1;
    yBall2 = ell * Math.cos(phi) + yBall1;

    d3.select('#rod1')
        .attr('y2', yAxis(0))
        .attr('x2', xAxis(0))
        .attr('y1', yBall1)
        .attr('x1', xBall1);

    d3.select('#ball1')
        .attr('cx', xBall1)
        .attr('cy', yBall1);

    d3.select('#rod2')
        .attr('y2', yBall1)
        .attr('x2', xBall1)
        .attr('y1', yBall2)
        .attr('x1', xBall2);

    d3.select('#ball2')
        .attr('cx', xBall2)
        .attr('cy', yBall2); 
    
    updateAngleDisplay();
    
    } 

function dragBall2(event) {

    paused = 1;
    $("#pauseButton1").html("Play");
    context.clearRect(0, 0, width, height); //to clear path lines

    let x = d3.pointer(event, svg.node())[0];
    let y = d3.pointer(event, svg.node())[1]; 
   
    //restrict range of movement ot be along circumference of the circle centered on (xBall1, yBall1) with r=ell
    let cx = xBall1;    
    let cy = yBall1;
    
    //MUST subtract xAxis(0) to get correct value of l and ell 
    
    let dx = x - cx;
    let dy = y - cy;

    let angle = Math.atan2(dy, dx); //get angle between +x axis and (dy, dx)
    phi = -1*(angle - (90*(Math.PI/180))); 
    thetaDot = 0; //restart simulation
    thetaDot = 0;
    xBall2 = cx + Math.cos(angle)*l;
    yBall2 = cy + Math.sin(angle)*l;

    d3.select('#rod2')
        .attr('y2', cy)
        .attr('x2', cx)
        .attr('y1', yBall2)
        .attr('x1', xBall2);

    d3.select('#ball2')
        .attr('cx', xBall2)
        .attr('cy', yBall2);  

    updateAngleDisplay();
    
    }


/* Begin setting up canvas and graph */

d3.select("#canvas1").attr("width", width).attr("height", height);

var canvas = d3.select("#canvas1"); //get canvas

var context = canvas.node().getContext("2d"); //get 2D context

var svg = d3.select("#doublePendulum") 
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

var xAxis = d3.scaleLinear() //create x axis 
    .domain([-2, 2])
    .range([0, width]);

svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xAxis)); //set x axis to be bottom axis

var yAxis = d3.scaleLinear() //create y axis
    .domain([-2, 2])
    .range([height, 0]);

svg.append("g")
    .call(d3.axisLeft(yAxis)); //ibid but for y axis and left axis

//since g is in meters/s^2 you need to scale it cuz it uses distance
var g = xAxis(9.81);
//define all this in terms of pixels to make it easier to work w drag events bc that returns value in pixels
var l = xAxis(0.8) - xAxis(0); //length of pendulum 1 
var ell = xAxis(0.8) - xAxis(0);  //ibid pendulum 2
var xBall1 = xAxis(0) + l*Math.sin(theta);
var yBall1 = yAxis(0) + l*Math.cos(theta);
var xBall2 = ell*Math.sin(phi) + xBall1;
var yBall2 = ell*Math.cos(phi) + yBall1;       

var rod1 = svg.append('line')  /* put before circle code so it doesn't go over the circle */
    .attr('id', 'rod1')
    .attr('x2', xAxis(0))
    .attr('y2', yAxis(0))
    .attr('x1', xBall1)
    .attr('y1', yBall1)
    .attr('stroke', '#FFFFFF')
    .attr('stroke-width', '2px');

var ball1 = svg.append('circle')
    .attr('id', 'ball1')
    .attr('cx', xBall1)
    .attr('cy', yBall1)
    .attr('r', 10)
    .style('fill', '#FFFFFF')
    .call( d3.drag().on('drag', dragBall1) ); //to do dragging

var rod2 = svg.append('line')
    .attr('id', 'rod2')
    .attr('x2', xBall1)
    .attr('y2', yBall1)
    .attr('x1', xBall2)
    .attr('y1', yBall2)
    .attr('stroke', '#FFFFFF')
    .attr('stroke-width', '2px');

var ball2 = svg.append('circle')
    .attr('id', 'ball2')
    .attr('cx', xBall2)
    .attr('cy', yBall2)
    .attr('r', 10)
    .style('fill', '#FFFFFF')
    .call(d3.drag().on('drag', dragBall2));


function reset() {
   $("#pauseButton1").html("Play");
    paused = 1;
    g = xAxis(9.81); 
    l = xAxis(0.8) - xAxis(0); 
    ell = xAxis(0.8) - xAxis(0);  
    m = 1; 
    M = 1; 
    theta = 90 * (Math.PI / 180);
    phi = 170 * (Math.PI / 180);
    thetaDot = 0;
    phiDot = 0;
    updateAngleDisplay();
    xBall1 = xAxis(0) + l*Math.sin(theta);
    yBall1 = yAxis(0) + l*Math.cos(theta);
    xBall2 = ell*Math.sin(phi) + xBall1;
    yBall2 = ell*Math.cos(phi) + yBall1; 
    t = 0;
    d3.select('#rod1')
        .attr('y2', yAxis(0))
        .attr('x2', xAxis(0))
        .attr('y1', yBall1)
        .attr('x1', xBall1);

    d3.select('#ball1')
        .attr('cx', xBall1)
        .attr('cy', yBall1);

    d3.select('#rod2')
        .attr('y2', yBall1)
        .attr('x2', xBall1)
        .attr('y1', yBall2)
        .attr('x1', xBall2);

    d3.select('#ball2')
        .attr('cx', xBall2)
        .attr('cy', yBall2);

    context.clearRect(0, 0, width, height); //to clear path lines    
}
   

var runApp = setInterval(function () { //call update if not paused
    if (!paused) {
        update();
    }
}, 15);