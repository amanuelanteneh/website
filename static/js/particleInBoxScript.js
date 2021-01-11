var zPts = []; //surface plots use only z data?
var xPts = [];
var yPts = [];

for(x=0; x<1; x+=0.01) {
  for (y=0; y<1; y+=0.01) {
  zPts.push( Array(10).fill().map(() => Math.sin(x)) );
  yPts.push(y);
  xPts.push(x);
  }
}

var data = [{
    z: zPts,
   /* x: xPts,
    y: yPts,*/
    type: 'surface',
   /* contours: {
      z: {
        show:true,
        usecolormap: true,
        highlightcolor:"#42f462",
        project:{z: true}
      }
    }*/
  }];

  var layout = {
    title: 'Wave function - 2D Infinite Potential Well',
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
        size: 12,
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
  
  Plotly.newPlot('2dWaveFunction', data, layout);