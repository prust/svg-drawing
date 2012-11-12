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
Point.prototype.diff = function diff(other_point) {
  return new Point(this.x - other_point.x, this.y - other_point.y);
};
Point.prototype.add = function add(other_point) {
  this.x += other_point.x;
  this.y += other_point.y;
  return this;
};
Point.prototype.scale = function scale(scale) {
  this.x *= scale;
  this.y *= scale;
};
Point.prototype.snap = function snap() {
  this.x = snap(this.x);
  this.y = snap(this.y);

  function snap(val) {
    return Math.round(val / 20) * 20;
  }
  return this;
};
Point.prototype.toJSON = function toJSON() {
  return {
  	'x': this.x,
  	'y': this.y
  }
};