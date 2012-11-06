(function() {
  // from Robert Penner's Easing Equations (http://gizma.com/easing/)
  window.Easing = {
  	// t: current time
  	// b: start value
  	// c: change in value
  	// d: duration

  	// decelerating to zero velocity
    'easeOutQuad': function easeOutQuad(b, c, d, t) {
      t /= d;
      return -c * t*(t-2) + b;
    },
    // accelerating from zero velocity
    'easeInQuad': function easeInQuad(b, c, d, t) {
      t /= d;
      return c*t*t + b;
    }
  };
})();