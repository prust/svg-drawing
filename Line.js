function Line(point1, point2) {
  this.point1 = point1;
  this.point2 = point2;
  this._color = 'black';
  this._width = 1;
}
Line.prototype.color = function color(new_color) {
  this._color = new_color;
  return this;
};
Line.prototype.width = function width(new_width) {
  this._width = new_width;
  return this;
};
Line.prototype.clone = function clone() {
  return new Line(this.point1.clone(), this.point2.clone()).color(this._color).width(this._width);
};
Line.prototype.moveDown = function moveDown(distance) {
  this.point1.y += distance;
  this.point2.y += distance;
  return this;
};
Line.prototype.moveRight = function moveRight(distance) {
  this.point1.x += distance;
  this.point2.x += distance;
  return this;
};
Line.createHorizontal = function createHorizontal(point1, distance) {
  return new Line(point1, new Point(point1.x + distance, point1.y));
};
Line.createVertical = function createVertical(point1, distance) {
  return new Line(point1, new Point(point1.x, point1.y + distance));
};