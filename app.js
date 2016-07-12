var config = require("./server/config");
var express = require("express");

var app = express();

// API's Router
app.use( require("./server/router-api") );

// Web App Router
app.use( require("./server/router-web") );

var port = process.env.PORT || config.port;

var server = app.listen(port, function(){
	console.log('App stared on port ' + port);
});