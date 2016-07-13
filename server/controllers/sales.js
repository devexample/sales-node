require('../models/sale');
var config = require("../config");

module.exports = function( database ){
	var Sale = database.sales.model("sale");

	return {
		create: function( req, res ){
			// Validate for required fields
			if( !req.body.client ){ res.status(400).send("Client is required in the request."); return false; }
			if( !req.body.products || req.body.products.length ){ res.status(400).send("Products are required in the request."); return false; }

			var sale = new Sale(req.body);
			sale.save(function( error ){
				if( error ){
					var message = "There was an error while trying to save the sale.";
					if( config.developMode ) message = error.message;
					res.status(500).send(message);
				} else res.json(sale);
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
		}
	}
};