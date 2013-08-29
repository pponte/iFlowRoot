var BLOCK_WIDTH = 70;
var BLOCK_HEIGHT = 40;
var blockId = 0;
var BLOCK = "block";

function getNewBlockId() {
  return BLOCK + (++blockId);
}

function getNewLibraryBlockString(blockName, imgUrl) {
  var str = '<tr><td style="height:' + (BLOCK_HEIGHT + 10) + 'px">';
  str += '<img id="' + blockName + '" name="' + blockName + '" alt="' + blockName + '" src="' + imgUrl + '" ';
  str += 'style="position:relative; left:55px; top:2px; width:' + BLOCK_WIDTH + 'px; height:' + BLOCK_HEIGHT + 'px">';
  str += '</td></tr><tr id="lastLine"><td>&nbsp;</td></tr>';
  return str;
}

function addNewFlowBlock(event, ui) {
  var srcImg = ui.helper[0].attributes['src'].value;
  var left = ui.position.left;
  var top = ui.position.top;

  //FROM SERVER
  var inPorts = [[-3, 20]]; 
  var outPorts = [[70, 20]]; 
  
  var block = holder.set();
  //Block Image
  addNewBlockImage(block, srcImg, left, top);
  //In Ports
  if (inPorts != null) {
    for (var i=0; i<inPorts.length; i++) {
      addNewInPort(block, inPorts[i], left, top);
    }
  }
  //Out Ports
  if (outPorts != null) {
    for (var i=0; i<outPorts.length; i++) {
      addNewOutPort(block, outPorts[i], left, top);
    }
  }
}
  
function addNewBlockImage(block, srcImg, left, top) {
  var img = holder.image(srcImg, left, top, BLOCK_WIDTH, BLOCK_HEIGHT);
  id = getNewBlockId();
  img.id = id;
  img.move = imgMove;
  img.block = block;
  img.hover(emptyFunction, emptyFunction);
  img.drag(moveBlock, upBlock, downBlock);
  block.push(img);
}

function imgMove(dx, dy) {
  var _dx = dx - (this.dx || 0);
  var _dy = dy - (this.dy || 0);
  var X = this.attr('x') + _dx;
  var Y = this.attr('y') + _dy;
  var x = snapToGrid(X);
  var y = snapToGrid(Y);
  _dx += x - X;
  _dy += y - Y;
  dx += x - X;
  dy += y - Y;
  for (var i=1; i<this.block.length; i++) {
    this.block[i].moveWith(x-this.attr('x'), y-this.attr('y'));
  }
  this.attr({x: x, y: y});
  this.dx = dx; 
  this.dy = dy;
}

function moveBlock(dx, dy) {
  this.move(dx, dy);
}

function upBlock() {
  this.dx = this.dy = 0;
}

function downBlock() {
  this.dx = this.dy = 0;
}
