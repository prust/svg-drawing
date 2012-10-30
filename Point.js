function Point(x, y) {
  this.x = x;
  this.y = y;
}
Point.deserialize = function deserialize(raw_point) {
  return new Point(raw_point.x, raw_point.y);
};
Point.prototype.toString = function toString() {
  return this.x + ',' + this.y;
};
Point.prototype.isEqual = function isEqual(point) {
  if (!point)
    return false;
  return this.x == point.x && this.y == point.y;
};
Point.prototype.clone = function clone() {
  return new Point(this.x, this.y);
};
Point.prototype.toJSON = function toJSON() {
  return {
  	'x': this.x,
  	'y': this.y
  }
};