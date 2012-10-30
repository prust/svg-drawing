function Sprite() {
  this.shapes = [];
  this.createNewShape();
  this.current_color;
}
Sprite.prototype.setCurrentColor = function setCurrentColor(color) {
  this.getLastShape().applyColor(color);
  this.current_color = color;
}
Sprite.prototype.addShape = function addShape(shp) {
  this.shapes.push(shp);
}
Sprite.prototype.getShapes = function getShapes() {
  return _(this.shapes).clone();
}
Sprite.prototype.getLastShape = function getLastShape() {
  return _(this.shapes).last();
}
Sprite.prototype.createNewShape = function createNewShape() {
  var shape = new Shape().applyColor(this.current_color);
  this.shapes.push(shape);
  if (this.on_add_shape)
    this.on_add_shape(shape);
}
Sprite.prototype.addPoint = function addPoint(point) {
  var last_shape = this.getLastShape();
  last_shape.addPoint(point);
  if (last_shape.is_closed)
    this.createNewShape();
}
Sprite.prototype.onAddShape = function onAddShape(fn) {
  this.on_add_shape = fn;
}
Sprite.prototype.undoLastPoint = function undoLastPoint() {
  var current_shape = this.getLastShape();

  if (!current_shape.hasPoints()) {
  	this.shapes.pop();
  	current_shape = this.getLastShape();
  }
  current_shape.removeLastPoint();
}
Sprite.prototype.save = function save(sprite_name) {
  localStorage.setItem(sprite_name, JSON.stringify(this));
}
Sprite.prototype.toJSON = function toJSON() {
  return this.shapes;
}