$(document).ready(function() {
  
  drawGrid();

  var sprite = new Sprite();
  var svg_sprite = new SVGSprite(sprite);
  $('svg').append(svg_sprite.el);
  
  populateColorPicker();
  changeColor();
  populateSpritePicker();

  attachEventHandlers();

  var left_interval_id;
  var right_interval_id;
  
  function attachEventHandlers() {
    $('svg').on('mouseup', function(evt) {
      var point = getPointFromEvent(evt);
      if (point.y >= 20)
        sprite.addPoint(point);
    });

    $(document).on('keydown', function(evt) {
      if (isCtrlZ(evt))
        sprite.undoLastPoint();
      if (isSpace(evt)) {
        evt.preventDefault();
        sprite.jump();
      }
      if (isRight(evt) && !right_interval_id)
        right_interval_id = setInterval(sprite.goRight.bind(sprite), 40);
      if (isLeft(evt) && !left_interval_id)
        left_interval_id = setInterval(sprite.goLeft.bind(sprite), 40);
    });
    $(document).on('keyup', function(evt) {
      if (isRight(evt)) {
        clearInterval(right_interval_id);
        right_interval_id = null;
      }
      else if (isLeft(evt)) {
        clearInterval(left_interval_id);
        left_interval_id = null;
      }
    });
    $('#undo').on('click', function() {
      sprite.undoLastPoint();
    });

    $('#colors').on('change', changeColor);
    $('#colors').on('click', function(evt) {
      return false;
    });
    $('#save_sprite').on('click', function() {
      $('#save_details').show();
      $('#sprite_name').val('');
      $('#sprite_name').focus();
    });
    $('#save_ok').on('click', function() {
      sprite.save($('#sprite_name').val());
      $('#save_details').hide();
    });
    $('#place_sprite').on('click', function() {
      var sprite_name = $('#sprites').val();
      var placed_sprite = Sprite.deserialize(JSON.parse(localStorage.getItem(sprite_name)));
      placed_sprite.scale(parseFloat($('#placement_size').val()));
      sprite.addSprite(placed_sprite);
    });
  }

  function getPointFromEvent(evt) {
    var point = new Point(evt.pageX, evt.pageY);
    point = makePointRelativeToElement(point, $('#svg_wrapper'));
    return point.snap();
  }

  function makePointRelativeToElement(point, $el) {
    var el_offset = $el.offset();
    return new Point(point.x - el_offset.left, point.y - el_offset.top);
  }

  function isCtrlZ(evt) {
    return String.fromCharCode(evt.which).toLowerCase() == 'z' && evt.ctrlKey;
  }
  function isSpace(evt) {
    return String.fromCharCode(evt.which) == ' ';
  }
  function isRight(evt) {
    return evt.keyCode == 39;
  }
  function isLeft(evt) {
    return evt.keyCode == 37;
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
    var colors = ['Blue', 'Cyan', 'GoldenRod', 'Grey', 'Green', 'Khaki', 'Magenta', 'Orange', 'Orchid', 'Red', 'Salmon', 'SeaGreen', 'SlateBlue', 'SlateGrey', 'Turquoise', 'Violet', 'Brown', 'Black'];
    populateSelect($('#colors'), colors);
  }
  function populateSpritePicker() {
    var sprite_names = getSpriteNames();
    populateSelect($('#sprites'), sprite_names);
  }
  function populateSelect($el, options) {
    options.forEach(function(opt) {
      $el.append($('<option>').text(opt));
    });
  }
  function getSpriteNames() {
    return _.range(localStorage.length).map(function(sprite_ix) {
      return localStorage.key(sprite_ix);
    });
  }

  function changeColor() {
    sprite.setCurrentColor($('#colors').val());
  }
});