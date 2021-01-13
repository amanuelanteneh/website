var widthW = 900, heightW = 550; //width and height of canvas hardcoded w=900, h=550
var marginW = {top: -20, right: 30, bottom: 40, left: 40}
var citiesW = [];
var routesW = []; 
var pausedW = 1;
var TW = 0;
var initialDistanceW = 0;
var maxRunsW = 0;
var runsW = 0;

$("#pauseButton2").click(function() {
    if ($("#pauseButton2").text() != "Done") {
    pausedW = !pausedW;
    if (pausedW) {
        $("#pauseButton2").html("Play");
    }
    else {
        $("#pauseButton2").html("Pause");       
    }
}
});

$("#resetButton2").click(function() {
    generateGeographyW();
    pausedW = 1;
    $("#pauseButton2").html("Play");
});

function calcDistanceW(citiesParam) {
    let totalDistance = 0;
    for (let i=0; i<(citiesParam.length-1); i++){
        let deltaLat = citiesParam[i+1][1][1] - citiesParam[i][1][1];
        let deltaLong = citiesParam[i+1][1][0] - citiesParam[i][1][0];
        deltaLong *= (Math.PI/180.0);
        deltaLat *= (Math.PI/180.0);

        let a = Math.sin(deltaLat/2)*Math.sin(deltaLat/2) + Math.cos(citiesParam[i][1][1]*(Math.PI/180))*Math.cos(citiesParam[i+1][1][1]*(Math.PI)/180)
                *Math.sin(deltaLong/2)*Math.sin(deltaLong/2);
               
        let c = 2*Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        totalDistance += (6371*c);
}
        //lastly calculate distance of return trip
        let deltaLat = citiesParam[citiesParam.length-1][1][1] - citiesParam[0][1][1];
        let deltaLong = citiesParam[citiesParam.length-1][1][0] - citiesParam[0][1][0];
        deltaLong *= (Math.PI/180.0);
        deltaLat *= (Math.PI/180.0);
        let a = Math.sin(deltaLat/2)*Math.sin(deltaLat/2) + Math.cos(citiesParam[0][1][1]*(Math.PI/180))*Math.cos(citiesParam[citiesParam.length-1][1][1]*(Math.PI/180))
                *Math.sin(deltaLong/2)*Math.sin(deltaLong/2);
        let c = 2*Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

        totalDistance += (6371*c);       
        return(totalDistance);
}

function shuffleW(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
}

function reverseSubarrayW(citiesParam, routesParam) {

        let startIndex = Math.floor(Math.random() * (citiesParam.length-1)); //get rand int from 0 to length-2
        let min = Math.ceil(startIndex);
        let max = Math.floor(citiesParam.length-1);
        let  endIndex = Math.floor(Math.random() * (max - min + 1)) + min;

        while (startIndex < endIndex) {
            [citiesW[startIndex], citiesW[endIndex]] = [citiesW[endIndex], citiesW[startIndex]];
            [routesW[startIndex], routesW[endIndex]] = [routesW[endIndex], routesW[startIndex]];  
            startIndex++;
            endIndex--;
        }

}

function sweepW(T) {
    let oldCities = [];
    let oldRoutes = [];
    for (let i = 0; i < citiesW.length; i++) { //copy/save cities & routes
        oldCities.push(citiesW[i]);
        oldRoutes.push(routesW[i]);
    }

    reverseSubarrayW(citiesW, routesW);

    let newDist = calcDistance(citiesW);
    let oldDist = calcDistance(oldCities);
    let dL = newDist - oldDist;
    
    if (dL > 0) { //if dL > 0 then the new config of cities is worse
        if (Math.random() < Math.exp(-dL / TW)) { //if prob condition is satisfied then keep the config 
            for (let i = 0; i < (citiesW.length - 1); i++) {

                routesW[i].attr("x1", citiesW[i + 1][0].attr("cx"))
                    .attr("y1", citiesW[i + 1][0].attr("cy"));
            }

            routesW[citiesW.length - 1].attr("x1", citiesW[0][0].attr("cx"))
                .attr("y1", citiesW[0][0].attr("cy"));

            $("#TInfo2").html("T: " + TW.toFixed(5));
            $("#currentDistInfo2").html("Current Distance: " + Math.trunc(newDist));
            return;
        }
        else { // else go back to old config

            for (let i = 0; i < citiesW.length; i++) {
                citiesW[i] = oldCities[i];
                routesW[i] = oldRoutes[i];
            }
            $("#TInfo2").html("T: " + TW.toFixed(5));
            $("#currentDistInfo2").html("Current Distance: " + Math.trunc(oldDist));
            return;
        }
    }
    else { //if dL < 0 then new dist is shorter so automatically keep
        for (let i = 0; i < (routesW.length - 1); i++) {

            routesW[i].attr("x1", citiesW[i + 1][0].attr("cx"))
                .attr("y1", citiesW[i + 1][0].attr("cy"));
        }

        routesW[citiesW.length - 1].attr("x1", citiesW[0][0].attr("cx"))
            .attr("y1", citiesW[0][0].attr("cy"));

        $("#TInfo2").html("T: " + TW.toFixed(5));
        $("#currentDistInfo2").html("Current Distance: " + Math.trunc(newDist));

        return;


    }
}

function annealW() {
    if (TW > 0.01) {
        sweepW(TW);
        if (runsW > maxRunsW) {
            TW *= 0.90;
            runsW = 0;
            }
            runsW++;
    }

    else {
            $("#pauseButton2").html("Done");
            $("#TInfo2").html("T: " + 0);
    }
  }


function generateGeographyW() {

    var projectionW = d3.geoMercator().center([10, 50]).scale(130);

    svgW.selectAll("g").remove();
    svgW.selectAll("line").remove();
    svgW.selectAll("circle").remove();
    citiesW = [];
    routesW = [];

    //Draw world
    d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson", function (data) {
    // get everything but antarctica
    data.features = data.features.filter(function (d) { return (d.properties.name != "Antarctica") });

        // Draw the map
        svgW.append("g")
            .selectAll("path")
            .data(data.features)
            .enter().append("path")
            .attr("fill", "#017318")   //#69b3a2
            .attr("d", d3.geoPath()
                .projection(projectionW)
            )
            .style("stroke", "black");

        d3.csv("static/data/citiesWorld.csv", function (data) { //read csv file
            /*IMPORTANT - format of cities arrays is an array of arrays, the second array in each entry is an array of the lat and long of the
             of the city being added. This is because you will need this to calculate the distance between cities later*/
            for (let i = 0; i < data.length; i++) {
                if (Math.floor(Math.random() * 90) < 2) {
                    citiesW.push([svgW.append("circle")
                        .attr("cx", projectionW([data[i].lon, data[i].lat])[0])
                        .attr("cy", projectionW([data[i].lon, data[i].lat])[1])
                        .attr("r", 2)
                        .style("fill", "#FFFFFF"), [data[i].lon, data[i].lat]]);
                }
            }
            TW = 0.900000;
            shuffleW(citiesW);
            maxRunsW = Math.ceil(1.5*citiesW.length);
            runsW = 0;
            initialDistanceW = calcDistance(citiesW);
            $("#TInfo2").html("T = " + TW.toFixed(5));
            $("#distInfo2").html("Current Distance = " + Math.trunc(calcDistance(citiesW)));
            $("#cityNumInfo2").html("Number of cities: " + Math.trunc(citiesW.length));
            $("#startDistInfo2").html("Starting distance: " + Math.trunc(initialDistanceW));
            $("#currentDistInfo2").html("Current Distance: " + Math.trunc(initialDistanceW)); 

            for (let i = 0; i < (citiesW.length - 1); i++) {
                routesW.push(svgW.append('line')
                    .attr('x2', citiesW[i][0].attr("cx"))
                    .attr('y2', citiesW[i][0].attr("cy"))
                    .attr('x1', citiesW[i + 1][0].attr("cx"))
                    .attr('y1', citiesW[i + 1][0].attr("cy"))
                    .attr('stroke', '#FFFFFF')
                    .attr('stroke-width', '1px'));
            }

            routesW.push(svgW.append('line') //connect last city to first city since thats part of the problem
                .attr('x2', citiesW[citiesW.length - 1][0].attr("cx"))
                .attr('y2', citiesW[citiesW.length - 1][0].attr("cy"))
                .attr('x1', citiesW[0][0].attr("cx"))
                .attr('y1', citiesW[0][0].attr("cy"))
                .attr('stroke', '#FFFFFF')
                .attr('stroke-width', '1px'));

        });

    });

}

d3.select("#canvas2").attr("width", widthW).attr("height", heightW);

var canvasW = d3.select("#canvas2"); //get canvas

var contextW = canvasW.node().getContext("2d"); //get 2D context


var svgW = d3.select("#simulatedAnnealing2")
    .attr("width", widthW)
    .attr("height", heightW)
    .append("g") 
    .attr("border", 1);

svgW.append("rect") //add blue rect for ocean
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("fill", "#0373fc");


svgW.append("rect") //create border
    .attr("x", 0)
    .attr("y", 0)
    .attr("height", heightW)
    .attr("width", widthW)
    .style("stroke", "#FFFFFF")
    .style("fill", "none")
    .style("stroke-width", 10);

generateGeographyW();


var runWorldApp = setInterval(function () {
    if (!pausedW) {
        annealW();
    }
}, 10);