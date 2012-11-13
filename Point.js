(function(root) {
  root.Point = Point;

  function Point(x, y) {
    this._x = x;
    this._y = y;
  }
  
  Object.defineProperty(Point.prototype, 'x', {
   get: function() { return this._x; },
   set: function(x) { this._x = x; this.trigger('change'); }
  });

  Object.defineProperty(Point.prototype, 'y', {
   get: function() { return this._y; },
   set: function(y) { this._y = y; this.trigger('change'); }
  });

  _.extend(Point.prototype, Backbone.Events, {

    'toString': function toString() {
      return this._x + ',' + this._y;
    },

    'isEqual': function isEqual(point) {
      if (!point)
        return false;
      return this._x == point.x && this._y == point.y;
    },

    'clone': function clone() {
      return new Point(this._x, this._y);
    },

    'diff': function diff(other_point) {
      return new Point(this._x - other_point.x, this._y - other_point.y);
    },

    'add': function add(other_point) {
      this._x += other_point.x;
      this._y += other_point.y;
      return this;
    },

    'scale': function scale(scale) {
      this._x *= scale;
      this._y *= scale;
    },

    'snap': function snap() {
      this._x = snap(this._x);
      this._y = snap(this._y);
      
      function snap(val) {
        return Math.round(val / 20) * 20;
      }
      return this;
    },

    'toJSON': function toJSON() {
      return {
      	'x': this._x,
      	'y': this._y
      }
    }
  });

  Point.deserialize = function deserialize(raw_point) {
    return new Point(raw_point.x, raw_point.y);
  };

})(this);