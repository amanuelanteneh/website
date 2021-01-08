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
var phiArr = [];
var thetaArr = [];
var funcNumber = 0;
var m = 1; //slope
var b = 0; // y-intercept
var r = 1; //rad of circle
var a = 1; //for parabola
var c = 0; //for parabola
var start = -30; //start and end of projection interval 
var end = 30;
var slider1 = document.getElementById("slider1");
var slider2 = document.getElementById("slider2");
var slider1Info = document.getElementById("slider1Info"); 
var slider2Info = document.getElementById("slider2Info");

$("#slider1").on("change", function() { 
    switch (funcNumber) {
    case 0: m = Number($(this).val());
            slider1Info.innerHTML = "m: " + m;
            break;
    case 1: r = Number($(this).val());
            slider1Info.innerHTML = "r: " + r;
            break;            
    case 2: c = Number($(this).val());
            slider1Info.innerHTML = "c: " + c;
            break;
    default: break;
    }
    update();
});

$("#slider2").on("change", function() { 
    switch (funcNumber) {
    case 0: b = Number($(this).val());
            slider2Info.innerHTML = "b: " + b;
            break;
    case 2: a = Number($(this).val());
            slider2Info.innerHTML = "a: " + a;
            break;           
    default: break;  
    }
    
    update();
});

$("#funcs").on("change", function() {
    funcNumber = Number($(this).val());
    if (funcNumber == 1) {
        r = 1;
        slider1.min = 0.5;
        slider1.max = 2;
        slider1.value = 1;
        slider1.step = 0.1;
        slider1Info.innerHTML = "r: 1";
        slider1.style.display = "block";
        slider1Info.style.display = "block";
        slider2.style.display = "none";
        slider2Info.style.display = "none";
    }
    else if (funcNumber == 0 || funcNumber == 2) {
        a = 1;
        c = 0;
        m = 1;
        b = 0;
        slider1.min = -2;
        slider1.max = 2;
        slider1.value = 1;
        slider1.step = 0.1;
        slider1.style.display = "block";
        slider1Info.style.display = "block";
        slider2.min = -2;
        slider2.max = 2;
        slider2.value = 0;
        slider2.step = 0.1;
        slider2.style.display = "block";       
        slider2Info.style.display = "block";
        if (funcNumber == 0) {
            slider1Info.innerHTML = "m: " + m;
            slider2Info.innerHTML = "b: " + b;
        }
        else if (funcNumber == 2) {
            slider1Info.innerHTML = "c: " + c;
            slider2Info.innerHTML = "a: " + a;
        }
    }
    else {
        slider1.style.display = "none";
        slider1Info.style.display = "none";
        slider2.style.display = "none";
        slider2Info.style.display = "none";
    }

    update();
});


function theFunction(x) {
    switch (funcNumber) {
        case 0: return (m * x + b);
        case 1: return (Math.sqrt((r * r) - (x * x)));
        case 2: return (a * (x * x) + c);
        case 3: return (Math.sin(x));
        case 4: return (Math.tan(x));
        case 5: return (Math.abs(x));
        case 6: return (1 / Math.cos(x));
        default: return (NaN);
    }
}

function update() {

    Plotly.deleteTraces('riemannSphere', 3);
    Plotly.deleteTraces('riemannSphere', 3); //after you delete a trace all of them shift up a spot
    zFunc = [];
    xFunc = [];
    yFunc = [];
    if (funcNumber != 1) {
        for (x = -1; x < 1; x += 0.01) {
            zFunc.push(0);
            yFunc.push(theFunction(x));
            xFunc.push(x);
        }
    }
    else { // if making a circle generate points using polar coordinates cuz it's easier
        for (i=0; i<thetaArr.length; i++){
            zFunc.push(0);
            yFunc.push(r*Math.sin(thetaArr[i]));      
            xFunc.push(r*Math.cos(thetaArr[i]));
        } 
    }
    if (funcNumber == 1 || funcNumber == 4 || funcNumber == 6) {
        start = -10;
        end = 10;
    }
    getProjection(start, end);
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

function makeInterval(startValue, stopValue, numPoints) {
    var arr = [];
    var step = (stopValue - startValue) / (numPoints - 1);
    for (var i = 0; i < numPoints; i++) {
        arr.push(startValue + (step * i));
    }
    return arr;
}

function getProjection(a, b) {
    xProj = [];
    yProj = [];
    zProj = [];
    if (funcNumber != 1) {
        let stepSize = (b - a) / 550;
        for (x = a; x < b; x += stepSize) {
            let y = theFunction(x);
            xProj.push(x * (2 / ((x * x + y * y) + 1)));
            yProj.push(y * (2 / ((x * x + y * y) + 1)));
            zProj.push(((x * x + y * y) - 1) / ((x * x + y * y) + 1));
        }
    }
    else {
        for (i = 0; i < xFunc.length; i++) {
            xProj.push(xFunc[i] * (2 / ((xFunc[i] * xFunc[i] + yFunc[i] * yFunc[i]) + 1)));
            yProj.push(yFunc[i] * (2 / ((xFunc[i] * xFunc[i] + yFunc[i] * yFunc[i]) + 1)));
            zProj.push(((xFunc[i] * xFunc[i] + yFunc[i] * yFunc[i]) - 1) / ((xFunc[i] * xFunc[i] + yFunc[i] * yFunc[i]) + 1));

        }

    }

}
/* Start making sphere */
phiArr = makeInterval(0, Math.PI / 2, 35); //make array of values from [0, Pi/2] with 25 values
thetaArr = makeInterval(0, 2 * Math.PI, 35); //ibid

for (i = 0; i < thetaArr.length; i++) {
    for (j = 0; j < phiArr.length; j++) {
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
    { ...dataItem, z: zSphere.map(v => -v) } //to plot top and bottom semi-sphere

];

var layout = {
    title: 'The Riemann Sphere',
    autosize: true,
    plot_bgcolor: "#FFFFFF",
    paper_bgcolor: "#333333",
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
/* End sphere */

/* The point at infinity */
var pointAtInf = [{
    name: "The Point at &#8734;",
    opacity: 1,
    marker: { color: "white", size: "4" },
    type: 'scatter3d',
    x: [0],
    y: [0],
    z: [1.01],
}];

Plotly.addTraces('riemannSphere', pointAtInf);
/*End point at infinity*/

for (x = -1; x < 1; x += 0.01) {
    zFunc.push(0);
    yFunc.push(theFunction(x));
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

getProjection(start, end);

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
