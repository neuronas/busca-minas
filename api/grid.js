function build(sizeX, sizeY, cb) {

  var matrix = new Array(sizeX)
  
  for (var i = 0; i < sizeY; i++) {
    matrix[i] = new Array(sizeY)
  }

  cb(matrix)
}



module.exports.build = build;