var auth = require("./auth");
var express = require("express");
var path = require("path");

var router = express.Router();

var resolver = function( url, file, auth ){
	var callback = function( req, res ){
		res.sendFile( path.join(__dirname, "../webapp" + (file || url) ) );
	};
	var next = function(){};
	if( auth ){
		next = callback;
		callback = auth;
	}
	router.get(url, callback, next);
}

resolver("/", "/index.html", auth.web);

// Products ========================================================
resolver("/products", "/products/index.html", auth.web);

resolver("/products/views/list.html");
resolver("/products/controllers/list.controller.js");

resolver("/products/views/form.html");
resolver("/products/controllers/form.controller.js");

// Clients ========================================================

resolver("/clients", "/clients/index.html", auth.web);

resolver("/clients/views/list.html");
resolver("/clients/controllers/list.controller.js");

resolver("/clients/views/form.html");
resolver("/clients/controllers/form.controller.js");

// Sales ========================================================

resolver("/sales", "/sales/index.html", auth.web);

resolver("/sales/views/list.html");
resolver("/sales/controllers/list.controller.js");

resolver("/sales/views/form.html");
resolver("/sales/controllers/form.controller.js");

// Make public the folder public
router.use('/public', express.static('./webapp/public'));


module.exports = router;