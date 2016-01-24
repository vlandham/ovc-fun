
require('../full.html');
require('../scss/full.scss');


var d3 = require('d3');

var aspect = screen.width / screen.height;

var height = 800;
var width = height * aspect;

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomPoints(width, height, count) {
  var points = [];
  for(var i = 0; i < count; i++) {
    points.push([getRandomInt(-20, width+20), getRandomInt(-20, height+20)]);
  }

  return points;
}


function showMargins(svg) {

  svg.append('rect')
    .attr('width', '100%')
    .attr('height', '20')
    .attr('fill', 'pink');

  svg.append('rect')
    .attr('width', '100%')
    .attr('height', '20')
    .attr('y', height - 20)
    .attr('fill', 'steelblue');

  svg.append('rect')
    .attr('width', '20')
    .attr('height', '100%')
    .attr('fill', 'red');

  svg.append('rect')
    .attr('width', '20')
    .attr('height', '100%')
    .attr('x', width - 20)
    .attr('fill', 'green');
}

function addTitle(svg) {
  svg.append('text')
    .attr('text-anchor', 'middle')
    .attr('x', width / 2)
    .attr('y', '15%')
    .attr('fill', 'white')
    .attr('class', 'banner')
    .text('OPENVIS');

  svg.append('text')
    .attr('text-anchor', 'middle')
    .attr('x', width / 2)
    .attr('y', '20%')
    .attr('fill', 'white')
    .attr('class', 'sub-banner')
    .text('CONFERENCE');
}


function setup() {

  var body = d3.select('body');
  var svg = body.append('svg')
    .attr("viewBox", "0 0 " + width + " " + height)
    .attr("width", width)
    .attr("height", height);

  var defs = svg.append('defs');

  var gradient = defs.append('linearGradient')
    .attr('id', 'water');
  gradient.append('stop')
    .attr('offset', '5%')
    .attr('stop-color', 'rgba(91, 18, 157, 0.85)');
  gradient.append('stop')
    .attr('offset', '95%')
    .attr('stop-color', 'rgba(41, 227, 227, 0.85)');

  svg.append('rect')
    .attr('width', '100%')
    .attr('height', '100%')
    .attr('fill', 'url(#water)');


  return svg;

}

function addPoints(svg) {

  var points = getRandomPoints(width, height, 300);
  points.push([-20,-20]);
  points.push([-20,height + 20]);
  points.push([width+20,height + 20]);
  points.push([width+20,-20]);

  var voronoi = d3.geom.voronoi()
    .clipExtent([[0, 0], [width, height]]);

  var l = voronoi.links(points);
  var path = svg.append("g").selectAll("path");
  path = path
    .data(l);

  path.enter()
    .append("path")
    .attr('fill', 'none')
    .attr('stroke', 'black')
    .attr("d", function(d) { return "M" + d.source.join(',') + "L" + d.target.join(',') + "Z"; });

  // d3.timer(function(t) {
  //   l.forEach(function(point) {
  //     point.source[0] = (Math.random() > 0.5) ? point.source[0] + 1 : point.source[0] - 1;
  //     point.source[1] = (Math.random() > 0.5) ? point.source[1] + 1 : point.source[1] - 1;
  //   });
  //
  //   path.data(l)
  //     .attr("d", function(d) { return "M" + d.source.join(',') + "L" + d.target.join(',') + "Z"; });
  // });
  var timeout;
  function loop() {
    l.forEach(function(point) {
      point.source[0] = (Math.random() > 0.5) ? point.source[0] + 10 : point.source[0] - 10;
      point.source[1] = (Math.random() > 0.5) ? point.source[1] + 10 : point.source[1] - 10;
    });

    // path.data(l)
    //   .transition()
    //   .duration(600)
    //   .attr("d", function(d) { return "M" + d.source.join(',') + "L" + d.target.join(',') + "Z"; })

    // timeout = setTimeout(loop, 1000);
  }

  loop();

}

var svg = setup();
// showMargins(svg);
addPoints(svg);

addTitle(svg);
