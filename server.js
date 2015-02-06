var express = require("express");

var app = express();
var done = false;

//port
// var port = 3000;
var port = process.env.PORT || 3000;

//ip
var ip = "127.0.0.1";

app.use(express.static(__dirname));

app.get('/',function(req,res){
  res.sendfile("index.html");
});

//log where we are listening
console.log("Listening on http://" + ip + ":" + port);

app.listen(port, ip);

