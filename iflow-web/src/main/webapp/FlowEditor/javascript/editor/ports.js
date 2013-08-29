var  PORT_IN_ATTR = {"z-index": "3", fill: "#aaa", stroke: "none"};
var  PORT_IN_ATTR_HOVER = {fill: "#a17", stroke: "none"};
var  PORT_OUT_ATTR = {"z-index": "1", fill: "#333", stroke: "none"};
var  PORT_OUT_ATTR_HOVER = {fill: "#17a", stroke: "none"};
var  PORT_SIZE = 3;
var  PORT_SHADOW_SIZE = 7;
var  PORT_SHADOW_ATTR_SHOW = {opacity: "10", r: PORT_SHADOW_SIZE};
var  PORT_SHADOW_ATTR_HIDE = {opacity: "0", r: PORT_SHADOW_SIZE};
var TRASHHOLD_DISTANTE_DROP = 10;

var portMoving = null;
var portDest = null;

//Port In
function addNewInPort(block, inPort, left, top) {
  var x = inPort[0] + left;
  var y = inPort[1] + top;
  var pIn = holder.circle(x, y, PORT_SIZE).attr(PORT_IN_ATTR);
  pIn.portOrig = holder.set();
  pIn.move = emptyFunction;
  pIn.moveWith = portInMoveWith;
  pIn.portShadow = newPortShadow(pIn, x, y, portInHoverIn, portInHoverOut);
  block.push(pIn);
}

function portInMoveWith(X, Y) {
  this.attr({cx: this.attr('cx') + X, cy: this.attr('cy') + Y});
  for (var i=0; i<this.portOrig.length; i++) {
    this.portOrig[i].moveWith(X, Y);
  }
  setPortShadowPosition(this);
}

function portInHoverIn() {
  if (portMoving != null) {
    this.attr(PORT_SHADOW_ATTR_SHOW);
    this.port.hide();
    portDest = this.port;
  } else if (this.port && this.port.portOrig && this.port.portOrig.length > 0) {
    this.port.portOrig[0].portShadow.toFront();
    this.port.portOrig[0].portShadow.hoverIn();
  }
}

function portInHoverOut() {
  this.attr(PORT_SHADOW_ATTR_HIDE);
  this.port.show();
  if (portMoving != null) {
  } else if (this.port && this.port.portOrig && this.port.portOrig.length > 0) {
    this.port.portOrig[0].portShadow.hoverOut();
  }
}

//Port Out
function addNewOutPort(block, outPort, left, top) {
  var x = outPort[0] + left;
  var y = outPort[1] + top;
  
  var path = [["M", x, y], ["L", x, y]];
  var line = holder.path(path).attr(LINE_ATTR);

  var pOutOrig = holder.circle(x, y, PORT_SIZE).attr(PORT_IN_ATTR);
  pOutOrig.moveWith = portOutOrigMoveWith;
  pOutOrig.move = emptyFunction;
  pOutOrig.line = line;
  block.push(pOutOrig);
  
  var pOutDest = holder.circle(x, y, PORT_SIZE).attr(PORT_OUT_ATTR);
  pOutDest.moveWith = portOutDestMoveWith;
  pOutDest.move = portOutDestMove;
  pOutDest.setMovingPort = portOutDestSetMovingPort; 
  pOutDest.line = line;
  pOutDest.portShadow = newPortShadow(pOutDest, x, y, portOutHoverIn, portOutHoverOut);
  block.push(pOutDest);
}


function portOutOrigMoveWith(X, Y) {
  X = this.attr('cx') + X;
  Y = this.attr('cy') + Y;
  this.attr({cx: X, cy: Y});
  setLineOrig(this.line, X, Y);
}


function portOutDestMoveWith(X, Y) {
  if (this.portDest) {
    X = this.portDest.attr('cx');
    Y = this.portDest.attr('cy');
  } else {
    X = this.attr('cx') + X;
    Y = this.attr('cy') + Y;
  }
  this.attr({cx: X, cy: Y});
  setPortShadowPosition(this);
  setLineDest(this.line, X, Y);
}


function portOutDestMove(dx, dy) {
  var X = this.attr('cx') + (dx - (this.dx || 0));
  var Y = this.attr('cy') + (dy - (this.dy || 0));
  this.attr({cx: X, cy: Y});
  this.dx = dx; 
  this.dy = dy;
  setLineDest(this.line, X, Y);
}


function portOutDestSetMovingPort(enter) {
  if (enter) {
    portMoving = this;
    if (this.portDest) this.portDest.portOrig.exclude(this);
    this.portDest = null;
  } else {
    portMoving = null;
    if (portDest && 
        this.attr('cx') - portDest.attr('cx') < TRASHHOLD_DISTANTE_DROP &&
        portDest.attr('cx') - this.attr('cx') < TRASHHOLD_DISTANTE_DROP &&
        this.attr('cy') - portDest.attr('cy') < TRASHHOLD_DISTANTE_DROP &&
        portDest.attr('cy') - this.attr('cy') < TRASHHOLD_DISTANTE_DROP) {
      this.portDest = portDest;
      this.portDest.portShadow.hoverOut();
      portDest.portOrig.push(this);
      this.moveWith(0, 0);
    }
  }
}

function portOutHoverIn() {
  if (portMoving != null) { 
    if (this.port.portDest) this.port.portDest.portShadow.hoverIn();
  } else {
    this.attr(PORT_SHADOW_ATTR_SHOW);
    this.port.hide();
  }
}

function portOutHoverOut() {
  this.attr(PORT_SHADOW_ATTR_HIDE);
  this.port.show();
  if (portMoving != null && this.port.portDest) { 
    this.port.portDest.portShadow.hoverOut();
  } 
}

//Port Shadow

//Port Shadow
function newPortShadow(port, x, y, portHoverIn, portHoverOut) {
  var pShadow = holder.circle(x, y, PORT_SHADOW_SIZE).attr(port.attr());
  pShadow.attr({"z-index": "3"});
  pShadow.hover(portHoverIn, portHoverOut);
  pShadow.hoverIn = portHoverIn;
  pShadow.hoverOut = portHoverOut;
  pShadow.port = port;
  pShadow.drag(moveShadow, upShadow, downShadow);
  return pShadow;
}

function moveShadow(dx, dy) {
  this.port.move(dx, dy);
}

function upShadow() {
  this.port.dx = this.port.dy = 0;
  this.port.setMovingPort(true);
  this.port.toBack();
}

function downShadow() {
  this.port.dx = this.port.dy = 0;
  this.port.setMovingPort(false);
  setPortShadowPosition(this.port);
  this.port.toFront();
}

function setPortShadowPosition(obj){
  obj.portShadow.attr({cx: obj.attr('cx'), cy: obj.attr('cy')});
}
