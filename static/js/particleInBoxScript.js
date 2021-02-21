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
var m = 1; //9.10e-31;
var t = 0;
var tS = 0; //time for superposition model
const hbar = 1; //6.626e-34; //need to figure out why actual hbar and mass values mess up graphs and prob can be > 1 for different enough Lx and Ly
var steps = 100;

var zPtsWFRS = []; //for real part
var xPtsWFRS = [];
var yPtsWFRS = [];
var zPtsWFIS = []; //for imaginary part
var xPtsWFIS = [];
var yPtsWFIS = [];

var zPtsPDS = [];
var xPtsPDS = [];
var yPtsPDS = [];

var nx1 = 1;
var ny1 = 2;
var nx2 = 1;
var ny2 = 3;
var LxS = 5; //S stands for superposition
var LyS = 5;

var paused = 1;
var pausedS = 1;

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

var slider5 = document.getElementById("slider5");
var slider6 = document.getElementById("slider6");
var slider5Info = document.getElementById("slider5Info"); 
var slider6Info = document.getElementById("slider6Info");
var slider7 = document.getElementById("slider7");
var slider8 = document.getElementById("slider8");
var slider7Info = document.getElementById("slider7Info"); 
var slider8Info = document.getElementById("slider8Info");
var slider9 = document.getElementById("slider9");
var slider10 = document.getElementById("slider10");
var slider9Info = document.getElementById("slider9Info"); 
var slider10Info = document.getElementById("slider10Info");
var timeButtonS = document.getElementById("timeButtonS");
var resetButtonS = document.getElementById("resetButtonS");

$("#timeButton").on("click", function() {

  pausedS = 1; //pause other set of graphs to not be updating both sets
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
  //restyle is much faster than deleting and adding traces...
  Plotly.restyle('2dWaveFunctionReal', {"z": [zPtsWFR], "x": [xPtsWFR], "y": [yPtsWFR]} );
  Plotly.restyle('2dWaveFunctionImaginary', {"z": [zPtsWFI], "x": [xPtsWFI], "y": [yPtsWFI]} );  
  Plotly.restyle('2dProbDensityFunction', {"z": [zPtsPD], "x": [xPtsPD], "y": [yPtsPD]} );

});

$("#timeButtonS").on("click", function() {

  paused = 1;
  pausedS = !pausedS;
  if (pausedS) {
    timeButtonS.innerHTML = "Start Time Evolution: t = "  + tS.toFixed(3);
  }
  else {
     timeButtonS.innerHTML = "Stop Time Evolution: t = "  + tS.toFixed(3);
  }
});

$("#resetButtonS").on("click", function() {
  pausedS = 1;
  tS = 0;
  timeButtonS.innerHTML = "Start Time Evolution: t = 0";
  generateDataS();
  Plotly.restyle('2dWaveFunctionRealSuper', {"z": [zPtsWFRS], "x": [xPtsWFRS], "y": [yPtsWFRS]} );
  Plotly.restyle('2dWaveFunctionImaginarySuper', {"z": [zPtsWFIS], "x": [xPtsWFIS], "y": [yPtsWFIS]} );  
  Plotly.restyle('2dProbDensityFunctionSuper', {"z": [zPtsPDS], "x": [xPtsPDS], "y": [yPtsPDS]} );

});

$("#slider1").on("change", function() { 

  Lx = Number($(this).val());
  slider1Info.innerHTML = "a: " + Lx;
  generateData();
  // for restyle to work must wrap updated z,x,y arrays in another array, according to:
  // https://community.plotly.com/t/cant-update-3d-surface-plot-with-restyle/13486
  
  Plotly.restyle('2dWaveFunctionReal', {"z": [zPtsWFR], "x": [xPtsWFR], "y": [yPtsWFR]} );
  Plotly.restyle('2dWaveFunctionImaginary', {"z": [zPtsWFI], "x": [xPtsWFI], "y": [yPtsWFI]} );  
  Plotly.restyle('2dProbDensityFunction', {"z": [zPtsPD], "x": [xPtsPD], "y": [yPtsPD]});

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

});

$("#slider4").on("change", function() { 

  ny = Number($(this).val());
  slider4Info.innerHTML = "n<sub>y</sub>: " + ny;
  generateData();

  Plotly.restyle('2dWaveFunctionReal', {"z": [zPtsWFR], "x": [xPtsWFR], "y": [yPtsWFR]} );
  Plotly.restyle('2dWaveFunctionImaginary', {"z": [zPtsWFI], "x": [xPtsWFI], "y": [yPtsWFI]} );  
  Plotly.restyle('2dProbDensityFunction', {"z": [zPtsPD], "x": [xPtsPD], "y": [yPtsPD]});

});

$("#slider5").on("change", function() { 

  LxS = Number($(this).val());
  slider5Info.innerHTML = "a: " + LxS;
  generateDataS();

  Plotly.restyle('2dWaveFunctionRealSuper', {"z": [zPtsWFRS], "x": [xPtsWFRS], "y": [yPtsWFRS]} );
  Plotly.restyle('2dWaveFunctionImaginarySuper', {"z": [zPtsWFIS], "x": [xPtsWFIS], "y": [yPtsWFIS]} );  
  Plotly.restyle('2dProbDensityFunctionSuper', {"z": [zPtsPDS], "x": [xPtsPDS], "y": [yPtsPDS]});
});

$("#slider6").on("change", function() { 

  LyS = Number($(this).val());
  slider6Info.innerHTML = "b: " + LyS;
  generateDataS();

  Plotly.restyle('2dWaveFunctionRealSuper', {"z": [zPtsWFRS], "x": [xPtsWFRS], "y": [yPtsWFRS]} );
  Plotly.restyle('2dWaveFunctionImaginarySuper', {"z": [zPtsWFIS], "x": [xPtsWFIS], "y": [yPtsWFIS]} );  
  Plotly.restyle('2dProbDensityFunctionSuper', {"z": [zPtsPDS], "x": [xPtsPDS], "y": [yPtsPDS]});
});

$("#slider7").on("change", function() { 

  nx1 = Number($(this).val());
  slider7Info.innerHTML = "n<sub>x<sub>1</sub></sub>: " + nx1;
  generateDataS();

  Plotly.restyle('2dWaveFunctionRealSuper', {"z": [zPtsWFRS], "x": [xPtsWFRS], "y": [yPtsWFRS]} );
  Plotly.restyle('2dWaveFunctionImaginarySuper', {"z": [zPtsWFIS], "x": [xPtsWFIS], "y": [yPtsWFIS]} );  
  Plotly.restyle('2dProbDensityFunctionSuper', {"z": [zPtsPDS], "x": [xPtsPDS], "y": [yPtsPDS]});
});

$("#slider8").on("change", function() { 

  ny1 = Number($(this).val());
  slider8Info.innerHTML = "n<sub>y<sub>1</sub></sub>: " + ny1;
  generateDataS();

  Plotly.restyle('2dWaveFunctionRealSuper', {"z": [zPtsWFRS], "x": [xPtsWFRS], "y": [yPtsWFRS]} );
  Plotly.restyle('2dWaveFunctionImaginarySuper', {"z": [zPtsWFIS], "x": [xPtsWFIS], "y": [yPtsWFIS]} );  
  Plotly.restyle('2dProbDensityFunctionSuper', {"z": [zPtsPDS], "x": [xPtsPDS], "y": [yPtsPDS]});
});

$("#slider9").on("change", function() { 

  nx2 = Number($(this).val());
  slider9Info.innerHTML = "n<sub>x<sub>2</sub></sub>: " + nx2;
  generateDataS();

  Plotly.restyle('2dWaveFunctionRealSuper', {"z": [zPtsWFRS], "x": [xPtsWFRS], "y": [yPtsWFRS]} );
  Plotly.restyle('2dWaveFunctionImaginarySuper', {"z": [zPtsWFIS], "x": [xPtsWFIS], "y": [yPtsWFIS]} );  
  Plotly.restyle('2dProbDensityFunctionSuper', {"z": [zPtsPDS], "x": [xPtsPDS], "y": [yPtsPDS]});
});

$("#slider10").on("change", function() { 

  ny2 = Number($(this).val());
  slider10Info.innerHTML = "n<sub>y<sub>2</sub></sub>: " + ny2;
  generateDataS();

  Plotly.restyle('2dWaveFunctionRealSuper', {"z": [zPtsWFRS], "x": [xPtsWFRS], "y": [yPtsWFRS]} );
  Plotly.restyle('2dWaveFunctionImaginarySuper', {"z": [zPtsWFIS], "x": [xPtsWFIS], "y": [yPtsWFIS]} );  
  Plotly.restyle('2dProbDensityFunctionSuper', {"z": [zPtsPDS], "x": [xPtsPDS], "y": [yPtsPDS]});
});


function waveFuncReal(x, y, t) {
  let val = (2 / Math.sqrt(Lx * Ly)) * Math.sin(nx * Math.PI * x / Lx) * Math.sin(ny * Math.PI * y / Ly);
  let E = ((hbar**2)*(Math.PI**2))/(2*m)*((nx/Lx)**2 + (ny/Ly)**2);

  return (val*Math.cos(E*t/hbar));
}

function waveFuncImaginary(x, y, t) {
  let val = (2 / Math.sqrt(Lx * Ly)) * Math.sin(nx * Math.PI * x / Lx) * Math.sin(ny * Math.PI * y / Ly);
  let E = ((hbar**2)*(Math.PI**2))/(2*m)*((nx/Lx)**2 + (ny/Ly)**2);

  return (-val*Math.sin(E*t/hbar));
}

function waveFuncRealS(x, y, t) { //Re part of super position of wave functions
  let val1 = (2 / Math.sqrt(LxS*LyS)) * Math.sin(nx1 * Math.PI * x / LxS) * Math.sin(ny1 * Math.PI * y / LyS);
  let E1 = ((hbar**2)*(Math.PI**2))/(2*m)*((nx1/LxS)**2 + (ny1/LyS)**2);
  val1 *= Math.cos(E1*t/hbar);

  let val2 = (2 / Math.sqrt(LxS*LyS)) * Math.sin(nx2 * Math.PI * x / LxS) * Math.sin(ny2 * Math.PI * y / LyS);
  let E2 = ((hbar**2)*(Math.PI**2))/(2*m)*((nx2/LxS)**2 + (ny2/LyS)**2);
  val2 *= Math.cos(E2*t/hbar);
  
  return (val1 + val2);
}

function waveFuncImaginaryS(x, y, t) {
  let val1 = (2 / Math.sqrt(LxS * LyS)) * Math.sin(nx1 * Math.PI * x / LxS) * Math.sin(ny1 * Math.PI * y / LyS);
  let E1 = ((hbar**2)*(Math.PI**2))/(2*m)*((nx1/LxS)**2 + (ny1/LyS)**2);
  val1 *= -Math.sin(E1*t/hbar);

  let val2 = (2 / Math.sqrt(LxS * LyS)) * Math.sin(nx2 * Math.PI * x / LxS) * Math.sin(ny2 * Math.PI * y / LyS);
  let E2 = ((hbar**2)*(Math.PI**2))/(2*m)*((nx2/LxS)**2 + (ny2/LyS)**2);
  val2 *= -Math.sin(E2*t/hbar);
  
  return (val1 + val2);
}



function generateData() { //generate data for non-superposition
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

function generateDataS() { //generate data for super position of states
  zPtsWFRS = []; xPtsWFRS = []; yPtsWFRS = [];
  zPtsWFIS = []; xPtsWFIS = []; yPtsWFIS = [];
  zPtsPDS = []; xPtsPDS = []; yPtsPDS = [];
  let xStep = LxS/steps;
  let yStep = LyS/steps;  
  for (let x = 0; x < LxS; x += xStep) {
    let zTempWFR = []; let xTempWFR = []; let yTempWFR = [];
    let zTempWFI = []; let xTempWFI = []; let yTempWFI = [];    
    let zTempPD = []; let xTempPD = []; let yTempPD = [];
  
    for (let y = 0; y < LyS; y += yStep) {
      let valReal = waveFuncRealS(x, y, tS);
      let valImaginary = waveFuncImaginaryS(x, y, tS);
      zTempWFR.push(valReal); yTempWFR.push(y); xTempWFR.push(x);
      zTempWFI.push(valImaginary); yTempWFI.push(y); xTempWFI.push(x);

      zTempPD.push( (valReal*valReal) + (valImaginary*valImaginary) );
      yTempPD.push(y);
      xTempPD.push(x);
    }
    zPtsWFRS.push(zTempWFR); yPtsWFRS.push(yTempWFR); xPtsWFRS.push(xTempWFR);
    zPtsWFIS.push(zTempWFI); yPtsWFIS.push(yTempWFI); xPtsWFIS.push(xTempWFI);    
    zPtsPDS.push(zTempPD); yPtsPDS.push(yTempPD); xPtsPDS.push(xTempPD);
  }
}
//make initial graphs
generateData();

generateDataS();

var dataWaveFuncRe = [{  //data for Re(Psi)
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

var dataWaveFuncIm = [{ //data for Im(Psi)
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

var dataProbDensity = [{ //data for |Psi|^2
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

var dataWaveFuncReS = [{  //data for Re(Psi) superposition
  z: zPtsWFRS,
  x: xPtsWFRS,
  y: yPtsWFRS,
  type: 'surface',
 /* contours: { //no contours for superposition graphs to save computation time
    z: {
      show: true,
      usecolormap: true,
      highlightcolor: "#42f462",
      project: { z: true }
    }
  } */
}];

var dataWaveFuncImS = [{ //data for Im(Psi) superposition
  z: zPtsWFIS,
  x: xPtsWFIS,
  y: yPtsWFIS,
  type: 'surface',
  colorscale: "Viridis",
 /* contours: {
    z: {
      show: true,
      usecolormap: true,
      highlightcolor: "#42f462",
      project: { z: true }
    }
  } */
}];

var dataProbDensityS = [{ //data for |Psi|^2 superposition
  z: zPtsPDS,
  x: xPtsPDS,
  y: yPtsPDS,
  type: 'surface',
  colorscale: "Greys",  
 /* contours: {
    z: {
      show: true,
      usecolormap: true,
      highlightcolor: "#42f462",
      project: { z: true }
    }
  }*/
}];

var layoutWFR = { //layout for plot of Re(Psi)
  title: 'Wave Function: Re[&#968;<sub>n<sub>x</sub></sub><sub>,n<sub>y</sub></sub>(x,y,t)]',
  autosize: false,
  plot_bgcolor: "#FFFFFF",
  paper_bgcolor: "rgba(0,0,0,0)",
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
      range: [-1, 1],
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

var layoutWFI = { //layout for plot of Im(Psi)
  title: 'Wave Function: Im[&#968;<sub>n<sub>x</sub></sub><sub>,n<sub>y</sub></sub>(x,y,t)]',
  autosize: false,
  plot_bgcolor: "#FFFFFF",
  paper_bgcolor: "rgba(0,0,0,0)",
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
      range: [-1, 1],
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

var layoutPD = { //layout for plot of |Psi|^2
  title: 'Probability Density: |&#968;<sub>n<sub>x</sub></sub><sub>,n<sub>y</sub></sub>(x,y,t)|<sup>2</sup>',
  autosize: false,
  plot_bgcolor: "#FFFFFF",
  paper_bgcolor: "rgba(0,0,0,0)",
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
      range: [0, 0.3], 
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

var layoutWFRS = { //layout for plot of Re(Psi) superposition
  title: 'Wave Function: Re[&#968;<sub>n<sub>x</sub></sub><sub>,n<sub>y</sub></sub>(x,y,t)]',
  autosize: false,
  plot_bgcolor: "#FFFFFF",
  paper_bgcolor: "rgba(0,0,0,0)",
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
      range: [-1, 1],
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

var layoutWFIS = { //layout for plot of Im(Psi) superposition
  title: 'Wave Function: Im[&#968;<sub>n<sub>x</sub></sub><sub>,n<sub>y</sub></sub>(x,y,t)]',
  autosize: false,
  plot_bgcolor: "#FFFFFF",
  paper_bgcolor: "rgba(0,0,0,0)",
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
      range: [-1, 1],
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

var layoutPDS = { //layout for plot of |Psi|^2 superposition
  title: 'Probability Density: |&#968;<sub>n<sub>x</sub></sub><sub>,n<sub>y</sub></sub>(x,y,t)|<sup>2</sup>',
  autosize: false,
  plot_bgcolor: "#FFFFFF",
  paper_bgcolor: "rgba(0,0,0,0)",
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
      range: [0, 0.8], 
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


Plotly.newPlot('2dWaveFunctionRealSuper', dataWaveFuncReS, layoutWFRS);
Plotly.newPlot('2dWaveFunctionImaginarySuper', dataWaveFuncImS, layoutWFIS);
Plotly.newPlot('2dProbDensityFunctionSuper', dataProbDensityS, layoutPDS);



var run = setInterval(function () { 
  if (!paused) {
  if (t > 50) {
     t = 0;
  }  
  timeButton.innerHTML = "Stop Time Evolution: t = "  + t.toFixed(3);
  generateData();
  Plotly.restyle('2dWaveFunctionReal', {"z": [zPtsWFR], "x": [xPtsWFR], "y": [yPtsWFR]} );
  Plotly.restyle('2dWaveFunctionImaginary', {"z": [zPtsWFI], "x": [xPtsWFI], "y": [yPtsWFI]} );  
  Plotly.restyle('2dProbDensityFunction', {"z": [zPtsPD], "x": [xPtsPD], "y": [yPtsPD]} );
  t += (0.40/(nx+ny)); //to scale animation speed with nx and ny values
  }
  else {
    timeButton.innerHTML = "Start Time Evolution: t = "  + t.toFixed(3);
  }
              }, 1);
             
var runSuper = setInterval(function () { 
  if (!pausedS) {
  if (tS > 50) {
     tS = 0;
  }  
  timeButtonS.innerHTML = "Stop Time Evolution: t = "  + tS.toFixed(3);
  generateDataS();
  Plotly.restyle('2dWaveFunctionRealSuper', {"z": [zPtsWFRS], "x": [xPtsWFRS], "y": [yPtsWFRS]} );
  Plotly.restyle('2dWaveFunctionImaginarySuper', {"z": [zPtsWFIS], "x": [xPtsWFIS], "y": [yPtsWFIS]} );  
  Plotly.restyle('2dProbDensityFunctionSuper', {"z": [zPtsPDS], "x": [xPtsPDS], "y": [yPtsPDS]} );
  tS += (0.40/(nx1+ny1+ny2+nx2)); //to scale animation speed with nx and ny values
  }
  else {
    timeButtonS.innerHTML = "Start Time Evolution: t = "  + tS.toFixed(3);
  }
              }, 1);