var DIST_MIN_FROM_PORT = 20;
var BLOCK_OUTTER_WIDTH = 110;
var BLOCK_OUTTER_HEIGHT = 30;
var CURVE_DIST = 10;

var LINE_ATTR = {stroke: "#888" || Raphael.getColor(), "stroke-width": 2, "stroke-linecap": "round"};

function setLineOrig(line, x, y) {
  redrawLine(line, x, y, null, null);
}

function setLineDest(line, x, y) {
  redrawLine(line, null, null, x, y);
}

function redrawLine(line, ax, ay, bx, by) {
  var path = line.attr('path');
  var n = path.length - 1;
  if (ax == null) 
    ax = path[0][1];
  if (ay == null) 
    ay = path[0][2];
  if (bx == null) 
    bx = path[n][1];
  if (by == null) 
    by = path[n][2];

  var ax1 = ax + DIST_MIN_FROM_PORT;
  var bx1 = bx - DIST_MIN_FROM_PORT;

  var curve = CURVE_DIST;
  var kx = Math.abs(bx1 - ax1);
  var ky = Math.abs(by - ay);
  
  ky = (ky - (ky % 2)) / 2;
  kx = (kx - (kx % 2)) / 2;
  
  if (curve > ky) curve = ky;
  if (curve > kx) curve = kx;
  
  var dy = (ay > by) ? -1 : 1;
  if (ax1 > bx1 && Math.abs(by - ay) > BLOCK_OUTTER_HEIGHT) {
      var r1 = (ay > by) ? 0 : 1;
      var r2 = (ay > by) ? 1 : 0;
      var v = (by - ay);
      var z = ay + ((v - (v % 2)) / 2);
      path = [["M", ax, ay], 
              ["L", ax1 - curve, ay], 
              ["a", curve, curve, 0, 0, r1, curve, dy * curve], 
              ["L", ax1, z - (dy * curve)], 
              ["a", curve, curve, 0, 0, r1, -curve, dy * curve], 
              ["L", bx1 + curve, z], 
              ["a", curve, curve, 0, 0, r2, -curve, dy * curve], 
              ["L", bx1, by - (dy * curve)], 
              ["a", curve, curve, 0, 0, r2, curve, dy * curve], 
              ["L", bx, by]];
  } else if ((ax1 > bx1) && (bx1 < ax1 - BLOCK_OUTTER_WIDTH)) {
    var z = ay + (dy * BLOCK_OUTTER_HEIGHT);
    var r1 = (ay > by) ? 0 : 1;
    var curve2 = Math.abs(by - z); 
    curve2 = (curve2 - (curve2 % 2)) / 2;
    if (curve2 > curve) curve2 = curve;
    path = [["M", ax, ay], 
            ["L", ax1 - curve, ay], 
            ["a", curve, curve, 0, 0, r1, curve, dy * curve], 
            ["L", ax1, z - (dy * curve)], 
            ["a", curve, curve, 0, 0, r1, -curve, dy * curve], 
            ["L", bx1 + curve2, z], 
            ["a", curve2, curve2, 0, 0, r1, -curve2, - dy * curve2], 
            ["L", bx1, by + (dy * curve2)], 
            ["a", curve2, curve2, 0, 0, r1, curve2, - dy * curve2], 
            ["L", bx, by]];
  } else {
    var dx = (ax > bx) ? -1 : 1;
    var v = (bx - ax);
    var z = ax + ((v - (v % 2)) / 2);
    var r1 = (ay > by) ? (ax > bx ? 1 : 0) : (ax > bx ? 0 : 1);
    var r2 = (ay > by) ? (ax > bx ? 0 : 1) : (ax > bx ? 1 : 0);
    path = [["M", ax, ay], 
            ["L", z - (dx * curve), ay], 
            ["a", curve, curve, 0, 0, r1, dx * curve, dy * curve], 
            ["L", z, by - (dy * curve)], 
            ["a", curve, curve, 0, 0, r2, dx * curve, dy * curve], 
            ["L", bx, by]];
  }
  
  line.attr({path: path});
}

function moveLine(dx, dy) {
  this.update(dx - (this.dx || 0), dy - (this.dy || 0));
  this.dx = dx;
  this.dy = dy;
}

function upLine() {
  this.dx = this.dy = 0;
}
