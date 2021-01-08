var xSphere = [];
var ySphere = [];
var zSphere = [];
var xFunc = [];
var yFunc = [];
var zFunc = [];
var xProj = [];
var yProj = [];
var zProj = [];
var dataFunc;
var dataProj;
var m = 1;
var b = 0;
var phiArr = [];
var thetaArr = [];

$("#slopeSlider").on("change", function() { 
    m = Number($(this).val());
    $("#slopeInfo").html("Slope = " + m);
    Plotly.deleteTraces('riemannSphere', 2);
    Plotly.deleteTraces('riemannSphere', 2); //after you delete a trace all of them shift up a spot
    zFunc = [];
    xFunc = [];
    yFunc = [];
    zProj = [];
    xProj = [];
    yProj = [];
    for (x=-1; x<1; x+=0.01) {
        zFunc.push(0);
        yFunc.push(theFunction(1,x*m + b));
        xFunc.push(x);
    }
    getProjection(1, -10, 10);
    dataFunc = [{
        name: 'Function',
        opacity: 1,
        type: 'scatter3d',
        mode: 'lines',
        x: xFunc,
        y: yFunc,
        z: zFunc,
        line: {
            width: 5,
            color: 'red',
        }
    }];
    dataProj = [{
        name: 'Projection',
        opacity: 1,
        type: 'scatter3d',
        mode: 'lines',
        x: xProj,
        y: yProj,
        z: zProj,
        line: {
            width: 5,
            color: 'blue',
        }
    }];
    Plotly.addTraces('riemannSphere', dataFunc);
    Plotly.addTraces('riemannSphere', dataProj);

}
);
$("#interceptSlider").on("change", function() { 
    b = Number($(this).val());
    $("#interceptInfo").html("Y-intercept = " + b);
    Plotly.deleteTraces('riemannSphere', 2);
    Plotly.deleteTraces('riemannSphere', 2); //after you delete a trace all of them shift up a spot
    zFunc = [];
    xFunc = [];
    yFunc = [];
    zProj = [];
    xProj = [];
    yProj = [];
    for (x=-1; x<1; x+=0.01) {
        zFunc.push(0);
        yFunc.push(theFunction(1,m*x+b));
        xFunc.push(x);
    }
    getProjection(1, -10, 10);
    dataFunc = [{
        name: 'Function',
        opacity: 1,
        type: 'scatter3d',
        mode: 'lines',
        x: xFunc,
        y: yFunc,
        z: zFunc,
        line: {
            width: 5,
            color: 'red',
        }
    }];
    dataProj = [{
        name: 'Projection',
        opacity: 1,
        type: 'scatter3d',
        mode: 'lines',
        x: xProj,
        y: yProj,
        z: zProj,
        line: {
            width: 5,
            color: 'blue',
        }
    }];
    Plotly.addTraces('riemannSphere', dataFunc);
    Plotly.addTraces('riemannSphere', dataProj);
}
);


function theFunction(choice, x) {
    switch(choice) {
        case 1: return(m*x + b);
        case 2: return(Math.tan(x));
        default: return(NaN);
    }
}


function makeInterval(startValue, stopValue, numPoints) {
    var arr = [];
    var step = (stopValue - startValue) / (numPoints - 1);
    for (var i = 0; i < numPoints; i++) {
      arr.push(startValue + (step * i));
    }
    return arr;
}

function getProjection(choice, a, b) {
    xProj = [];
    yProj = [];
    zProj = [];
    let stepSize = (b-a)/150;
    for (x=a; x<b; x+=stepSize) {
        let y = theFunction(choice, x);
        xProj.push(x*( 2 / ((x*x + y*y) + 1) ));
        yProj.push(y*( 2 / ((x*x + y*y) + 1) ));
        zProj.push( ((x*x + y*y) - 1) / ((x*x + y*y) + 1) ); 
    }
}

phiArr = makeInterval(0, Math.PI/2, 35); //make array of values from [0, Pi/2] with 25 values
thetaArr = makeInterval(0, 2*Math.PI, 35); //ibid

for (i=0; i<thetaArr.length; i++){
    for (j=0; j<phiArr.length; j++){
        xSphere.push(Math.cos(thetaArr[i]) * Math.sin(phiArr[j]));
        ySphere.push(Math.sin(thetaArr[i]) * Math.sin(phiArr[j]));   
        zSphere.push(Math.cos(phiArr[j]));
    }
}

const dataItem = {
    name: 'Sphere',
    opacity: 0.3,
    color: 'rgb(211,211,211)',
    type: 'mesh3d',
    x: xSphere,
    y: ySphere,
    z: zSphere,
};

var dataSphere = [
    dataItem,
    {...dataItem, z: zSphere.map(v => -v)} //to plot top and bottom semi-sphere

];


var layout = {
    title: 'The Riemann Sphere',
    autosize: true,
    plot_bgcolor:"#FFFFFF",
    paper_bgcolor:"#333333",
    scene: {
        yaxis: {
            "tickcolor": "white",
            "backgroundcolor": "white",
            "gridcolor": "white",
            "zerolinecolor": "white",
        },
        xaxis: {
            "tickcolor": "white",
            "gridcolor": "white",
            "backgroundcolor": "white",
            "zerolinecolor": "white",
        },
        zaxis: {
            "tickcolor": "white",
            "gridcolor": "white",
            "backgroundcolor": "white",
            "zerolinecolor": "white",
        },
    },
    font: {
        family: 'Courier New, monospace',
        size: 12,
        color: '#FFFFFF'
     },
    showlegend: true,
    width: 600,
    height: 600,
    margin: {
        l: 65,
        r: 50,
        b: 65,
        t: 90,
    }
};
Plotly.newPlot('riemannSphere', dataSphere, layout);


for (x=-1; x<1; x+=0.01) {
    zFunc.push(0);
    yFunc.push(theFunction(1,x));
    xFunc.push(x);
}


var dataFunc = [{
    name: 'Function',
    opacity: 1,
    type: 'scatter3d',
    mode: 'lines',
    x: xFunc,
    y: yFunc,
    z: zFunc,
    line: {
        width: 5,
        color: 'red',
    }
}];

Plotly.addTraces('riemannSphere', dataFunc);

getProjection(1,-10, 10);

var dataProj = [{
    name: 'Projection',
    opacity: 1,
    type: 'scatter3d',
    mode: 'lines',
    x: xProj,
    y: yProj,
    z: zProj,
    line: {
        width: 5,
        color: 'blue',
    }
}];

Plotly.addTraces('riemannSphere', dataProj);