var width = 900, height = 550; //width and height of canvas hardcoded w=980 h=550
var margin = {top: -20, right: 30, bottom: 40, left: 40};
var cities = [];
var routes = []; 
var paused = 1;
var T = 0;
var initialDistance = 0;
var maxRuns = 0;
var runs = 0;

$("#pauseButton1").click(function() {
    paused = !paused;
    if (paused) {
        $("#pauseButton1").html("Play");
    }
    else {
        $("#pauseButton1").html("Pause");       
    }
});

$("#resetButton1").click(function() {
    generateGeography();
    paused = 1;
    $("#pauseButton1").html("Play");
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

function calcTMax() {
    T = calcDistance(cities);
    for (let i=0; i<2000; i++) {
        let randIndex1 = Math.floor(Math.random() * cities.length); //get random int from 0 to cities.length-1     
        let randIndex2 = Math.floor(Math.random() * cities.length);       
        //don't need to touch routes arr bc it gets created after this func is called
        [cities[randIndex1], cities[randIndex2]] = [cities[randIndex2], cities[randIndex1]]; 

        let TMax = calcDistance(cities);
        if ( TMax > T) {
            T = TMax;
        }
    }
    T *= (10*cities.length);
}

function reverseSubarray(citiesParam, routesParam) {

        let startIndex = Math.floor(Math.random() * (citiesParam.length-1)); //get rand int from 0 to length-2
        let min = Math.ceil(startIndex);
        let max = Math.floor(citiesParam.length-1);
        let  endIndex = Math.floor(Math.random() * (max - min + 1)) + min;

        while (startIndex < endIndex) {
            [cities[startIndex], cities[endIndex]] = [cities[endIndex], cities[startIndex]];
            [routes[startIndex], routes[endIndex]] = [routes[endIndex], routes[startIndex]];  
            startIndex++;
            endIndex--;
        }

}

function sweep(T) {
    let oldCities = [];
    let oldRoutes = [];
    for (let i = 0; i < cities.length; i++) { //copy/save cities & routes
        oldCities.push(cities[i]);
        oldRoutes.push(routes[i]);
    }

    reverseSubarray(cities, routes);

    let newDist = calcDistance(cities);
    let oldDist = calcDistance(oldCities);
    let dL = newDist - oldDist;

    if (dL > 0) { //if dL > 0 then the new config of cities is worse
        if (Math.random() < Math.exp(-dL / T)) { //if prob condition is satisfied then keep the config 
            for (let i = 0; i < (cities.length - 1); i++) {

                routes[i].attr("x1", cities[i + 1][0].attr("cx"))
                    .attr("y1", cities[i + 1][0].attr("cy"));
            }

            routes[cities.length - 1].attr("x1", cities[0][0].attr("cx"))
                .attr("y1", cities[0][0].attr("cy"));

            $("#TInfo").html("T: " + T.toFixed(1));
            $("#currentDistInfo").html("Current Distance: " + Math.trunc(newDist));
            return;
        }
        else { // else go back to old config

            for (let i = 0; i < cities.length; i++) {
                cities[i] = oldCities[i];
                routes[i] = oldRoutes[i];
            }
            $("#TInfo").html("T: " + T.toFixed(1));
            $("#currentDistInfo").html("Current Distance: " + Math.trunc(oldDist));
            return;
        }
    }
    else { //if dL < 0 then new dist is shorter so automatically keep
        for (let i = 0; i < (routes.length - 1); i++) {

            routes[i].attr("x1", cities[i + 1][0].attr("cx"))
                .attr("y1", cities[i + 1][0].attr("cy"));
        }

        routes[cities.length - 1].attr("x1", cities[0][0].attr("cx"))
            .attr("y1", cities[0][0].attr("cy"));

        $("#TInfo").html("T: " + T.toFixed(1));
        $("#currentDistInfo").html("Current Distance: " + Math.trunc(newDist));

        return;


    }
}

function anneal() {
    if (T > 0.1) {
        sweep(T);
        T *= 0.85;
    }

    else { //special case for T = 0.1
        T = 0.1;
        sweep(T);
        runs++;
        if (runs == maxRuns) {
            paused = 1;
            $("#pauseButton1").html("Play");
            $("#TInfo").html("T: " + 0);
        }
    }
}

function generateGeography() {

    var projection = d3.geoAlbers().center([0, 55]).scale(450);

    svg.selectAll("g").remove();
    svg.selectAll("line").remove();
    svg.selectAll("circle").remove();
    cities = [];
    routes = [];

    //Draw USA and canada 
    d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson", function (data) {

        //filter out geo data for everything but Canada & USA    
        data.features = data.features.filter(function (d) { return (d.properties.name == "USA" || d.properties.name == "Canada") });

        // Draw the map
        svg.append("g")
            .selectAll("path")
            .data(data.features)
            .enter().append("path")
            .attr("fill", "#017318")   //#69b3a2
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
            T = 0;
            calcTMax(cities);
            initialDistance = T;
            maxRuns = cities.length*30;
            runs = 0;
            $("#TInfo").html("T = " + T.toFixed(1));
            $("#distInfo").html("Current Distance = " + Math.trunc(calcDistance(cities)));
            $("#cityNumInfo").html("Number of cities: " + Math.trunc(cities.length));
            $("#startDistInfo").html("Starting distance: " + Math.trunc(initialDistance));
            $("#currentDistInfo").html("Current Distance: &#8734;");

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

}


var svg = d3.select("#simulatedAnnealing1")
    .attr("width", width)
    .attr("height", height)
    .append("g")    
    .attr("border", 1);

svg.append("rect") //add blue rect for ocean
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("fill", "#0373fc");


svg.append("rect") //create border
    .attr("x", 0)
    .attr("y", 0)
    .attr("height", height)
    .attr("width", width)
    .style("stroke", "#FFFFFF")
    .style("fill", "none")
    .style("stroke-width", 10);

generateGeography();


var runApp = setInterval(function () {
    if (!paused) {
        anneal();
    }
}, 10);