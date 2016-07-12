require('../models/client');
var config = require("../config");

module.exports = function( database ){
	var Client = database.sales.model("client");

	return {
		create: function( req, res ){
			var client = new Client(req.body);
			client.save(function( error ){
				if( error ){
					var message = "There was an error while trying to save the client.";
					if( config.developMode ) message = error.message;
					res.status(500).send(message);
				} else res.json(client);
			});
		},
		read: function( req, res ){
			Client.find(function( error, data ){
				if( error ){
					var message = "There was an error while trying to read the clients.";
					if( config.developMode ) message = error.message;
					res.status(500).send(message);
				} else res.json(data);
			});
		},
		readOne: function( req, res ){
			var match = {
				_id: req.params.id
			};

			Client.findOne(match, function( error, data ){
				if( error ){
					var message = "There was an error while trying to read the client.";
					if( config.developMode ) message = error.message;
					res.status(500).send(message);
				} else res.json(data);
			});
		},
		update: function( req, res ){
			var match = { _id: req.body._id };
			var set = {
				$set: {
					name: req.body.name,
					email: req.body.email
				}
			};

			Client.update(match, set, function( error ){
				if( error ){
					var message = "There was an error while trying to update the clients.";
					if( config.developMode ) message = error.message;
					res.status(500).send(message);
				} else res.send("Client updated successfully");
			});
		},
		delete: function( req, res ){
			var match = { _id: req.params.id };

			Client.remove(match, function( error ){
				if( error ){
					var message = "There was an error while trying to remove the clients.";
					if( config.developMode ) message = error.message;
					res.status(500).send(message);
				} else res.send("Client removed successfully");
			});
		},
	}
};