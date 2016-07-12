require('../models/user');
var auth = require("../auth");
var config = require("../config");

module.exports = function( database ){
	var User = database.sales.model("user");

	return {
		// create: function( req, res ){
		// 	var user = new User(req.body);
		// 	user.save(function( error ){
		// 		if( error ){
		// 			var message = "There was an error while trying to save the user.";
		// 			if( config.developMode ) message = error.message;
		// 			res.status(500).send(message);
		// 		} else res.json(user);
		// 	});
		// },
		// read: function( req, res ){
		// 	User.find(function( error, data ){
		// 		if( error ){
		// 			var message = "There was an error while trying to read the users.";
		// 			if( config.developMode ) message = error.message;
		// 			res.status(500).send(message);
		// 		} else res.json(data);
		// 	});
		// },
		// readOne: function( req, res ){
		// 	var match = {
		// 		_id: req.params.id
		// 	};

		// 	User.findOne(match, function( error, data ){
		// 		if( error ){
		// 			var message = "There was an error while trying to read the user.";
		// 			if( config.developMode ) message = error.message;
		// 			res.status(500).send(message);
		// 		} else res.json(data);
		// 	});
		// },
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
		// update: function( req, res ){
		// 	var match = { _id: req.body._id };
		// 	var set = {
		// 		$set: {
		// 			name: req.body.name,
		// 			email: req.body.email
		// 		}
		// 	};

		// 	User.update(match, set, function( error ){
		// 		if( error ){
		// 			var message = "There was an error while trying to update the users.";
		// 			if( config.developMode ) message = error.message;
		// 			res.status(500).send(message);
		// 		} else res.send("User updated successfully");
		// 	});
		// },
		// delete: function( req, res ){
		// 	var match = { _id: req.params.id };

		// 	User.remove(match, function( error ){
		// 		if( error ){
		// 			var message = "There was an error while trying to remove the users.";
		// 			if( config.developMode ) message = error.message;
		// 			res.status(500).send(message);
		// 		} else res.send("User removed successfully");
		// 	});
		// }
	}
};