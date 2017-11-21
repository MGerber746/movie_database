
var express = require("express");
var app = express();
var router = express.Router();
var path = __dirname + "/templates";
var mysql = require("mysql");


router.use(function(req,res,next){
  console.log("/" + req.method);
  next();
});

router.get("/", function(req,res){
  res.sendFile(path + "/Movie.html");
});
router.get("/review", function(req,res){
  res.sendFile(path + "/review.html");
});
router.get("/ticket", function(req,res){
  res.sendFile(path + "/ticket.html");
});
router.get("/movieticket", function(req,res){
  res.sendFile(path + "/movieticket.html");
});
router.get("/freshpotatoes", function(req,res){
  res.sendFile(path + "/freshpotatoes.png");
});

app.use("/", router);
app.use('/node_modules',  express.static(__dirname + '/node_modules'));
app.use('/style',  express.static(__dirname + '/style'));


app.listen(3000,function(){
    console.log('Node server running @ http://localhost:3000')
});

/*router.get('/request', function(req, res){
  var con = mysql.createConnection({
    host: "localhost",
    user: "isaiah",
    password: "PASSword",
    database : 'md',

});

con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT name FROM MOVIE", function (err, result) {
    if (err){
    	throw err;
    }
    else {
    	console.log(result);
    	res.send(result) //How to transfer this to app.js without it resulting in unidentified
	   }
  });
  con.end();
});
});*/
  
  router.get('/generalRequest', function(req, res){
  console.log(req.query);
  var con = mysql.createConnection({
    host: "localhost",
    user: "isaiah",
    password: "PASSword",
    database : 'md',
  });

  con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM "+ req.query.type +" WHERE NAME = \"" + req.query.name + "\"",  function (err, result) {
      if (err){
      	throw err;
      }
      else {
      	console.log(result);
      	res.send(result); //How to transfer this to app.js without it resulting in unidentified
  	}
    });
    con.end();
});
});
