var width = 800, height = 800; //width and height of canvas hardcoded
var margin = {top: -20, right: 30, bottom: 40, left: 40};

/* Begin setting up canvas and graph */

d3.select("#canvas1").attr("width", width).attr("height", height);

var canvas = d3.select("#canvas1"); //get canvas

var context = canvas.node().getContext("2d"); //get 2D context

var svg = d3.select("#simulatedAnnealing") 
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

var xAxis = d3.scaleLinear() //create x axis 
    .domain([-151, 151])
    .range([0, width]);

svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xAxis)); //set x axis to be bottom axis

var yAxis = d3.scaleLinear() //create y axis
    .domain([-81, 81])
    .range([height, 0]);

svg.append("g")
    .call(d3.axisLeft(yAxis)); //ibid but for y axis and left axis

var projection = d3.geoNaturalEarth()
                   .scale(width / 1.3 / Math.PI)
                   .translate([width / 2, height / 2]);
   
d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson", function (data) {

    // Draw the map
    svg.append("g")
        .selectAll("path")
        .data(data.features)
        .enter().append("path")
        .attr("fill", "#69b3a2")
        .attr("d", d3.geoPath()
            .projection(projection)
        )
        .style("stroke", "#fff")
});
