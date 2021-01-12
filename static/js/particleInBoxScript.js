  var zPtsWFR = []; //for real part
  var xPtsWFR = [];
  var yPtsWFR = [];
  var zPtsWFI = []; //for imaginary part
  var xPtsWFI = [];
  var yPtsWFI = [];

  var zPtsPD = [];
  var xPtsPD = [];
  var yPtsPD = [];

  var nx = 2;
  var ny = 1;
  var Lx = 5;
  var Ly = 5;
  var m = 1;//9.10e-31;
  var t = 0;
  const hbar = 1;//6.626e-34;
  var steps = 100;

  var paused = 1;


var slider1 = document.getElementById("slider1");
var slider2 = document.getElementById("slider2");
var slider1Info = document.getElementById("slider1Info"); 
var slider2Info = document.getElementById("slider2Info");
var slider3 = document.getElementById("slider3");
var slider4 = document.getElementById("slider4");
var slider3Info = document.getElementById("slider3Info"); 
var slider4Info = document.getElementById("slider4Info");
var timeButton = document.getElementById("timeButton");
var resetButton = document.getElementById("resetButton");


$("#timeButton").on("click", function() {

  paused = !paused;
  if (paused) {
    timeButton.innerHTML = "Start Time Evolution: t = "  + t.toFixed(3);
  }
  else {
     timeButton.innerHTML = "Stop Time Evolution: t = "  + t.toFixed(3);
  }
});

$("#resetButton").on("click", function() {
  paused = 1;
  t = 0;
  timeButton.innerHTML = "Start Time Evolution: t = 0";
  generateData();
  Plotly.restyle('2dWaveFunctionReal', {"z": [zPtsWFR], "x": [xPtsWFR], "y": [yPtsWFR]} );
  Plotly.restyle('2dWaveFunctionImaginary', {"z": [zPtsWFI], "x": [xPtsWFI], "y": [yPtsWFI]} );  
  Plotly.restyle('2dProbDensityFunction', {"z": [zPtsPD], "x": [xPtsPD], "y": [yPtsPD]} );

});



$("#slider1").on("change", function() { 

  Lx = Number($(this).val());
  slider1Info.innerHTML = "a: " + Lx;
  generateData();
  //for restyle to work must wrap updated z,x,y arrays in another array? according to:
  // https://community.plotly.com/t/cant-update-3d-surface-plot-with-restyle/13486
  
  Plotly.restyle('2dWaveFunctionReal', {"z": [zPtsWFR], "x": [xPtsWFR], "y": [yPtsWFR]} );
  Plotly.restyle('2dWaveFunctionImaginary', {"z": [zPtsWFI], "x": [xPtsWFI], "y": [yPtsWFI]} );  
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

  Plotly.restyle('2dWaveFunctionReal', {"z": [zPtsWFR], "x": [xPtsWFR], "y": [yPtsWFR]} );
  Plotly.restyle('2dWaveFunctionImaginary', {"z": [zPtsWFI], "x": [xPtsWFI], "y": [yPtsWFI]} );  
  Plotly.restyle('2dProbDensityFunction', {"z": [zPtsPD], "x": [xPtsPD], "y": [yPtsPD]});

});

$("#slider3").on("change", function() { 

  nx = Number($(this).val());
  slider3Info.innerHTML = "n<sub>x</sub>: " + nx;
  generateData();

  Plotly.restyle('2dWaveFunctionReal', {"z": [zPtsWFR], "x": [xPtsWFR], "y": [yPtsWFR]} );
  Plotly.restyle('2dWaveFunctionImaginary', {"z": [zPtsWFI], "x": [xPtsWFI], "y": [yPtsWFI]} );  
  Plotly.restyle('2dProbDensityFunction', {"z": [zPtsPD], "x": [xPtsPD], "y": [yPtsPD]});

  /*Plotly.animate('2dProbDensityFunction', {
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
      }); */

});

$("#slider4").on("change", function() { 

  ny = Number($(this).val());
  slider4Info.innerHTML = "n<sub>y</sub>: " + ny;
  generateData();

  Plotly.restyle('2dWaveFunctionReal', {"z": [zPtsWFR], "x": [xPtsWFR], "y": [yPtsWFR]} );
  Plotly.restyle('2dWaveFunctionImaginary', {"z": [zPtsWFI], "x": [xPtsWFI], "y": [yPtsWFI]} );  
  Plotly.restyle('2dProbDensityFunction', {"z": [zPtsPD], "x": [xPtsPD], "y": [yPtsPD]});

});


function waveFuncReal(x, y, t) {
  let val = (2 / Math.sqrt(Lx * Ly)) * Math.sin(nx * Math.PI * x / Lx) * Math.sin(ny * Math.PI * y / Ly);
  let E = (hbar*hbar*Math.PI*Math.PI)/(2*m)*((nx/Lx)*(nx/Lx) + (ny/Ly)*(ny/Ly));

  return (val*Math.cos(E*t/hbar));
}

function waveFuncImaginary(x, y, t) {
  let val = (2 / Math.sqrt(Lx * Ly)) * Math.sin(nx * Math.PI * x / Lx) * Math.sin(ny * Math.PI * y / Ly);
  let E = (hbar*hbar*Math.PI*Math.PI)/(2*m)*((nx/Lx)*(nx/Lx) + (ny/Ly)*(ny/Ly));

  return (-val*Math.sin(E*t/hbar));
}


function generateData() {
  zPtsWFR = []; xPtsWFR = []; yPtsWFR = [];
  zPtsWFI = []; xPtsWFI = []; yPtsWFI = [];
  zPtsPD = []; xPtsPD = []; yPtsPD = [];
  let xStep = Lx/steps;
  let yStep = Ly/steps;  
  for (x = 0; x < Lx; x += xStep) {
    let zTempWFR = []; let xTempWFR = []; let yTempWFR = [];
    let zTempWFI = []; let xTempWFI = []; let yTempWFI = [];    
    let zTempPD = []; let xTempPD = []; let yTempPD = [];
  
    for (y = 0; y < Ly; y += yStep) {
      let valReal = waveFuncReal(x, y, t);
      let valImaginary = waveFuncImaginary(x, y, t);
      zTempWFR.push(valReal); yTempWFR.push(y); xTempWFR.push(x);
      zTempWFI.push(valImaginary); yTempWFI.push(y); xTempWFI.push(x);

      zTempPD.push( (valReal*valReal) + (valImaginary*valImaginary) );
      yTempPD.push(y);
      xTempPD.push(x);
    }
    zPtsWFR.push(zTempWFR); yPtsWFR.push(yTempWFR); xPtsWFR.push(xTempWFR);
    zPtsWFI.push(zTempWFI); yPtsWFI.push(yTempWFI); xPtsWFI.push(xTempWFI);    
    zPtsPD.push(zTempPD); yPtsPD.push(yTempPD); xPtsPD.push(xTempPD);
  }
}


generateData();

var dataWaveFuncRe = [{
  z: zPtsWFR,
  x: xPtsWFR,
  y: yPtsWFR,
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

var dataWaveFuncIm = [{
  z: zPtsWFI,
  x: xPtsWFI,
  y: yPtsWFI,
  type: 'surface',
  colorscale: "Viridis",
  contours: {
    z: {
      show: true,
      usecolormap: true,
      highlightcolor: "#42f462",
      project: { z: true }
    }
  } 
}];

var layoutWFR = {
  title: 'Wave Function: Re[&#968;<sub>n<sub>x</sub></sub><sub>,n<sub>y</sub></sub>(x,y,t)]',
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
      title: "Re(Psi(x,y,t))",
      range: [-0.7, 0.7],
      tickcolor: "white",
      gridcolor: "white",
      backgroundcolor: "white",
      zerolinecolor: "white",
    },
  },
  font: {
    family: 'Courier New, monospace',
    size: 12,
    color: '#FFFFFF'
  },
  showlegend: true,

  width: 400,
  height: 400,
  margin: {
    l: 65,
    r: 50,
    b: 65,
    t: 90,
  }
};

var layoutWFI = {
  title: 'Wave Function: Im[&#968;<sub>n<sub>x</sub></sub><sub>,n<sub>y</sub></sub>(x,y,t)]',
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
      title: "Im(Psi(x,y,t))",
      range: [-0.7, 0.7],
      tickcolor: "white",
      gridcolor: "white",
      backgroundcolor: "white",
      zerolinecolor: "white",
    },
  },
  font: {
    family: 'Courier New, monospace',
    size: 12,
    color: '#FFFFFF'
  },
  showlegend: true,

  width: 400,
  height: 400,
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
  colorscale: "Greys",
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
    size: 12,
    color: '#FFFFFF'
  },
  showlegend: true,

  width: 400,
  height: 400,
  margin: {
    l: 65,
    r: 50,
    b: 65,
    t: 90,
  }
};

Plotly.newPlot('2dWaveFunctionReal', dataWaveFuncRe, layoutWFR);
Plotly.newPlot('2dWaveFunctionImaginary', dataWaveFuncIm, layoutWFI);
Plotly.newPlot('2dProbDensityFunction', dataProbDensity, layoutPD);


var run = setInterval(function () { 
  if (!paused) {
  if (t > 10) {
     t = 0;
  }  
  timeButton.innerHTML = "Stop Time Evolution: t = "  + t.toFixed(3);
  generateData();
  Plotly.restyle('2dWaveFunctionReal', {"z": [zPtsWFR], "x": [xPtsWFR], "y": [yPtsWFR]} );
  Plotly.restyle('2dWaveFunctionImaginary', {"z": [zPtsWFI], "x": [xPtsWFI], "y": [yPtsWFI]} );  
  Plotly.restyle('2dProbDensityFunction', {"z": [zPtsPD], "x": [xPtsPD], "y": [yPtsPD]} );
  t += (0.5/(2*nx+2*ny)); //to scale animation speed with nx and ny values
  }
  else {
    timeButton.innerHTML = "Start Time Evolution: t = "  + t.toFixed(3);
  }


              }, 10) 