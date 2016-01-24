require('./style');
require('../index.html');
var queue = require('queue-async');
var d3 = require('d3');
var createPlot = require('./vis');


var plot = createPlot();

function plotData(selector, data, plot) {
  d3.select(selector)
    .datum(data)
    .call(plot);
}

function display(error, data) {
  // plotData("#vis",  data, plot);
  document.body.appendChild(data.documentElement);
  var svg = d3.select('svg')
  svg.attr('width', "100%")
  svg.attr('height', "100%")
  var path = d3.select('svg').select('path');
  console.log(path.attr('d'))

}

queue()
  .defer(d3.xml, "data/logo-graphic.svg")
  .await(display);
