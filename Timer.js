var Backbone = require('backbone')
  , _ = require('underscore')
  , Handlebars = require('handlebars')
  , RenderToStringMixin = require('./backbone-render-to-string').RenderToStringMixin;

var Timer = Backbone.View.extend({
  initialize: function() {
    this.model = new Backbone.Model({ secondsElapsed: 0 });
    if(typeof window !== 'undefined') {
      this.listen();
    }
  }
  , template: Handlebars.compile('<input type="text" value="Edit Me!"> Seconds Elapsed: {{secondsElapsed}}')
  , render: function() {
    this.$el.html(this.renderToString());
    return this;
  }
  , tick: function() {
    this.model.set('secondsElapsed', this.model.get('secondsElapsed') + 1);
  }
  , listen: function() {
    this.listenTo(this.model, "change", this.render.bind(this));
    this.interval = setInterval(this.tick.bind(this), 1000);
  }
  , remove: function() {
    clearInterval(this.interval);
  }
});

_.extend(Timer.prototype, RenderToStringMixin);

module.exports = Timer;
