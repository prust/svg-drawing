function SVGEllipse(ellipse) {
  this.ellipse = ellipse;
  this.tag = 'ellipse';
  this.el = this.createEl();
  this.$el = $(this.el);
  this.update();
  this.ellipse.on('change', function() {
    this.update();
  }.bind(this));
}
SVGEllipse.prototype.update = function update() {
  var ellipse = this.ellipse;
  this.$el.attr('cx', (ellipse.pt1.x + ellipse.pt2.x) / 2);
  this.$el.attr('cy', (ellipse.pt1.y + ellipse.pt2.y) / 2);
  this.$el.attr('rx', Math.abs((ellipse.pt1.x - ellipse.pt2.x) / 2));
  this.$el.attr('ry', Math.abs((ellipse.pt1.y - ellipse.pt2.y) / 2));
  var style = [
    'fill:' + ellipse.color,
    'stroke:' + ellipse.border_color,
    'stroke-width:' + ellipse.border_width
  ];
  this.$el.attr('style', style.join('; '));
};
// pull into shared SVGElement base class
SVGEllipse.prototype.createEl = function createEl() {
  return document.createElementNS('http://www.w3.org/2000/svg', this.tag);
};