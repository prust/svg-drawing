$(document).ready(function() {
  var current_shape;

  drawGrid();

  $('svg').on('click', function(evt) {
    if (!current_shape)
      return;

    var svg_position = $('svg').offset();
    var rel_position = {
      'x': evt.pageX - svg_position.left,
      'y': evt.pageY - svg_position.top
    };
    rel_position.x = snap(rel_position.x);
    rel_position.y = snap(rel_position.y);

    var mouse_position = new Point(rel_position.x, rel_position.y);
    current_shape.shape.addPoint(mouse_position);
    current_shape.update();
  });

  function snap(val) {
    return Math.round(val / 20) * 20;
  }

  $('#create_shape').on('click', function() {
    current_shape = new SVGShape(new Shape());
    $('svg').append(current_shape.el);
  });

  $(document).on('keydown', function(evt) {
    if (String.fromCharCode(evt.which).toLowerCase() == 'z' && evt.ctrlKey) {
      if (current_shape) {
        current_shape.shape.removeLastPoint();
        current_shape.update();
      }
      evt.preventDefault();
      return false;
    }
    else {
      return true;
    }
  });

  function drawGrid() {
    

    var start_point = new Point(60, 60);
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