function SVGLine(line) {
  this.line = line;
  this.tag = 'line';

  // pull into shared base class
  this.el = this.createEl();
  this.$el = $(this.el);
}
SVGLine.prototype.update = function update() {
  this.$el.attr('x1', this.line.point1.x);
  this.$el.attr('y1', this.line.point1.y);
  this.$el.attr('x2', this.line.point2.x);
  this.$el.attr('y2', this.line.point2.y);
  var style = [
    'stroke:' + this.line._color,
    'stroke-width:' + this.line.width()
  ];
  this.$el.attr('style', style.join('; '));
  return this;
}
// pull into shared SVGElement base class
SVGLine.prototype.createEl = function createEl() {
  return document.createElementNS('http://www.w3.org/2000/svg', this.tag);
};