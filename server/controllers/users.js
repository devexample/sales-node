require('../models/user');
var auth = require("../auth");
var config = require("../config");

module.exports = function( database ){
	var User = database.sales.model("user");

	return {
		signedInInfo: function( req, res ){
			var match = {
				_id: req.user.id
			};

			User.findOne(match, function( error, data ){
				if( error ){
					var message = "There was an error while trying to read the user information.";
					if( config.developMode ) message = error.message;
					res.status(500).send(message);
				} else res.json(data);
			});
		},
		signIn: function( req, res ){
			// Validate for required fields
			if( !req.body.email ){ res.status(400).send("Email is required in the request."); }
			if( !req.body.password ){ res.status(400).send("Password is required in the request."); }

			var match = {
				email: req.body.email,
				password: auth.hash(req.body.password)
			}

			User.findOne(match, function( error, data ){
				if( error ){
					var message = "There was an error while trying to check user data.";
					if( config.developMode ) message = error.message;
					res.status(401).send(message);
				} else if( data ){
					var user = {
						id: data._id,
						name: data.name,
						email: data.email
					};

					var token = auth.createToken(user, 1);
					res.send(token);
				} else {
					var message = "Email or password incorrect, check your information and try again.";
					res.status(401).send(message);
				}
			});
		}
	}
};