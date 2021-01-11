var zPtsWF = [];
var xPtsWF = [];
var yPtsWF = [];
var zPtsPD = [];
var xPtsPD = [];
var yPtsPD = [];

var nx = 1;
var ny = 1;
var Lx = 5;
var Ly = 5;

var slider1 = document.getElementById("slider1");
var slider2 = document.getElementById("slider2");
var slider1Info = document.getElementById("slider1Info"); 
var slider2Info = document.getElementById("slider2Info");
var slider3 = document.getElementById("slider3");
var slider4 = document.getElementById("slider4");
var slider3Info = document.getElementById("slider3Info"); 
var slider4Info = document.getElementById("slider4Info");


$("#slider1").on("change", function() { 
  //Plotly.deleteTraces('2dWaveFunction', 0);
  //Plotly.deleteTraces('2dProbDensityFunction', 0);
  Lx = Number($(this).val());
  slider1Info.innerHTML = "a: " + Lx;
  generateData();

  Plotly.newPlot('2dWaveFunction', dataWaveFunc, layoutWF);

  Plotly.newPlot('2dProbDensityFunction', dataProbDensity, layoutPD);

});

$("#slider2").on("change", function() { 
  //Plotly.deleteTraces('2dWaveFunction', 0);
  //Plotly.deleteTraces('2dProbDensityFunction', 0);
  Ly = Number($(this).val());
  slider2Info.innerHTML = "b: " + Ly;
  generateData();

  Plotly.newPlot('2dWaveFunction', dataWaveFunc, layoutWF);

  Plotly.newPlot('2dProbDensityFunction', dataProbDensity, layoutPD);

});

$("#slider3").on("change", function() { 
  //Plotly.deleteTraces('2dWaveFunction', 0);
  //Plotly.deleteTraces('2dProbDensityFunction', 0);
  nx = Number($(this).val());
  slider3Info.innerHTML = "n<sub>x</sub>: " + nx;
  generateData();

  Plotly.newPlot('2dWaveFunction', dataWaveFunc, layoutWF);

  Plotly.newPlot('2dProbDensityFunction', dataProbDensity, layoutPD);

});

$("#slider4").on("change", function() { 
  //Plotly.deleteTraces('2dWaveFunction', 0);
  //Plotly.deleteTraces('2dProbDensityFunction', 0);
  ny = Number($(this).val());
  slider4Info.innerHTML = "n<sub>y</sub>: " + ny;
  generateData();

  Plotly.newPlot('2dWaveFunction', dataWaveFunc, layoutWF);

  Plotly.newPlot('2dProbDensityFunction', dataProbDensity, layoutPD);

});


function waveFunc(x, y, t) {
  return ((2 / Math.sqrt(Lx * Ly)) * Math.sin(nx * Math.PI * x / Lx) * Math.sin(ny * Math.PI * y / Ly));
}

function generateData() {
  zPtsWF = []; xPtsWF = []; yPtsWF = [];
  zPtsPD = []; xPtsPD = []; yPtsPD = [];

  for (x = 0; x < Lx; x += 0.1) {
    let zTempWF = []; let xTempWF = []; let yTempWF = [];
    let zTempPD = []; let xTempPD = []; let yTempPD = [];
  
    for (y = 0; y < Ly; y += 0.1) {
      let val = waveFunc(x, y, 0);
      zTempWF.push(val);
      yTempWF.push(y);
      xTempWF.push(x);
      zTempPD.push(Math.abs(val) * Math.abs(val));
      yTempPD.push(y);
      xTempPD.push(x);
    }
    zPtsWF.push(zTempWF); yPtsWF.push(yTempWF); xPtsWF.push(xTempWF);
    zPtsPD.push(zTempPD); yPtsPD.push(yTempPD); xPtsPD.push(xTempPD);
  }
}


generateData();

var dataWaveFunc = [{
  z: zPtsWF,
  x: xPtsWF,
  y: yPtsWF,
  type: 'surface',
  contours: {
    z: {
      show: true,
      usecolormap: true,
      highlightcolor: "#42f462",
      project: { z: true }
    }
  }
}];
var layoutWF = {
  title: 'Wave function &#968;<sub>n<sub>x</sub></sub><sub>,n<sub>y</sub></sub>(x,y,t)',
  autosize: false,
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
    size: 14,
    color: '#FFFFFF'
  },
  showlegend: true,

  width: 500,
  height: 500,
  margin: {
    l: 65,
    r: 50,
    b: 65,
    t: 90,
  }
};

var dataProbDensity = [{
  z: zPtsPD,
  x: xPtsPD,
  y: yPtsPD,
  type: 'surface',
  contours: {
    z: {
      show: true,
      usecolormap: true,
      highlightcolor: "#42f462",
      project: { z: true }
    }
  }
}];
var layoutPD = {
  title: 'Probability Density  |&#968;<sub>n<sub>x</sub></sub><sub>,n<sub>y</sub></sub>(x,y,t)|<sup>2</sup>',
  autosize: false,
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
    size: 14,
    color: '#FFFFFF'
  },
  showlegend: true,

  width: 500,
  height: 500,
  margin: {
    l: 65,
    r: 50,
    b: 65,
    t: 90,
  }
};


Plotly.newPlot('2dWaveFunction', dataWaveFunc, layoutWF);

Plotly.newPlot('2dProbDensityFunction', dataProbDensity, layoutPD);