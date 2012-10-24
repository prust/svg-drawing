function Shape() {
  this.points = [];
  this.color = 'red';
  this.border_color = 'black';
  this.border_width = 2;
  this.is_closed = false;
}
Shape.prototype.addPoint = function addPoint(point) {
  if (point.isEqual(this.firstPoint()))
    this.is_closed = true;
  this.points.push(point);
}
Shape.prototype.firstPoint = function firstPoint() {
  return this.points[0];
}
Shape.prototype.removeLastPoint = function removeLastPoint() {
  this.points.pop();
}