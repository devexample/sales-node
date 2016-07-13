require('../models/product');
var config = require("../config");

module.exports = function( database ){
	var Product = database.sales.model("product");

	return {
		create: function( req, res ){
			// Validate for required fields
			if( !req.body.name ){ res.status(400).send("Name is required in the request."); return false; }
			if( !req.body.price ){ res.status(400).send("Price is required in the request."); return false; }

			var product = new Product(req.body);
			product.save(function( error ){
				if( error ){
					var message = "There was an error while trying to save the product.";
					if( config.developMode ) message = error.message;
					res.status(500).send(message);
				} else res.json(product);
			});
		},
		read: function( req, res ){
			Product.find(function( error, data ){
				if( error ){
					var message = "There was an error while trying to read the products.";
					if( config.developMode ) message = error.message;
					res.status(500).send(message);
				} else res.json(data);
			});
		},
		readOne: function( req, res ){
			var match = {
				_id: req.params.id
			};

			Product.findOne(match, function( error, data ){
				if( error ){
					var message = "There was an error while trying to read the product.";
					if( config.developMode ) message = error.message;
					res.status(500).send(message);
				} else res.json(data);
			});
		},
		update: function( req, res ){
			// Validate for required fields
			if( !req.body.name ){ res.status(400).send("Name is required in the request."); return false; }
			if( !req.body.price ){ res.status(400).send("Price is required in the request."); return false; }

			var match = { _id: req.body._id };
			var set = {
				$set: {
					name: req.body.name,
					price: req.body.price,
				}
			};

			Product.update(match, set, function( error ){
				if( error ){
					var message = "There was an error while trying to update the products.";
					if( config.developMode ) message = error.message;
					res.status(500).send(message);
				} else res.send("Product updated successfully.");
			});
		},
		delete: function( req, res ){
			var match = { _id: req.params.id };

			Product.remove(match, function( error ){
				if( error ){
					var message = "There was an error while trying to remove the products.";
					if( config.developMode ) message = error.message;
					res.status(500).send(message);
				} else res.send("Product deleted successfully.");
			});
		}
	}
};