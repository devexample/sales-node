require('../models/sale');
var config = require("../config");

module.exports = function( database ){
	var Sale = database.sales.model("sale");

	return {
		create: function( req, res ){
			var sale = new Sale(req.body);
			sale.save(function( error ){
				if( error ){
					var message = "There was an error while trying to save the sale.";
					if( config.developMode ) message = error.message;
					res.status(500).send(message);
				} else res.json(sale);
			});
		},
		read: function( req, res ){
			Sale.find()
			.populate("client")
			.exec(function( error, data ){
				if( error ){
					var message = "There was an error while trying to read the sales.";
					if( config.developMode ) message = error.message;
					res.status(500).send(message);
				} else res.json(data);
			});
		},
		readByClient: function( req, res ){
			var match = {
				client: req.params.clientID
			};

			Sale.find(match, function( error, data ){
				if( error ){
					var message = "There was an error while trying to read the sales.";
					if( config.developMode ) message = error.message;
					res.status(500).send(message);
				} else res.json(data);
			});
		},
		readOne: function( req, res ){
			var match = {
				_id: req.params.id
			};

			Sale.findOne(match, function( error, data ){
				if( error ){
					var message = "There was an error while trying to read the sale.";
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
					price: req.body.price,
				}
			};

			Sale.update(match, set, function( error ){
				if( error ){
					var message = "There was an error while trying to update the sales.";
					if( config.developMode ) message = error.message;
					res.status(500).send(message);
				} else res.send("Sale updated successfully.");
			});
		},
		delete: function( req, res ){
			var match = { _id: req.params.id };

			Sale.remove(match, function( error ){
				if( error ){
					var message = "There was an error while trying to remove the sales.";
					if( config.developMode ) message = error.message;
					res.status(500).send(message);
				} else res.send("Sale deleted successfully.");
			});
		},
	}
};