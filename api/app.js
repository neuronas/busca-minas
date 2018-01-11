const express = require("express"),
      app = express(),
      bodyParser  = require("body-parser"),
      methodOverride = require("method-override"),
      grid = require("./grid"),
      PORT = process.env.PORT || 5000;


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

var router = express.Router();



console.log("process.env:  ", process.env.API_URI)

if (process.env.NODE_ENV === 'dev') {
  
  // if (process.env.NODE_ENV !== 'prod') {
  //   require('dotenv').config()
  // }

  var dotenv = require('dotenv');
  // There's no need to check if .env exists, dotenv will check this // for you. It will show a small warning which can be disabled when // using this in production.
  dotenv.load();

  // cors
  app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
  });
}




router.get('/', function(req, res) {
   res.send("success");
});




router.post('/grid', function(req, result) {
  // console.log("REQ--2", req.body)

  var params = req.body

  var matrix = []

  grid.build(params.sizeX, params.sizeY, function(res){
    matrix = res

    grid.setMines(matrix, function(res2){

      grid.setNumbers(res2, function(res3){
        result.send(JSON.stringify(res3));
      })

    })

  })


});

router.post('/open', function(req, res) {

  var params = req.body
  console.log("OPEN... ", params.posX, params.posY)

  var x = params.posX
  var y = params.posY
  var matrix = JSON.parse(params.matrix)

  grid.open(x, y, matrix, function(res2) {
    
    res.send(JSON.stringify(res2));
    // res.end();
  })

});


app.use(router);

// Middlewar
app.use((req, res) => {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(PORT, function() {
  console.log("Node server running on http://localhost:"+PORT);
});