var Backbone = require('backbone')
  , Handlebars = require('handlebars');

/* Comments
 */
// TODO: don't Dont this
if(typeof window === 'undefined') {
  Backbone.$ = function(input) {
    var stub = { attr: function() { return stub; } };
    return stub;
  };
} else {
  Backbone.$ = jQuery;
}

var metaTemplate = Handlebars.compile('<{{tagName}}>{{{markup}}}</{{tagName}}>');
function render(tagName, attrs, template, model) {
  var markup = template(model);
  return metaTemplate({tagName: tagName, attrs: attrs, markup: markup });
}

var RenderToStringMixin = {
  renderToString: function() {
    if(!this.template || !this.model) {
      console.log(this);
      throw new Error('template and model must be available on the view!');
    }

    return render(this.tagName, this.attributes, this.template, this.model.toJSON());
  }
};

module.exports = {
  render: render
  , RenderToStringMixin: RenderToStringMixin
};
