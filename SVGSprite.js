function SVGSprite(sprite) {
  this.dragging = false;
  this.start_point = null;
  this.offset = new Point(0, 0);
  this.scale = 1;

  this.tag = 'g';
  this.sprite = sprite;
  this.el = this.createEl();
  this.$el = $(this.el);

  this.sprite.getShapes().forEach(function(shp) {
    this.$el.append(new SVGShape(shp).el);
  }.bind(this));
  this.sprite.onAddShape(function(shp) {
  	this.$el.append(new SVGShape(shp).el);
  }.bind(this));
  this.$el.on('mousedown', function(evt) {
    this.dragging = true;
    this.start_point = new Point(evt.pageX, evt.pageY).diff(this.offset);
  }.bind(this));
  this.$el.on('mousemove', function(evt) {
    if (this.dragging && this.start_point) {
      var current_pos = new Point(evt.pageX, evt.pageY);
      var pos_diff = current_pos.diff(this.start_point);
      pos_diff.snap();

      this.offset = pos_diff;
      this.update();
    }
  }.bind(this));
  this.$el.on('mouseup', function(evt) {
    this.dragging = false;
    this.start_point = null;
    
    evt.stopPropagation();
  }.bind(this));
}
SVGSprite.prototype.jump = function jump() {
  var start_time = new Date().getTime();
  var start_value = this.offset.y;
  delta_value = -60;
  duration = 500;
  var easing = Easing.easeOutQuad.bind(null, start_value, delta_value, duration);
  var interval_id = setInterval(function() {
    var delta_time = new Date().getTime() - start_time;
    var val = easing(delta_time);
    this.offset.y = val;
    this.update();

    if (delta_time >= 500)
      clearInterval(interval_id);
  }.bind(this));

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
      this.update();

      if (delta_time >= 500)
        clearInterval(interval_id);
    }.bind(this));
  }.bind(this), 500)
};
SVGSprite.prototype.goRight = function goRight() {
  this.offset.x += 5;
  this.update();
};
SVGSprite.prototype.goLeft = function goLeft() {
  this.offset.x -= 5;
  this.update();
};
SVGSprite.prototype.scale = function scale(new_scale) {
  this.scale = new_scale;
  this.update();
}
// pull into shared SVGElement base class
SVGSprite.prototype.createEl = function createEl() {
  return document.createElementNS('http://www.w3.org/2000/svg', this.tag);
};
SVGSprite.prototype.addPoint = function addPoint(point) {
  this.sprite.addPoint(point);
}
SVGSprite.prototype.setCurrentColor = function setCurrentColor(color) {
  this.sprite.setCurrentColor(color);
}
SVGSprite.prototype.update = function update() {
  this.$el.attr('transform', 'scale(' + this.scale + ') translate(' + this.offset + ')')
}