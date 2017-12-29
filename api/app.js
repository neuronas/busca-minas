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
  // console.log("REQ--1", req.headers)
  console.log("REQ--2", req.body)

  var params = req.body

  var matrix = []

  grid.build(req.body.sizeX, req.body.sizeY, function(res){
    // console.log("res", res)
    matrix = res

    grid.setMines(matrix, function(res2){
      var res2 = JSON.stringify(res2)
      // console.log("res2", res2)
      result.send(res2);
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