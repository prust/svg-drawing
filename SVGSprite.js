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