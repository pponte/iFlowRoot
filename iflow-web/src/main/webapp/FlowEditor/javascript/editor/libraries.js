var lstLibrariesBlocks = [];

function iniLibrariesControl() {
  addNewBlockToLibrary('bloco1', '', 'tmp/block.png');
  addNewBlockToLibrary('bloco2', '', 'tmp/block.png');
}

function addNewBlockToLibrary(blockName, library, imgUrl) {
  var newLibBlock = getNewLibraryBlockString(blockName, imgUrl);
  var aux = $('#lastLine').replaceWith(newLibBlock);
  $('#' + blockName).draggable({
    addClasses: false,
    appendTo: $('#holder'),
    grid: [1, 1],
    helper: "clone",
    opacity: 0.75,
    refreshPositions: true,
    scroll: true,
    scrollSensitivity: 100,
    scrollSpeed: 100,
  });
  lstLibrariesBlocks[lstLibrariesBlocks.length] = blockName;
}
