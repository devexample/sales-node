var config = require("./config");
var crypto = require("crypto");
var jwt = require("jsonwebtoken");
var path = require("path");

module.exports = {
	api: function( req, res, next ){
		var token = req.headers.token || req.query.token;
		if( token ){
			try{
				req.user = jwt.verify(token, config.secretString);
				next();
			} catch( error ){
				res.status(403).send("Your session has expired, sign in again.");
			}
		} else {
			res.status(500).send("You need a token to complete the request.");
		}
	},
	hash: function( str ){
		var hash = str;
		if( config.secretString ){
			hash = crypto.createHmac("sha256", config.secretString).update(str).digest("hex");	
		}
		return hash;
	},
	createToken: function( data, days ){
		return jwt.sign(data, config.secretString, {
			expiresIn: days * 24 * 60 * 60
		});
	},
	decodeToken: function( token ){
		try{ return jwt.verify(token, config.secretString); }
		catch( error ){ return false; }
	},
	web: function( req, res, next ){
		var token = "";
		var value = "; " + (req.headers.cookie || "");
		var parts = value.split("; " + "SalesExample_token" + "=");
		if (parts.length == 2) token = parts.pop().split(";").shift();

		if( token ){
			try{
				var data = jwt.verify(token, config.secretString);
				next();
			} catch( error ){
				res.sendFile(path.join(__dirname, "../webapp/sign-in.html"));
			}
		} else {
			res.sendFile(path.join(__dirname, "../webapp/sign-in.html"));
		}
	}
};
