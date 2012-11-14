(function(root) {

  root.Sprite = Sprite;

  function Sprite() {
    this.shapes = [];
    this.sprites = [];
    this.createNewShape();
    this.current_color;
    
    this.setOffset(new Point(0, 0));
  }
  _.extend(Sprite.prototype, Backbone.Events, {

    'setOffset': function setOffset(offset) {
      this.offset = offset;
      this.offset.on('change', function() {
        this.trigger('change');
      }.bind(this));
    },

    'setCurrentColor': function setCurrentColor(color) {
      this.getLastShape().applyColor(color);
      this.current_color = color;
    },

    'addShape': function addShape(shp) {
      this.shapes.push(shp);
    },

    'getShapes': function getShapes() {
      return _(this.shapes).clone();
    },

    'getLastShape': function getLastShape() {
      return _(this.shapes).last();
    },

    'createNewShape': function createNewShape() {
      var shape = new Shape().applyColor(this.current_color);
      this.shapes.push(shape);
      this.trigger('shape:add', shape);
    },

    'addPoint': function addPoint(point) {
      point = point.diff(this.offset);
      var last_shape = this.getLastShape();
      last_shape.addPoint(point);
      if (last_shape.is_closed)
        this.createNewShape();
    },

    'undoLastPoint': function undoLastPoint() {
      var current_shape = this.getLastShape();

      if (!current_shape.hasPoints()) {
      	this.shapes.pop();
      	current_shape = this.getLastShape();
      }
      current_shape.removeLastPoint();
    },

    'scale': function scale(scale) {
      this.shapes.forEach(function(shape) {
        shape.scale(scale);
      });
    },

    'addSprite': function addSprite(sprite) {
      this.sprites.push(sprite);
      this.trigger('sprite:add', sprite);
    },

    'goRight': function goRight() {
      this.offset.x += 5;
    },

    'goLeft': function goLeft() {
      this.offset.x -= 5;
    },

    'jump': function jump() {
      var start_time = new Date().getTime();
      var start_value = this.offset.y;
      delta_value = -60;
      duration = 500;
      var easing = Easing.easeOutQuad.bind(null, start_value, delta_value, duration);
      var interval_id = setInterval(function() {
        var delta_time = new Date().getTime() - start_time;
        var val = easing(delta_time);
        this.offset.y = val;

        if (delta_time >= 500)
          clearInterval(interval_id);
      }.bind(this), 10);

      setTimeout(function() {
        var start_time = new Date().getTime();
        var start_value = this.offset.y;
        delta_value = 60;
        duration = 500;
        var easing = Easing.easeInQuad.bind(null, start_value, delta_value, duration);
        var interval_id = setInterval(function() {
          var delta_time = new Date().getTime() - start_time;
          var val = easing(delta_time);
          this.offset.y = val;

          if (delta_time >= 500)
            clearInterval(interval_id);
        }.bind(this), 10);
      }.bind(this), 500)
    },

    'save': function save(sprite_name) {
      localStorage.setItem(sprite_name, JSON.stringify(this));
    },

    'toJSON': function toJSON() {
      return {
        'shapes': this.shapes,
        'sprites': this.sprites,
        'offset': this.offset
      };
    }
  });

  Sprite.deserialize = function deserialize(raw_obj) {
    // support old versions
    if (_(raw_obj).isArray())
      raw_obj = {'shapes': raw_obj};

    var sprite = new Sprite();
    raw_obj.shapes.forEach(function(raw_shape) {
      var shape = Shape.deserialize(raw_shape);
      sprite.addShape(shape);
    });

    if (raw_obj.sprites) {
      raw_obj.sprites.forEach(function(raw_sprite) {
        var child_sprite = Sprite.deserialize(raw_sprite);
        sprite.addSprite(child_sprite);
      });
    }

    if (raw_obj.offset)
      sprite.setOffset(Point.deserialize(raw_obj.offset));

    return sprite;
  }
})(this);