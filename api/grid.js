function build(sizeX, sizeY, cb) {

  var matrix = new Array(sizeX)
  
  for (var i = 0; i < sizeY; i++) {
    matrix[i] = new Array(sizeY)
  }

  cb(matrix)
}
module.exports.build = build;




function setMines(matrix, cb) {

  var sizeX = matrix.length
  var sizeY = matrix[0].length
  
  for (var i = 0; i < sizeX; i++) {
    for (var j = 0; j < sizeY; j++) {
      var rand = Math.random() >= 0.9
      matrix[i][j] = rand
    }
  }

  cb(matrix)
}
module.exports.setMines = setMines;

