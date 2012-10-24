function SVGShape(shape) {
  this.shape = shape;
  this.tag = 'polyline';
  this.el = this.createEl();
  this.$el = $(this.el);
  this.update();
}
SVGShape.prototype.update = function update() {
  this.$el.attr('points', this.shape.points.join(' '));
  var style = [
    'fill:' + (this.shape.is_closed ? this.shape.color : 'none'),
    'stroke:' + this.shape.border_color,
    'stroke-width:' + this.shape.border_width
  ];
  this.$el.attr('style', style.join('; '));
};
// pull into shared SVGElement base class
SVGShape.prototype.createEl = function createEl() {
  return document.createElementNS('http://www.w3.org/2000/svg', this.tag);
};