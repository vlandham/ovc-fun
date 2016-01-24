
require('../vendor/p5.js');

var d3 = require('d3');

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var backgroundScale = d3.scale.linear().domain([-1,1])
  // .range(['rgba(41, 227, 227, 0.85)', 'rgba(91, 18, 157, 0.85)']);
  // .range(['rgb(41, 227, 227)', 'rgb(91, 18, 157)']);
  .range(['rgb(28, 156, 156)', 'rgb(91, 18, 157)']);

var sizeScale = d3.scale.linear().domain([-1,1])
  .range([50,80]);

var jellies = [];

function setupJellies(count) {
  var jellies = [];
  d3.range(count).forEach(function(i) {
    var jelly = {
      x: getRandomInt(0, width),
      y: getRandomInt(0, height),
      i:i
    };

    jellies.push(jelly);

  });

  return jellies;

}

window.setup = function() {
  createCanvas(windowWidth, windowHeight);
  jellies = setupJellies(20);
};

function drawJelly(x,y,frame) {
  // var color = 'rgba(0, 255, 0, 0.35)';
  var color = 'rgba(230, 234, 234, 0.45)';
  fill(color);
  noStroke();
  var modR = sin(frame * 0.03);
  var width = sizeScale(modR);
  var height = 80;
  arc(x, y, width, height, PI, 0, CHORD);

  stroke(color);

  d3.range(10).forEach(function(i) {
    var seg = width / 10;
    var lineX = (x - width / 2) + 3 + (seg * i);
    line(lineX, y, lineX, y + 14);
  })

}


window.draw = function() {
  clear();

  var mod = sin(frameCount * 0.01);
  background(String(backgroundScale(mod)));


  var midX = width / 2;
  var midY = height / 2;
  drawJelly(midX, midY, frameCount);
  jellies.forEach(function(j) {
    drawJelly(j.x, j.y, frameCount + j.i * 5);
    // if(frameCount % 10 == 0) {
    //   j.x = (Math.random() > 0.5) ? j.x + 1 : j.x - 1;
    //   j.y = (Math.random() > 0.6) ? j.y + 1 : j.y - 1;
    // }
    
  })
  // ellipse(midX, midY, 60, 60);

};

window.windowResized = function() {
  resizeCanvas(windowWidth, windowHeight);
}
