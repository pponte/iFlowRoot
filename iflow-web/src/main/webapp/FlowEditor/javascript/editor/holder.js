function initHolderControl() {
  holder = Raphael('holder');
  $("#holder").droppable({
      accept: "*",
      drop: addNewFlowBlock
  });
}
