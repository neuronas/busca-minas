var express = require("express"),
    app = express(),
    bodyParser  = require("body-parser"),
    methodOverride = require("method-override");
    grid = require("./grid");


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

var router = express.Router();


app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});




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
   res.send("open");
});


app.use(router);

app.listen(3000, function() {
  console.log("Node server running on http://localhost:3000");
});