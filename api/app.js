var express = require("express"),
    app = express(),
    bodyParser  = require("body-parser"),
    methodOverride = require("method-override");
    grid = require("./grid");


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

var router = express.Router();

router.get('/', function(req, res) {
   res.send("success");
});


router.get('/grid', function(req, res) {

  var matrix = []

  grid.build(10, 10, function(res){
    console.log("res", res)
    matrix = res

    grid.setMines(matrix, function(res2){
      console.log("res2", res2)
    })

  })


   res.send("grid");
});

router.post('/open', function(req, res) {
   res.send("open");
});


app.use(router);

app.listen(3000, function() {
  console.log("Node server running on http://localhost:3000");
});