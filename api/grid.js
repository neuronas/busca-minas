function build(sizeX, sizeY, cb) {

  var matrix = new Array(sizeX)
  
  for (var i = 0; i < sizeX; i++) {
    matrix[i] = new Array(parseFloat(sizeY))
  }

  cb(matrix)
}
module.exports.build = build;

function setMines(matrix, cb) {

  var x = matrix.length
  var y = matrix[0].length
  
  for (var i = 0; i < x; i++) {
    for (var j = 0; j < y; j++) {
      var rand = Math.random() >= 0.9
      matrix[i][j] = rand == true ? -1 : 0 
    }
  }

  cb(matrix)
}
module.exports.setMines = setMines;

function setNumbers(matrix, cb) {

  var x = matrix.length
  var y = matrix[0].length

  for (var i = 0; i < x; i++) {
    for (var j = 0; j < y; j++) {
      if (matrix[i][j] == 0) {
        for (var e=-1; e<=1; e++) {
          for (var f=-1; f<=1; f++) {
            var posX = parseFloat(i)+parseFloat(e);
            var posY = parseFloat(j)+parseFloat(f);
            if (!(e == 0 && f == 0) && typeof matrix[posX] !== 'undefined' && typeof matrix[posX][posY] !== 'undefined') {
              if (matrix[posX][posY] == -1) {
                matrix[i][j]++
              }
            }
          }
        }

      }
    }
  }

  cb(matrix)
}
module.exports.setNumbers = setNumbers;
