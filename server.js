var express = require('express');
var fs = require('fs');
var Timer = require('./Timer');

var PLACEHOLDER = 'If you see this then something is wrong.';
var JQUERY = fs.readFileSync('./node_modules/jquery/dist/jquery.min.js');
var BUNDLE = fs.readFileSync('./browser-bundle.js', {encoding: 'utf8'});
var TEMPLATE = fs.readFileSync('./index.html', {encoding: 'utf8'});

var app = express();

function index_html(req, res) {
  // You could use JSX here; doesn't matter.
  var timer = new Timer()
    , markup = timer.renderToString();

  res.send(TEMPLATE.replace(PLACEHOLDER, markup));
}

app.get('/', index_html);
app.get('/index.html', index_html);
app.get('/jquery.js', function(req, res) {
  res.send(JQUERY);
});
app.get('/browser-bundle.js', function(req, res) {
  res.send(BUNDLE);
});

app.listen(4000);
