(function(root) {

  root.Shape = Shape;
  
  function Shape() {
    this.points = [];
    this.color = 'red';
    this.border_color = 'black';
    this.border_width = 2;
    this.is_closed = false;
  };

  _.extend(Shape.prototype, Backbone.Events, {

    'addPoint': function addPoint(point) {
      if (point.isEqual(this.firstPoint()))
        this.is_closed = true;
      this.points.push(point);
      this.trigger('change');
    },

    'hasPoints': function hasPoints() {
      return this.points.length;
    },

    'firstPoint': function firstPoint() {
      return this.points[0];
    },

    'removeLastPoint': function removeLastPoint() {
      this.points.pop();
      if (this.is_closed)
        this.is_closed = false;
      this.trigger('change');
      return this;
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
    
    'scale': function scale(scale) {
      this.points.forEach(function(pt) {
        pt.scale(scale);
      });
    },

    'toJSON': function toJSON() {
      return {
        'points': this.points,
        'color': this.color,
        'border_color': this.border_color,
        'border_width': this.border_width,
        'is_closed': this.is_closed
      };
    }
  });

  Shape.deserialize = function deserialize(raw_shape) {
    var shape = new Shape();
    shape.color = raw_shape.color;
    shape.border_color = raw_shape.border_color;
    shape.border_width = raw_shape.border_width;
    shape.is_closed = raw_shape.is_closed;
    raw_shape.points.forEach(function(raw_point) {
      var point = Point.deserialize(raw_point);
      shape.addPoint(point);
    });
    return shape;
  };

})(this);