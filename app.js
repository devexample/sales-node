// var auth = require("./server/auth");
var config = require("./server/config");
var express = require("express");

var app = express();

// console.log("Hash for 123 is: "+ auth.hash("123"));

// API's Router
app.use( require("./server/router-api") );

// Web App Router
app.use( require("./server/router-web") );

var port = process.env.PORT || config.port;

var server = app.listen(port, function(){
	console.log('App stared on port ' + port);
});