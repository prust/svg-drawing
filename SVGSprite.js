function SVGSprite(sprite) {
  this.tag = 'g';
  this.sprite = sprite;
  this.el = this.createEl();
  this.$el = $(this.el);
  this.sprite.getShapes().forEach(function(shp) {
    this.$el.append(new SVGShape(shp).el);
  }.bind(this));
  this.sprite.onAddShape(function(shp) {
  	this.$el.append(new SVGShape(shp).el);
  }.bind(this))
}
SVGSprite.prototype.scale = function scale(new_scale) {
  this.$el.attr('transform', 'scale(' + new_scale + ')');
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