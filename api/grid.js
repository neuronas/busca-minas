var _ = require('lodash')


var layer = []
var calls = 0
var done = 0


function build(sizeX, sizeY, cb) {

  var matrix = new Array(sizeX)
  
  for (var i = 0; i < sizeX; i++) {
    matrix[i] = new Array(parseFloat(sizeY))
  }

  cb(matrix)
}
module.exports.build = build;



function setMines(matrix, cb) {

  iterate(matrix, function(x, y) {
    var rand = Math.random() >= 0.8
    matrix[x][y] = rand == true ? -1 : 0 
  })

  layer = _.cloneDeep(matrix)
  // console.log("MAT", matrix)
  // console.log("LAY", layer)

  cb(matrix)
}
module.exports.setMines = setMines;



function setNumbers(matrix, cb) {

  iterate(matrix, function(x, y) {
    if (matrix[x][y] == 0) {
      adjacent(x, y, matrix, function(posX, posY) {
        if (matrix[posX][posY] == -1) {
          matrix[x][y]++
        }
      })
    }
  })

  //   console.log("MAT", matrix)
  // console.log("LAY", layer)

  cb(matrix)
}
module.exports.setNumbers = setNumbers;




function open(x, y, matrix, cb) {

  recursive(x, y, matrix, function(data) {
    cb(data)
  })

}
module.exports.open = open






function iterate(matrix, cb) {
  var x = matrix.length
  var y = matrix[0].length
  for (var i = 0; i < x; i++) {
    for (var j = 0; j < y; j++) {
      cb(i, j)
    }
  }
}

function adjacent(x, y, matrix, cb) {
  for (var e=-1; e<=1; e++) {
    for (var f=-1; f<=1; f++) {
      var posX = parseFloat(x)+parseFloat(e);
      var posY = parseFloat(y)+parseFloat(f);
      if (!(e == 0 && f == 0) && typeof matrix[posX] !== 'undefined' && typeof matrix[posX][posY] !== 'undefined') {
        cb(posX, posY)
      }
    }
  }
}

function recursive(x, y, matrix, cb) {
  // if (!first) first = false
  calls++
  console.log("RECCC", x, y, calls)

  if (matrix[x][y] == -1) {
    // LOSSE, SHOW ALL MINES
    iterate(matrix, function(x, y) {
      if (matrix[x][y] == -1) {
        layer[x][y] = 'mine'
      }
      // console.log("                          ======     FINISH")
      // console.log("LAYER", layer)
    })
    done++
    cb(layer)
  } else if (matrix[x][y] >= 1) {
    // SHOW THIS POSITION
    layer[x][y] = true
    done++
    if (calls == done) {
      console.log("                          ======     FINISH", calls == done, calls, done)
      console.log("LAYER", layer)
      cb(layer)
    }
  } else {
    // OPEN ADJACENT POSITIONS
    layer[x][y] = true
    adjacent(x, y, matrix, function(posX, posY) {
      if (matrix[posX][posY] >= 0 && layer[posX][posY] != true) {
        recursive(posX, posY, matrix)
      }
    })

    done++
    console.log("debug", calls == done, calls, done)
    if (calls == done) {
      // console.log("                          ======     FINISH", calls == done, calls, done)
      // console.log("LAYER", layer)
      cb(layer)
    }

  }

}
