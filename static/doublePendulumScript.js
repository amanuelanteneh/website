var width = 710, height = 710;
var margin = {top: -20, right: 30, bottom: 40, left: 40};
var g = 9.81; //so length is in meters 
var l = 0.5; //length of pendulum 1 
var ell = 0.5; //ibid pendulum 2
var m = 1; //mass of pendulum 1
var M = 1; // ibid pendulum 2
var theta = 90 * (Math.PI/180);
var phi = 170 * (Math.PI/180);
var thetaDot = 0;
var phiDot = 0;

var xBall1 = l*Math.sin(theta);
var yBall1 = -l*Math.cos(theta);
var xBall2 = ell*Math.sin(phi) + xBall1;
var yBall2 = -ell*Math.cos(phi) + yBall1;
var t = 0;
var stepSize = .01;
var paused = 0;

function uDot(theta, thetaDot, phi, phiDot) { //first ODE
    return(thetaDot);
}

function vDot(theta, thetaDot, phi, phiDot) { //second ODE
    val = -g*(2*m + M)*Math.sin(theta) - M*g*Math.sin(theta - (2*phi)) - 2*Math.sin(theta-phi)*M*((phiDot*phiDot*ell) + thetaDot*thetaDot*l*Math.cos(theta-phi));

    val = val/( l*(2*m + M - M*Math.cos(2*theta - 2*phi)) );
    return(val);
}

function wDot(theta, thetaDot, phi, phiDot) {
    return(phiDot);
}

function sDot(theta, thetaDot, phi, phiDot) {
    val = 2*Math.sin(theta-phi)*(thetaDot*thetaDot*l*(m+M) + g*(m+M)*Math.cos(theta) + phiDot*phiDot*ell*M*Math.cos(theta-phi));    
    
    val = val/( ell*(2*m + M - M*Math.cos(2*theta - 2*phi)) );
    return(val);
}

function RK4() { /* 4th order Runge-Kutta solver for system of 4 equations with 4 variables */

        k0 = stepSize * uDot(theta, thetaDot, phi, phiDot);
        l0 = stepSize * vDot(theta, thetaDot, phi, phiDot);
        q0 = stepSize * wDot(theta, thetaDot, phi, phiDot);
        p0 = stepSize * sDot(theta, thetaDot, phi, phiDot);       

        k1 = stepSize * uDot(theta+(0.5*k0), thetaDot+(0.5*l0), phi+(0.5*q0), phiDot+(0.5*p0));
        l1 = stepSize * vDot(theta+(0.5*k0), thetaDot+(0.5*l0), phi+(0.5*q0), phiDot+(0.5*p0));
        q1 = stepSize * wDot(theta+(0.5*k0), thetaDot+(0.5*l0), phi+(0.5*q0), phiDot+(0.5*p0));
        p1 = stepSize * sDot(theta+(0.5*k0), thetaDot+(0.5*l0), phi+(0.5*q0), phiDot+(0.5*p0));        

        k2 = stepSize * uDot(theta+(0.5*k1), thetaDot+(0.5*l1), phi+(0.5*q1), phiDot+(0.5*p1));
        l2 = stepSize * vDot(theta+(0.5*k1), thetaDot+(0.5*l1), phi+(0.5*q1), phiDot+(0.5*p1));
        q2 = stepSize * wDot(theta+(0.5*k1), thetaDot+(0.5*l1), phi+(0.5*q1), phiDot+(0.5*p1));
        p2 = stepSize * sDot(theta+(0.5*k1), thetaDot+(0.5*l1), phi+(0.5*q1), phiDot+(0.5*p1));        

        k3 = stepSize * uDot(theta+k2, thetaDot+l2, phi+q2, phiDot+p2);
        l3 = stepSize * vDot(theta+k2, thetaDot+l2, phi+q2, phiDot+p2);
        q3 = stepSize * wDot(theta+k2, thetaDot+l2, phi+q2, phiDot+p2);
        p3 = stepSize * sDot(theta+k2, thetaDot+l2, phi+q2, phiDot+p2);        

        theta = theta + ((1/6) * (k0 + 2*k1 + 2*k2 + k3));
        thetaDot = thetaDot + ((1/6) * (l0 + 2*l1 + 2*l2 + l3));
        phi = phi + ((1/6) * (q0 + 2*q1 + 2*q2 + q3));
        phiDot = phiDot + ((1/6) * (p0 + 2*p1 + 2*p2 + p3));

    }

d3.select("canvas").attr("width", width).attr("height", height);

var canvas = d3.select("canvas");

var context = canvas.node().getContext("2d");

var svg = d3.select("#doublePendulum")
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


var rod1 = svg.append('line')  /* put before circle code so it doesn't go over the circle */
    .attr('id', 'rod1')
    .attr('x2', xAxis(0))
    .attr('y2', yAxis(0))
    .attr('x1', xAxis(xBall1))
    .attr('y1', yAxis(yBall1))
    .attr('stroke', '#FFFFFF')
    .attr('stroke-width', '2px');

var ball1 = svg.append('circle')
    .attr('id', 'ball1')
    .attr('cx', xAxis(xBall1))
    .attr('cy', yAxis(yBall1))
    .attr('r', 10)
    .style('fill', '#FFFFFF');

var rod2 = svg.append('line') 
    .attr('id', 'rod2')
    .attr('x2', xAxis(xBall1))
    .attr('y2', yAxis(yBall1))
    .attr('x1', xAxis(xBall2))
    .attr('y1', yAxis(yBall2))
    .attr('stroke', '#FFFFFF')
    .attr('stroke-width', '2px');

var ball2 = svg.append('circle')
    .attr('id', 'ball2')
    .attr('cx', xAxis(xBall2))
    .attr('cy', yAxis(yBall2))
    .attr('r', 10)
    .style('fill', '#FFFFFF');    

function update() {
    context.beginPath();
    context.strokeStyle = '#0026FF';
    context.moveTo(xAxis(xBall2) + margin.left, yAxis(yBall2) + margin.top);    

    t += .01;

    RK4();
    xBall1 = l*Math.sin(theta);
    yBall1 = -l*Math.cos(theta);
    xBall2 = ell*Math.sin(phi) + xBall1;
    yBall2 = -ell*Math.cos(phi) + yBall1;

    context.lineTo(xAxis(xBall2) + margin.left, yAxis(yBall2) + margin.top);
    context.stroke();    


    d3.select('#rod1')
        .attr('y2', yAxis(0))
        .attr('x2', xAxis(0))
        .attr('y1', yAxis(yBall1))
        .attr('x1', xAxis(xBall1));

    d3.select('#ball1')
        .attr('cx', xAxis(xBall1))
        .attr('cy', yAxis(yBall1));

    d3.select('#rod2')
        .attr('y2', yAxis(yBall1))
        .attr('x2', xAxis(xBall1))
        .attr('y1', yAxis(yBall2))
        .attr('x1', xAxis(xBall2));

    d3.select('#ball2')
        .attr('cx', xAxis(xBall2))
        .attr('cy', yAxis(yBall2));

    }

var runApp = setInterval(function () { 
    if (!paused) {
    update();
        } 
              }, 5);