function SVGSprite(sprite) {
  SVGSprite.registry.push(this);
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
  this.sprite.on('ellipse:add', function(ellipse) {
    this.$el.append(new SVGEllipse(ellipse).el);
  }.bind(this));
  this.sprite.sprites.forEach(function(sprite) {
    this.$el.append(new SVGSprite(sprite).el);
  }.bind(this));
  this.sprite.on('sprite:add', function(sprite) {
    this.$el.append(new SVGSprite(sprite).el);
  }.bind(this));
}

// pull into shared SVGElement base class
SVGSprite.prototype.createEl = function createEl() {
  return document.createElementNS('http://www.w3.org/2000/svg', this.tag);
};
SVGSprite.prototype.update = function update() {
  this.$el.attr('transform', 'translate(' + this.sprite.offset + ')')
}
SVGSprite.registry = [];