(function(root) {

  root.Ellipse = Ellipse;

  function Ellipse(pt1) {
    this.pt1 = pt1;
    this.pt2 = pt1;
    this.color = 'red';
    this.border_color = 'black';
    this.border_width = 2;
  }
  _.extend(Ellipse.prototype, Backbone.Events, {

    'setPoint2': function setPoint2(pt2) {
      this.pt2 = pt2;
      this.trigger('change');
    },

    'applyColor': function applyColor(color) {
      var dark_color = 'Dark' + color;

      // for some reason, Salmon & Grey are darker than DarkSalmon & DarkGrey
      if (color == 'Grey' || color == 'Salmon' || color == 'OliveGreen') {
        var orig_color = color;
        color = dark_color;
        dark_color = orig_color;
      }
      if (color == 'Brown') {
        color = 'Sienna';
        dark_color = 'SaddleBrown';
      }
      if (color == 'Black')
        dark_color = 'Black';
      
      this.color = color;
      this.border_color = dark_color;
      this.trigger('change');
      return this;
    },

    'toJSON': function toJSON() {
      return {
        'pt1': this.pt1,
        'pt2': this.pt2,
        'color': this.color,
        'border_color': this.border_color,
        'border_width': this.border_width
      };
    }
  });

  Ellipse.deserialize = function deserialize(raw_ellipse) {
    var ellipse = new Ellipse();
    ellipse.pt1 = Point.deserialize(raw_ellipse.pt1);
    ellipse.pt2 = Point.deserialize(raw_ellipse.pt2);
    ellipse.color = raw_ellipse.color;
    ellipse.border_color = raw_ellipse.border_color;
    ellipse.border_width = raw_ellipse.border_width;
    return ellipse;
  };
})(this);