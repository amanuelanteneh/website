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
var steps = 100;

var slider1 = document.getElementById("slider1");
var slider2 = document.getElementById("slider2");
var slider1Info = document.getElementById("slider1Info"); 
var slider2Info = document.getElementById("slider2Info");
var slider3 = document.getElementById("slider3");
var slider4 = document.getElementById("slider4");
var slider3Info = document.getElementById("slider3Info"); 
var slider4Info = document.getElementById("slider4Info");


$("#slider1").on("change", function() { 

  Lx = Number($(this).val());
  slider1Info.innerHTML = "a: " + Lx;
  generateData();
  //for restyle to work must wrap updated z,x,y arrays in another array? according to:
  // https://community.plotly.com/t/cant-update-3d-surface-plot-with-restyle/13486
  
  Plotly.restyle('2dWaveFunction', {"z": [zPtsWF], "x": [xPtsWF], "y": [yPtsWF]} );
  Plotly.restyle('2dProbDensityFunction', {"z": [zPtsPD], "x": [xPtsPD], "y": [yPtsPD]});
/*
  Plotly.animate('2dProbDensityFunction', {
        data: {z: [zPtsPD], x: [xPtsPD], y: [yPtsPD]},
        traces: [0]
      }, {
        transition: {
          duration: 500,
          easing: 'cubic-in-out'
        },
          frame: {
              duration: 500
          }
      } 
        ); */  


});

$("#slider2").on("change", function() { 

  Ly = Number($(this).val());
  slider2Info.innerHTML = "b: " + Ly;
  generateData();

  Plotly.restyle('2dWaveFunction', {"z": [zPtsWF], "x": [xPtsWF], "y": [yPtsWF]} );
  Plotly.restyle('2dProbDensityFunction', {"z": [zPtsPD], "x": [xPtsPD], "y": [yPtsPD]});

});

$("#slider3").on("change", function() { 

  nx = Number($(this).val());
  slider3Info.innerHTML = "n<sub>x</sub>: " + nx;
  generateData();

  Plotly.restyle('2dWaveFunction', {"z": [zPtsWF], "x": [xPtsWF], "y": [yPtsWF]} );
  Plotly.restyle('2dProbDensityFunction', {"z": [zPtsPD], "x": [xPtsPD], "y": [yPtsPD]});
/*
  Plotly.animate('2dProbDensityFunction', {
        data: {z: zPtsPD, x: xPtsPD, y: yPtsPD},
        traces: [0]
      }, {
        transition: {
          duration: 500,
          easing: 'cubic-in-out'
        },
          frame: {
              duration: 500
          }
      } 
        ); */

});

$("#slider4").on("change", function() { 

  ny = Number($(this).val());
  slider4Info.innerHTML = "n<sub>y</sub>: " + ny;
  generateData();

  Plotly.restyle('2dWaveFunction', {"z": [zPtsWF], "x": [xPtsWF], "y": [yPtsWF]} );
  Plotly.restyle('2dProbDensityFunction', {"z": [zPtsPD], "x": [xPtsPD], "y": [yPtsPD]});

});


function waveFunc(x, y, t) {
  return ((2 / Math.sqrt(Lx * Ly)) * Math.sin(nx * Math.PI * x / Lx) * Math.sin(ny * Math.PI * y / Ly));
}

function generateData() {
  zPtsWF = []; xPtsWF = []; yPtsWF = [];
  zPtsPD = []; xPtsPD = []; yPtsPD = [];
  let xStep = Lx/steps;
  let yStep = Ly/steps;  
  for (x = 0; x < Lx; x += xStep) {
    let zTempWF = []; let xTempWF = []; let yTempWF = [];
    let zTempPD = []; let xTempPD = []; let yTempPD = [];
  
    for (y = 0; y < Ly; y += yStep) {
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
  title: 'Wave Function: &#968;<sub>n<sub>x</sub></sub><sub>,n<sub>y</sub></sub>(x,y,t)',
  autosize: true,
  plot_bgcolor: "#FFFFFF",
  paper_bgcolor: "#333333",
  scene: {
    yaxis: {
      tickcolor: "white",
      backgroundcolor: "white",
      gridcolor: "white",
      zerolinecolor: "white",
    },
    xaxis: {
      tickcolor: "white",
      gridcolor: "white",
      backgroundcolor: "white",
      zerolinecolor: "white",
    },
    zaxis: {
      title: "Psi(x,y,t)",
      tickcolor: "white",
      gridcolor: "white",
      backgroundcolor: "white",
      zerolinecolor: "white",
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
  title: 'Probability Density: |&#968;<sub>n<sub>x</sub></sub><sub>,n<sub>y</sub></sub>(x,y,t)|<sup>2</sup>',
  autosize: true,
  plot_bgcolor: "#FFFFFF",
  paper_bgcolor: "#333333",
  scene: {
    yaxis: {
      tickcolor: "white",
      backgroundcolor: "white",
      gridcolor: "white",
      zerolinecolor: "white",
    },
    xaxis: {
      tickcolor: "white",
      gridcolor: "white",
      backgroundcolor: "white",
      zerolinecolor: "white",
    },
    zaxis: {
      title: "|Psi(x,y,t)|<sup>2</sup>",
      tickcolor: "white",
      gridcolor: "white",
      backgroundcolor: "white",
      zerolinecolor: "white",
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