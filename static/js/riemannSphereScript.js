var origin = [480, 250], j = 16, points = [], alpha = 0, beta = 0, startAngle = Math.PI/4;

var mx, my, mouseX, mouseY; //mouse drag variables

/* Begin mouse drag functions */
function dragStart(){
    mx = d3.event.x;
    my = d3.event.y;
}

function dragged(){
    mouseX = mouseX || 0;
    mouseY = mouseY || 0;
    beta   = (d3.event.x - mx + mouseX) * Math.PI / 230 ;
    alpha  = (d3.event.y - my + mouseY) * Math.PI / 230  * (-1);
    processData(surface.rotateY(beta + startAngle).rotateX(alpha - startAngle)(points), 0);
}

function dragEnd(){
    mouseX = d3.event.x - mx + mouseX;
    mouseY = d3.event.y - my + mouseY;
}
/* end mouse drag functions */



var svg = d3.select('#riemannSphere').call(d3.drag().on('drag', dragged).on('start', dragStart).on('end', dragEnd)).append('g');

var surface = d3._3d()
.scale(10)
.x(function(d){ return d.x; })
.y(function(d){ return d.y; })
.z(function(d){ return d.z; })
.origin(origin)
.rotateY(startAngle)
.rotateX(-startAngle)
.shape('SURFACE', j*2);

function processData(data, tt){

    var planes = svg.selectAll('path').data(data, function(d){ return d.plane; });

    planes
        .enter()
        .append('path')
        .attr('class', '_3d')
        .attr('fill', "white")
        .attr('opacity', 0)
        .attr('stroke-opacity', 0)
        .merge(planes)
        .attr('stroke', 'black')
        .transition().duration(tt)
        .attr('opacity', 0.1)
        //.attr('fill', colorize)
        .attr('d', surface.draw);

    planes.exit().remove();

    d3.selectAll('._3d').sort(surface.sort);

}

function init(eq){
    points = [];

    for(var z = -j; z < j; z++){
        for(var x = -j; x < j; x++){
            points.push({x: x, y: eq(x, z), z: z});
        }
    }

    var yMin = d3.min(points, function(d){ return d.y; });
    var yMax = d3.max(points, function(d){ return d.y; });

 //   color.domain([yMin, yMax]);
    processData(surface(points), 1000);
}

function change(){
    var rn1 = Math.floor(d3.randomUniform(1, 12)());
    rn1 = 1;
    var eqa = function(x, z) {
        return Math.sqrt( 400 - (z*z) - (x*x) )*rn1;
    };
    init(eqa);
}

d3.selectAll('button').on('click', change);

change();