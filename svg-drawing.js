$(document).ready(function() {
  var current_shape;

  populateColorPicker();
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

    $('#colors').on('change', applyColors);
  }

  function addPointToCurrentShape(point) {
    if (!current_shape)
      return;
    current_shape.shape.addPoint(point);
    current_shape.update();
    
    if (current_shape.shape.is_closed)
      createNewShape();
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
    applyColors();
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

  function populateColorPicker() {
    // all the HTML colors that support a 'Dark' prefix
    var colors = ['Blue', 'Cyan', 'GoldenRod', 'Grey', 'Green', 'Khaki', 'Magenta', 'OliveGreen', 'Orange', 'Orchid', 'Red', 'Salmon', 'SeaGreen', 'SlateBlue', 'SlateGrey', 'Turquoise', 'Violet'];
    colors.forEach(function(color) {
      $('#colors').append($('<option>').text(color));
    });    
  }

  function applyColors() {
    var color = getColor();
    var dark_color = 'Dark' + color;

    // for some reason, Grey is darker than DarkGrey
    if (color == 'Grey') {
      dark_color = getColor();
      color = 'Dark' + color;
    }
    
    current_shape.shape.color = color;
    current_shape.shape.border_color = dark_color;
    current_shape.update();
  }

  function getColor() {
    return $('#colors').val();
  }
});