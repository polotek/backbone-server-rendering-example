var Backbone = require('backbone');
var Timer = require('./Timer');

// Simulate long JS load time
setTimeout(function() {
  var root = Backbone.$('#root')
    , timer = new Timer();

  timer.setElement(Backbone.$('#root div'));
}, 3000);
