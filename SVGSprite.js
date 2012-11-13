function SVGSprite(sprite) {
  this.dragging = false;
  this.start_point = null;

  this.tag = 'g';
  this.sprite = sprite;
  this.el = this.createEl();
  this.$el = $(this.el);
  this.update();

  this.sprite.on('change', function() {
    this.update();
  }.bind(this));

  this.sprite.getShapes().forEach(function(shp) {
    this.$el.append(new SVGShape(shp).el);
  }.bind(this));
  this.sprite.on('shape:add', function(shp) {
  	this.$el.append(new SVGShape(shp).el);
  }.bind(this));
  this.sprite.sprites.forEach(function(sprite) {
    this.$el.append(new SVGSprite(sprite).el);
  }.bind(this));
  this.sprite.on('sprite:add', function(sprite) {
    this.$el.append(new SVGSprite(sprite).el);
  }.bind(this));

  this.$el.on('mousedown', function(evt) {
    evt.stopPropagation();
    this.dragging = true;
    this.start_point = new Point(evt.pageX, evt.pageY).diff(this.sprite.offset);
  }.bind(this));
  this.$el.on('mousemove', function(evt) {
    evt.stopPropagation();
    if (this.dragging && this.start_point) {
      var current_pos = new Point(evt.pageX, evt.pageY);
      var pos_diff = current_pos.diff(this.start_point);
      pos_diff.snap();

      this.sprite.offset.x = pos_diff.x;
      this.sprite.offset.y = pos_diff.y;
    }
  }.bind(this));
  this.$el.on('mouseup', function(evt) {
    this.dragging = false;
    this.start_point = null;
    
    evt.stopPropagation();
  }.bind(this));
}

// pull into shared SVGElement base class
SVGSprite.prototype.createEl = function createEl() {
  return document.createElementNS('http://www.w3.org/2000/svg', this.tag);
};
SVGSprite.prototype.update = function update() {
  this.$el.attr('transform', 'translate(' + this.sprite.offset + ')')
}