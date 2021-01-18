/* Variable names have a C after them for chaos lol */
var widthC = 540, heightC = 540;
var marginC = {top: -20, right: 30, bottom: 40, left: 40};

var gC = 9.81; //so length is in meters 
var lC = 0.5; //length of pendulum 1 
var ellC = 0.5; //ibid pendulum 2
var mC = 1; //mass of pendulum 1
var MC = 1; // ibid pendulum 2
var tC = 0;
const numPendulums = 5;
// initial conditions format [theta, phi, thetaDot, phiDot]
var initialTheta = 90;
var initialPhi = 170;
var initialConditions = [];
var coordsOld = [];
var coordsNew = [];



/* for (let i=0; i<numPendulums; i++) { add later...
    initialConditions.push((initialTheta + (i/100)) * (Math.PI/180));
    initialConditions.push((initialPhi + (i/100)) * (Math.PI/180));
    initialConditions.push(0);
    initialConditions.push(0);

} */



var initialConditions = [90 * (Math.PI/180), 170 * (Math.PI/180), 0, 0,
                         90.01 * (Math.PI/180), 170.01 * (Math.PI/180), 0, 0,                                                  
                         90.02 * (Math.PI/180), 170.02 * (Math.PI/180), 0, 0,                                                  
                         90.03 * (Math.PI/180), 170.03 * (Math.PI/180), 0, 0,                                                  
                         90.04 * (Math.PI/180), 170.04 * (Math.PI/180), 0, 0];
// coords format [xm, ym, xM, yM]
var coordsOld = [lC*Math.sin(initialConditions[0]), -lC*Math.cos(initialConditions[0]), ellC*Math.sin(initialConditions[1]) + lC*Math.sin(initialConditions[0]), -ellC*Math.cos(initialConditions[1]) - lC*Math.cos(initialConditions[0]),
              lC*Math.sin(initialConditions[4]), -lC*Math.cos(initialConditions[4]), ellC*Math.sin(initialConditions[5]) + lC*Math.sin(initialConditions[4]), -ellC*Math.cos(initialConditions[5]) - lC*Math.cos(initialConditions[4]),
              lC*Math.sin(initialConditions[8]), -lC*Math.cos(initialConditions[8]), ellC*Math.sin(initialConditions[9]) + lC*Math.sin(initialConditions[8]), -ellC*Math.cos(initialConditions[9]) - lC*Math.cos(initialConditions[8]),
              lC*Math.sin(initialConditions[12]), -lC*Math.cos(initialConditions[12]), ellC*Math.sin(initialConditions[13]) + lC*Math.sin(initialConditions[12]), -ellC*Math.cos(initialConditions[13]) - lC*Math.cos(initialConditions[12]),
              lC*Math.sin(initialConditions[16]), -lC*Math.cos(initialConditions[16]), ellC*Math.sin(initialConditions[17]) + lC*Math.sin(initialConditions[16]), -ellC*Math.cos(initialConditions[17]) - lC*Math.cos(initialConditions[16])
];
// old and new distinction for drawing paths on canvas
var coordsNew = [lC*Math.sin(initialConditions[0]), -lC*Math.cos(initialConditions[0]), ellC*Math.sin(initialConditions[1]) + lC*Math.sin(initialConditions[0]), -ellC*Math.cos(initialConditions[1]) - lC*Math.cos(initialConditions[0]),
              lC*Math.sin(initialConditions[4]), -lC*Math.cos(initialConditions[4]), ellC*Math.sin(initialConditions[5]) + lC*Math.sin(initialConditions[4]), -ellC*Math.cos(initialConditions[5]) - lC*Math.cos(initialConditions[4]),
              lC*Math.sin(initialConditions[8]), -lC*Math.cos(initialConditions[8]), ellC*Math.sin(initialConditions[9]) + lC*Math.sin(initialConditions[8]), -ellC*Math.cos(initialConditions[9]) - lC*Math.cos(initialConditions[8]),
              lC*Math.sin(initialConditions[12]), -lC*Math.cos(initialConditions[12]), ellC*Math.sin(initialConditions[13]) + lC*Math.sin(initialConditions[12]), -ellC*Math.cos(initialConditions[13]) - lC*Math.cos(initialConditions[12]),
              lC*Math.sin(initialConditions[16]), -lC*Math.cos(initialConditions[16]), ellC*Math.sin(initialConditions[17]) + lC*Math.sin(initialConditions[16]), -ellC*Math.cos(initialConditions[17]) - lC*Math.cos(initialConditions[16])
];


var colors = ["#fcf803","#fc0303", "#03fc77","#036bfc", "#fc03b1"];

var rods = [];
var balls = [];

var stepSizeC = .006;
var pausedC = 1;

$("#pauseButton2").click(function() {
    pausedC = !pausedC;
    if (pausedC) {
        $("#pauseButton2").html("Play");
    }
    else {
        $("#pauseButton2").html("Pause");       
    }

});

$("#resetButton2").click( reset );


function reset() {

$("#pauseButton2").html("Play");
    
pausedC = 1;

initialConditions = [90 * (Math.PI/180), 170 * (Math.PI/180), 0, 0,
                         90.01 * (Math.PI/180), 170.01 * (Math.PI/180), 0, 0,                                                  
                         90.02 * (Math.PI/180), 170.02 * (Math.PI/180), 0, 0,                                                  
                         90.03 * (Math.PI/180), 170.03 * (Math.PI/180), 0, 0,                                                  
                         90.04 * (Math.PI/180), 170.04 * (Math.PI/180), 0, 0];

coordsOld = [lC*Math.sin(initialConditions[0]), -lC*Math.cos(initialConditions[0]), ellC*Math.sin(initialConditions[1]) + lC*Math.sin(initialConditions[0]), -ellC*Math.cos(initialConditions[1]) - lC*Math.cos(initialConditions[0]),
              lC*Math.sin(initialConditions[4]), -lC*Math.cos(initialConditions[4]), ellC*Math.sin(initialConditions[5]) + lC*Math.sin(initialConditions[4]), -ellC*Math.cos(initialConditions[5]) - lC*Math.cos(initialConditions[4]),
              lC*Math.sin(initialConditions[8]), -lC*Math.cos(initialConditions[8]), ellC*Math.sin(initialConditions[9]) + lC*Math.sin(initialConditions[8]), -ellC*Math.cos(initialConditions[9]) - lC*Math.cos(initialConditions[8]),
              lC*Math.sin(initialConditions[12]), -lC*Math.cos(initialConditions[12]), ellC*Math.sin(initialConditions[13]) + lC*Math.sin(initialConditions[12]), -ellC*Math.cos(initialConditions[13]) - lC*Math.cos(initialConditions[12]),
              lC*Math.sin(initialConditions[16]), -lC*Math.cos(initialConditions[16]), ellC*Math.sin(initialConditions[17]) + lC*Math.sin(initialConditions[16]), -ellC*Math.cos(initialConditions[17]) - lC*Math.cos(initialConditions[16])
];

coordsNew = [lC*Math.sin(initialConditions[0]), -lC*Math.cos(initialConditions[0]), ellC*Math.sin(initialConditions[1]) + lC*Math.sin(initialConditions[0]), -ellC*Math.cos(initialConditions[1]) - lC*Math.cos(initialConditions[0]),
              lC*Math.sin(initialConditions[4]), -lC*Math.cos(initialConditions[4]), ellC*Math.sin(initialConditions[5]) + lC*Math.sin(initialConditions[4]), -ellC*Math.cos(initialConditions[5]) - lC*Math.cos(initialConditions[4]),
              lC*Math.sin(initialConditions[8]), -lC*Math.cos(initialConditions[8]), ellC*Math.sin(initialConditions[9]) + lC*Math.sin(initialConditions[8]), -ellC*Math.cos(initialConditions[9]) - lC*Math.cos(initialConditions[8]),
              lC*Math.sin(initialConditions[12]), -lC*Math.cos(initialConditions[12]), ellC*Math.sin(initialConditions[13]) + lC*Math.sin(initialConditions[12]), -ellC*Math.cos(initialConditions[13]) - lC*Math.cos(initialConditions[12]),
              lC*Math.sin(initialConditions[16]), -lC*Math.cos(initialConditions[16]), ellC*Math.sin(initialConditions[17]) + lC*Math.sin(initialConditions[16]), -ellC*Math.cos(initialConditions[17]) - lC*Math.cos(initialConditions[16])
];  
    let a = 0;
    let b = 0;
    for (j = 0; j < coordsOld.length; j += 4) {

        rods[a].attr('y2', yAxisC(0))
            .attr('x2', xAxisC(0))
            .attr('x1', xAxisC(coordsNew[j]))
            .attr('y1', yAxisC(coordsNew[j + 1]));


        balls[a].attr('cx', xAxisC(coordsNew[j]))
            .attr('cy', yAxisC(coordsNew[j + 1]));


        rods[a + 1].attr('x2', xAxisC(coordsNew[j]))
            .attr('y2', yAxisC(coordsNew[j + 1]))
            .attr('x1', xAxisC(coordsNew[j + 2]))
            .attr('y1', yAxisC(coordsNew[j + 3]));


        balls[a + 1].attr('cx', xAxisC(coordsNew[j + 2]))
            .attr('cy', yAxisC(coordsNew[j + 3]));
        a += 2;
        b += 1;
    }
    contextC.clearRect(0, 0, widthC, heightC); //to clear path lines


}


function uDotC(thetaC, thetaDotC, phiC, phiDotC) { //first ODE
    return (thetaDotC);
}

function vDotC(thetaC, thetaDotC, phiC, phiDotC) { //second ODE
    val = -gC * (2 * mC + MC) * Math.sin(thetaC) - MC * gC * Math.sin(thetaC - (2 * phiC)) - 2 * Math.sin(thetaC - phiC) * MC * ((phiDotC * phiDotC * ellC) + thetaDotC * thetaDotC * lC * Math.cos(thetaC - phiC));

    val = val / (lC * (2 * mC + MC - MC * Math.cos(2 * thetaC - 2 * phiC)));
    return (val);
}

function wDotC(thetaC, thetaDotC, phiC, phiDotC) { //third ODE
    return (phiDotC);
}

function sDotC(thetaC, thetaDotC, phiC, phiDotC) { //fourth ODE
    val = 2 * Math.sin(thetaC - phiC) * (thetaDotC * thetaDotC * lC * (mC + MC) + gC * (mC + MC) * Math.cos(thetaC) + phiDotC * phiDotC * ellC * MC * Math.cos(thetaC - phiC));

    val = val / (ellC * (2 * mC + MC - MC * Math.cos(2 * thetaC - 2 * phiC)));
    return (val);
}


function RK4C(thetaC, phiC, thetaDotC, phiDotC, i) { /* 4th order Runge-Kutta solver for system of 4 equations with 4 variables */

    k0 = stepSizeC * uDotC(thetaC, thetaDotC, phiC, phiDotC); //k is for theta
    l0 = stepSizeC * vDotC(thetaC, thetaDotC, phiC, phiDotC); //l is for theta dot
    q0 = stepSizeC * wDotC(thetaC, thetaDotC, phiC, phiDotC); //q is for phi
    p0 = stepSizeC * sDotC(thetaC, thetaDotC, phiC, phiDotC); //p is fot phi dot

    k1 = stepSizeC * uDotC(thetaC + (0.5 * k0), thetaDotC + (0.5 * l0), phiC + (0.5 * q0), phiDotC + (0.5 * p0));
    l1 = stepSizeC * vDotC(thetaC + (0.5 * k0), thetaDotC + (0.5 * l0), phiC + (0.5 * q0), phiDotC + (0.5 * p0));
    q1 = stepSizeC * wDotC(thetaC + (0.5 * k0), thetaDotC + (0.5 * l0), phiC + (0.5 * q0), phiDotC + (0.5 * p0));
    p1 = stepSizeC * sDotC(thetaC + (0.5 * k0), thetaDotC + (0.5 * l0), phiC + (0.5 * q0), phiDotC + (0.5 * p0));

    k2 = stepSizeC * uDotC(thetaC + (0.5 * k1), thetaDotC + (0.5 * l1), phiC + (0.5 * q1), phiDotC + (0.5 * p1));
    l2 = stepSizeC * vDotC(thetaC + (0.5 * k1), thetaDotC + (0.5 * l1), phiC + (0.5 * q1), phiDotC + (0.5 * p1));
    q2 = stepSizeC * wDotC(thetaC + (0.5 * k1), thetaDotC + (0.5 * l1), phiC + (0.5 * q1), phiDotC + (0.5 * p1));
    p2 = stepSizeC * sDotC(thetaC + (0.5 * k1), thetaDotC + (0.5 * l1), phiC + (0.5 * q1), phiDotC + (0.5 * p1));

    k3 = stepSizeC * uDotC(thetaC + k2, thetaDotC + l2, phiC + q2, phiDotC + p2);
    l3 = stepSizeC * vDotC(thetaC + k2, thetaDotC + l2, phiC + q2, phiDotC + p2);
    q3 = stepSizeC * wDotC(thetaC + k2, thetaDotC + l2, phiC + q2, phiDotC + p2);
    p3 = stepSizeC * sDotC(thetaC + k2, thetaDotC + l2, phiC + q2, phiDotC + p2);

    initialConditions[i] = initialConditions[i] + ((1 / 6) * (k0 + 2 * k1 + 2 * k2 + k3)); //update theta
    initialConditions[i + 1] = initialConditions[i + 1] + ((1 / 6) * (q0 + 2 * q1 + 2 * q2 + q3)); //update phi
    initialConditions[i + 2] = initialConditions[i + 2] + ((1 / 6) * (l0 + 2 * l1 + 2 * l2 + l3)); //update thetaDot
    initialConditions[i + 3] = initialConditions[i + 3] + ((1 / 6) * (p0 + 2 * p1 + 2 * p2 + p3)); //update phiDot

}


d3.select("#canvas2").attr("width", widthC).attr("height", heightC);

var canvasC = d3.select("#canvas2");

var contextC = canvasC.node().getContext("2d");

var svgC = d3.select("#doublePendulums")
    .attr("width", widthC)
    .attr("height", heightC)
    .append("g")
    .attr("transform",
        "translate(" + marginC.left + "," + marginC.top + ")");

var xAxisC = d3.scaleLinear()
    .domain([-1.5, 1.5])
    .range([0, widthC]);

svgC.append("g")
    .attr("transform", "translate(0," + heightC + ")")
    .call(d3.axisBottom(xAxisC));

var yAxisC = d3.scaleLinear()
    .domain([-1.5, 1.5])
    .range([heightC, 0]);

svgC.append("g")
    .call(d3.axisLeft(yAxisC));


for (j = 0; j < coordsOld.length; j += 4) {

    rods.push(svgC.append('line')  /* put before circle code so it doesn't go over the circle */
        .attr('x2', xAxisC(0))
        .attr('y2', yAxisC(0))
        .attr('x1', xAxisC(coordsOld[j]))
        .attr('y1', yAxisC(coordsOld[j + 1]))
        .attr('stroke', '#FFFFFF')
        .attr('stroke-width', '2px'));

    balls.push(svgC.append('circle')
        .attr('cx', xAxisC(coordsOld[j]))
        .attr('cy', yAxisC(coordsOld[j + 1]))
        .attr('r', 10)
        .style('fill', '#FFFFFF'));

    rods.push(svgC.append('line')
        .attr('x2', xAxisC(coordsOld[j]))
        .attr('y2', yAxisC(coordsOld[j + 1]))
        .attr('x1', xAxisC(coordsOld[j + 2]))
        .attr('y1', yAxisC(coordsOld[j + 3]))
        .attr('stroke', '#FFFFFF')
        .attr('stroke-width', '2px'));

    balls.push(svgC.append('circle')
        .attr('cx', xAxisC(coordsOld[j + 2]))
        .attr('cy', yAxisC(coordsOld[j + 3]))
        .attr('r', 10)
        .style('fill', '#FFFFFF'));
}

function updateC() {

    for (j = 0; j < initialConditions.length; j += 4) {
        RK4C(initialConditions[j], initialConditions[j + 1], initialConditions[j + 2], initialConditions[j + 3], j);
    }
    coordsNew = [lC * Math.sin(initialConditions[0]), -lC * Math.cos(initialConditions[0]), ellC * Math.sin(initialConditions[1]) + lC * Math.sin(initialConditions[0]), -ellC * Math.cos(initialConditions[1]) - lC * Math.cos(initialConditions[0]),
    lC * Math.sin(initialConditions[4]), -lC * Math.cos(initialConditions[4]), ellC * Math.sin(initialConditions[5]) + lC * Math.sin(initialConditions[4]), -ellC * Math.cos(initialConditions[5]) - lC * Math.cos(initialConditions[4]),
    lC * Math.sin(initialConditions[8]), -lC * Math.cos(initialConditions[8]), ellC * Math.sin(initialConditions[9]) + lC * Math.sin(initialConditions[8]), -ellC * Math.cos(initialConditions[9]) - lC * Math.cos(initialConditions[8]),
    lC * Math.sin(initialConditions[12]), -lC * Math.cos(initialConditions[12]), ellC * Math.sin(initialConditions[13]) + lC * Math.sin(initialConditions[12]), -ellC * Math.cos(initialConditions[13]) - lC * Math.cos(initialConditions[12]),
    lC * Math.sin(initialConditions[16]), -lC * Math.cos(initialConditions[16]), ellC * Math.sin(initialConditions[17]) + lC * Math.sin(initialConditions[16]), -ellC * Math.cos(initialConditions[17]) - lC * Math.cos(initialConditions[16])];
    let a = 0;
    let b = 0;
    tC += 0.01;

    for (j = 0; j < coordsOld.length; j += 4) {
        contextC.beginPath();
        contextC.strokeStyle = colors[b];
        contextC.moveTo(xAxisC(coordsOld[j + 2]) + marginC.left, yAxisC(coordsOld[j + 3]) + marginC.top);
        contextC.lineTo(xAxisC(coordsNew[j + 2]) + marginC.left, yAxisC(coordsNew[j + 3]) + marginC.top);
        contextC.stroke();

        rods[a].attr('y2', yAxisC(0))
            .attr('x2', xAxisC(0))
            .attr('x1', xAxisC(coordsNew[j]))
            .attr('y1', yAxisC(coordsNew[j + 1]));


        balls[a].attr('cx', xAxisC(coordsNew[j]))
            .attr('cy', yAxisC(coordsNew[j + 1]));


        rods[a + 1].attr('x2', xAxisC(coordsNew[j]))
            .attr('y2', yAxisC(coordsNew[j + 1]))
            .attr('x1', xAxisC(coordsNew[j + 2]))
            .attr('y1', yAxisC(coordsNew[j + 3]));


        balls[a + 1].attr('cx', xAxisC(coordsNew[j + 2]))
            .attr('cy', yAxisC(coordsNew[j + 3]));
        a += 2;
        b += 1;
    }
    coordsOld = [lC * Math.sin(initialConditions[0]), -lC * Math.cos(initialConditions[0]), ellC * Math.sin(initialConditions[1]) + lC * Math.sin(initialConditions[0]), -ellC * Math.cos(initialConditions[1]) - lC * Math.cos(initialConditions[0]),
    lC * Math.sin(initialConditions[4]), -lC * Math.cos(initialConditions[4]), ellC * Math.sin(initialConditions[5]) + lC * Math.sin(initialConditions[4]), -ellC * Math.cos(initialConditions[5]) - lC * Math.cos(initialConditions[4]),
    lC * Math.sin(initialConditions[8]), -lC * Math.cos(initialConditions[8]), ellC * Math.sin(initialConditions[9]) + lC * Math.sin(initialConditions[8]), -ellC * Math.cos(initialConditions[9]) - lC * Math.cos(initialConditions[8]),
    lC * Math.sin(initialConditions[12]), -lC * Math.cos(initialConditions[12]), ellC * Math.sin(initialConditions[13]) + lC * Math.sin(initialConditions[12]), -ellC * Math.cos(initialConditions[13]) - lC * Math.cos(initialConditions[12]),
    lC * Math.sin(initialConditions[16]), -lC * Math.cos(initialConditions[16]), ellC * Math.sin(initialConditions[17]) + lC * Math.sin(initialConditions[16]), -ellC * Math.cos(initialConditions[17]) - lC * Math.cos(initialConditions[16])];


}

var runChaosApp = setInterval(function () {
    if (!pausedC) {
        updateC();
    }
}, 15);


