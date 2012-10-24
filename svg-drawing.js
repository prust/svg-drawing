$(document).ready(function() {
  var current_shape;

  attachEventHandlers();
  drawGrid();
  createNewShape();

  function attachEventHandlers() {
    $('svg').on('click', function(evt) {
      addPointToCurrentShape(getPointFromEvent(evt));
    });

    $(document).on('keydown', function(evt) {
      if (isCtrlZ(evt))
        undoLastPoint();
    });

    $('#create_shape').on('click', createNewShape);
  }

  function addPointToCurrentShape(point) {
    if (!current_shape)
      return;
    current_shape.shape.addPoint(point);
    current_shape.update();
  }

  function getPointFromEvent(evt) {
    var point = new Point(evt.pageX, evt.pageY);
    point = makePointRelativeToElement(point, $('svg'));
    return snapPoint(point);
  }

  function makePointRelativeToElement(point, $el) {
    var el_offset = $el.offset();
    return new Point(point.x - el_offset.left, point.y - el_offset.top);
  }

  function snapPoint(point) {
    return new Point(snap(point.x), snap(point.y));
  }

  function snap(val) {
    return Math.round(val / 20) * 20;
  }

  function createNewShape() {
    current_shape = new SVGShape(new Shape());
    $('svg').append(current_shape.el);
  }

  function isCtrlZ(evt) {
    return String.fromCharCode(evt.which).toLowerCase() == 'z' && evt.ctrlKey;
  }

  function undoLastPoint() {
    if (current_shape) {
      current_shape.shape.removeLastPoint();
      current_shape.update();
    }
  }

  function drawGrid() {
    var start_point = new Point(20, 20);
    var horiz_line = Line.createHorizontal(start_point, 500).color('lightGrey');
    var lines = repeatLine(horiz_line, 'Down');
    var vert_line = Line.createVertical(start_point, 500).color('lightGrey');
    lines = lines.concat(repeatLine(vert_line, 'Right'));
    
    lines.forEach(function(line) {
      $('svg').append(new SVGLine(line).update().el);
    });
  }

  function repeatLine(line_template, direction) {
    var method_name = 'move' + direction;
    var range = _.range(0, 501, 20);
    return _(range).map(function(distance) {
      return line_template.clone()[method_name](distance);
    });
  }
});