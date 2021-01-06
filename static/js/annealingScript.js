var width = 980, height = 550; //width and height of canvas hardcoded
var margin = {top: -20, right: 30, bottom: 40, left: 40};

var cities = [];
var routes = []; 
var paused = 1;
var TMax = 0;
var initialDistance = 0;
var T = 0;
var maxRuns = 1000;
var runs = 0;


$("#pauseButton1").click(function() {
    paused = !paused;
});

function calcDistance(citiesParam) {
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
        let deltaLat = cities[citiesParam.length-1][1][1] - citiesParam[0][1][1];
        let deltaLong = citiesParam[cities.length-1][1][0] - citiesParam[0][1][0];
        deltaLong *= (Math.PI/180.0);
        deltaLat *= (Math.PI/180.0);
        let a = Math.sin(deltaLat/2)*Math.sin(deltaLat/2) + Math.cos(citiesParam[0][1][1]*(Math.PI/180))*Math.cos(citiesParam[cities.length-1][1][1]*(Math.PI/180))
                *Math.sin(deltaLong/2)*Math.sin(deltaLong/2);
        let c = 2*Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

        totalDistance += (6371*c);       
        return(totalDistance);
}

function calcTMax() {
    TMax = calcDistance(cities);
    for (let i=0; i<2000; i++) {
        let randIndex1 = Math.floor(Math.random() * cities.length); //get random int from 0 to cities.length-1     
        let randIndex2 = Math.floor(Math.random() * cities.length);       
        [cities[randIndex1], cities[randIndex2]] = [cities[randIndex2], cities[randIndex1]]; 

        let TMaxNew = calcDistance(cities);
        if ( TMaxNew > TMax) {
            TMax = TMaxNew;
        }
    }
    TMax *= (70*cities.length);
}

function anneal() {
    if (TMax > 1.0 && runs < maxRuns) {
    //runs++;
    TMax /= 1.05;
    let oldCities = [];
    for (let i=0; i<cities.length; i++){
        oldCities.push(cities[i]);
    }
    let randIndex1 = Math.floor(Math.random() * cities.length); //get random int from 0 to cities.length-1     
    let randIndex2 = Math.floor(Math.random() * cities.length);       
    [cities[randIndex1], cities[randIndex2]] = [cities[randIndex2], cities[randIndex1]];
    [routes[randIndex1], routes[randIndex2]] = [routes[randIndex2], routes[randIndex1]];   
    let newDist = calcDistance(cities);
    let oldDist = calcDistance(oldCities);
    let dL = newDist - oldDist;
    console.log("dL = " + dL);
    if (dL > 0) { //if dL > 0 then the new config of cities is worse
        if (Math.random() < Math.exp(-dL / TMax)) { //if prob condition is satisfied then keep the config 
            for (let i = 0; i < (cities.length - 1); i++) {
       
                    routes[i].attr("x1", cities[i + 1][0].attr("cx"))
                        .attr("y1", cities[i + 1][0].attr("cy"));
                }

                routes[cities.length - 1].attr("x1", cities[0][0].attr("cx"))
                    .attr("y1", cities[0][0].attr("cy"));

                $("#TInfo").html("T: " + Math.trunc(TMax));
                $("#currentDistInfo").html("Current Distance: " + Math.trunc(newDist));
               // $("#improvementInfo").html(1/((initialDistance/newDist)*100) + "% improvement");
                return;
            }
            else { // else go back to old config
                [cities[randIndex1], cities[randIndex2]] = [cities[randIndex2], cities[randIndex1]];
                [routes[randIndex1], routes[randIndex2]] = [routes[randIndex2], routes[randIndex1]];
                $("#TInfo").html("T: " + Math.trunc(TMax));
                $("#currentDistInfo").html("Current Distance: " + oMath.trunc(oldDist));
           //     $("#improvementInfo").html(1/((initialDistance/oldDist)*100) + "% improvement");                
                return;
            }
        }
        else {
            for (let i = 0; i < (routes.length - 1); i++) {

                routes[i].attr("x1", cities[i + 1][0].attr("cx"))
                    .attr("y1", cities[i + 1][0].attr("cy"));
            }

            routes[cities.length - 1].attr("x1", cities[0][0].attr("cx"))
                .attr("y1", cities[0][0].attr("cy"));

            $("#TInfo").html("T: " + Math.trunc(TMax));
            $("#currentDistInfo").html("Current Distance: " + Math.trunc(newDist));
            //$("#improvementInfo").html(1/((initialDistance/newDist)*100) + "% improvement");

            return;
        }
    }
}


/* Begin setting up canvas */

d3.select("#canvas1").attr("width", width).attr("height", height);

var canvas = d3.select("#canvas1"); //get canvas

var context = canvas.node().getContext("2d"); //get 2D context

var svg = d3.select("#simulatedAnnealing")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

var projection = d3.geoAlbers().center([0, 60]).scale(450);

//draw USA
d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson", function (data) {
    data.features = data.features.filter(function (d) { return d.properties.name == "USA" });

    // Draw the map
    svg.append("g")
        .selectAll("path")
        .data(data.features)
        .enter().append("path")
        .attr("fill", "#2a9c0b")   //#69b3a2
        .attr("d", d3.geoPath()
            .projection(projection)
        )
        .style("stroke", "black");

});

//draw canada
d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson", function (data) {
    data.features = data.features.filter(function (d) { return d.properties.name == "Canada" });

    // Draw the map
    svg.append("g")
        .selectAll("path")
        .data(data.features)
        .enter().append("path")
        .attr("fill", "#2a9c0b")   //#69b3a2
        .attr("d", d3.geoPath()
            .projection(projection)
        )
        .style("stroke", "black");

    d3.csv("static/citiesUSA.csv", function (data) { //read csv file
        /*IMPORTANT - format of cities arrays is an array of arrays, the second array in each entry is an array of the lat and long of the
         of the city being added. This is because you will need this to calculate the distance between cities later*/
        for (let i = 0; i < data.length; i++) {
            if (Math.floor(Math.random() * 70) < 2) {
                cities.push([svg.append("circle")
                    .attr("cx", projection([data[i].lon, data[i].lat])[0])
                    .attr("cy", projection([data[i].lon, data[i].lat])[1])
                    .attr("r", 2)
                    .style("fill", "#FFFFFF"), [data[i].lon, data[i].lat]]);
            }
        }
        calcTMax(cities);
        initialDistance = TMax;
        $("#TInfo").html("T = " + Math.trunc(TMax));
        $("#distInfo").html("Current Distance = " + Math.trunc(calcDistance(cities)));
        $("#cityNumInfo").html("Number of cities: " + Math.trunc(cities.length));
        $("#startDistInfo").html("Starting distance: " + Math.trunc(initialDistance));
      //  $("#improvementInfo").html(0 + "% improvement");

        for (let i = 0; i < (cities.length - 1); i++) {
            routes.push(svg.append('line')
                .attr('x2', cities[i][0].attr("cx"))
                .attr('y2', cities[i][0].attr("cy"))
                .attr('x1', cities[i + 1][0].attr("cx"))
                .attr('y1', cities[i + 1][0].attr("cy"))
                .attr('stroke', '#FFFFFF')
                .attr('stroke-width', '1px'));
        }

        routes.push(svg.append('line') //connect last city to first city since thats part of the problem
            .attr('x2', cities[cities.length - 1][0].attr("cx"))
            .attr('y2', cities[cities.length - 1][0].attr("cy"))
            .attr('x1', cities[0][0].attr("cx"))
            .attr('y1', cities[0][0].attr("cy"))
            .attr('stroke', '#FFFFFF')
            .attr('stroke-width', '1px'));

    });

});

var runApp = setInterval(function () {
    if (!paused) {
        anneal();
    }
}, 40);