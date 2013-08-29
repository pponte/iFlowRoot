var MAX_GRID_STEP = 300; 
var MIN_GRID_STEP = 1; 

function iniGridStepControl() {
  gridStepCtrl = $("#gridstep").spinner({
    spin: SpinGrid 
  });
  gridStepCtrl.spinner('value', 1);  
}

function getGridStep() {
  return gridStepCtrl.spinner('value');
}

function SpinGrid(event, ui) {
  if (isNaN(ui.value) || ui.value < MIN_GRID_STEP) {
    $(this).spinner("value", MIN_GRID_STEP);
    return false;
  } else if (ui.value > MAX_GRID_STEP) {
    $(this).spinner("value", MAX_GRID_STEP);
    return false;
  }
  applyGridStep();
}

function applyGridLimits(ui) {
  if (isNaN(ui.value) || ui.value < MIN_GRID_STEP) {
    $("#gridstep").spinner("value", MIN_GRID_STEP);
  } else if (ui.value > MAX_GRID_STEP) {
    $("#gridstep").spinner("value", MAX_GRID_STEP);
  }
}

function snapToGrid(value) {
  gridStep = getGridStep();
  var mid = gridStep / 2;
  var rem = value % gridStep;
  if (isNaN(rem)) return value;
  if (rem < mid) {
    return value - rem;
  } else {
    return value - rem + gridStep;
  }
}

function applyGridStep() {
  for (var i = 0; i < lstLibrariesBlocks.length; i++) {
    $('#' + lstLibrariesBlocks[i]).draggable("option", "grid", [getGridStep(), getGridStep()]);
  }   
}